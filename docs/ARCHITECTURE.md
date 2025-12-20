# Micro Videos Admin — Visão de Arquitetura (DDD + NestJS)

Este guia resume como o projeto está organizado usando DDD e como as peças se conectam no ciclo de uma requisição HTTP.

## Mapa de Camadas

- Domínio (Entidades, Agregados, VOs, Regras, Portas):
  - Núcleo por contexto: `src/core/*/domain` (ex.: categorias, cast-members)
  - Utilitários e contratos: `src/core/*/domain/*.ts` e `src/shared/domain/*`
  - Repositórios (interfaces): `src/core/*/domain/*repository.ts`
  - Validações: `src/core/*/domain/*validator.ts`

- Aplicação (Casos de uso, orquestração):
  - `src/core/*/application/use-cases/*`
  - Entrada/Saída genérica: `src/shared/application/*` (ex.: `search-input.ts`, `pagination-output.ts`)

- Infraestrutura (Adapters, DB, Config):
  - `src/core/*/infra/*` e `src/shared/infra/*`
  - Implementações de repositórios: `infra/db/*`
  - Configuração: `shared/infra/config.ts`

- Interface/Nest (HTTP + DI da aplicação):
  - Módulos HTTP: `src/nest-modules/*`
  - Controllers: `src/nest-modules/*/*controller.ts`
  - DTOs e Presenters: `src/nest-modules/*/dto` e `*presenter.ts`
  - Providers de casos de uso: `*providers.ts`
  - Módulos de config e DB: `src/nest-modules/config-module`, `database-module`
  - Filtros/Interceptors: `src/nest-modules/shared-module/*`

## Fluxo de Requisição (ex.: Categoria)

1. HTTP → Controller recebe requisição
   - Controller: [src/nest-modules/categories-module/categories.controller.ts](../src/nest-modules/categories-module/categories.controller.ts)
   - DTO valida/parsa entrada: [src/nest-modules/categories-module/dto/create-category.dto.ts](../src/nest-modules/categories-module/dto/create-category.dto.ts)

2. Controller chama Caso de Uso via Provider (DI)
   - Providers: [src/nest-modules/categories-module/categories.providers.ts](../src/nest-modules/categories-module/categories.providers.ts)
   - Caso de uso vive em Aplicação: `src/core/category/application/use-cases/*`

3. Caso de Uso orquestra Domínio
   - Agregado e VO: [src/core/category/domain/category.aggregate.ts](../src/core/category/domain/category.aggregate.ts)
   - Regras/Validador: [src/core/category/domain/category.validator.ts](../src/core/category/domain/category.validator.ts)
   - Portas de repositório: [src/core/category/domain/category.repository.ts](../src/core/category/domain/category.repository.ts)

4. Infra realiza IO concreto (DB, etc.)
   - Implementações: `src/core/category/infra/db/*` e `src/shared/infra/db/*`
   - Módulo de DB e Migrations: [src/nest-modules/database-module/database.module.ts](../src/nest-modules/database-module/database.module.ts), [src/nest-modules/database-module/migrations.module.ts](../src/nest-modules/database-module/migrations.module.ts)

5. Saída é mapeada para HTTP
   - Presenter formata resposta: [src/nest-modules/categories-module/categories.presenter.ts](../src/nest-modules/categories-module/categories.presenter.ts)
   - Filtros traduzem erros de domínio: [src/nest-modules/shared-module/filters/entity-validation-error.filter.ts](../src/nest-modules/shared-module/filters/entity-validation-error.filter.ts), [src/nest-modules/shared-module/filters/not-found-error.filter.ts](../src/nest-modules/shared-module/filters/not-found-error.filter.ts)

## Papel de Arquivos-Chave

- Controller (`HTTP`): recebe DTOs e aciona casos de uso.
- Use Case (`Aplicação`): coordena regras de negócio do domínio e usa repositórios (interfaces).
- Aggregate/VO (`Domínio`): encapsula invariantes e comportamentos.
- Repository (`Domínio`): contrato para persistência; implementação fica na Infra.
- Presenter (`HTTP`): transforma saída do caso de uso para o formato da API.
- Filters/Interceptors (`HTTP`): convertem erros/resultado em códigos/status apropriados.

## Testes

- Unitários de Domínio/Aplicação: `src/core/*/**/__tests__/*`
- E2E HTTP: `test/categories/*.e2e-spec.ts`
- Cobertura já gerada: `coverage/lcov-report/index.html`

## Trilha de Leitura Recomendada

1. Controller de Categoria: [src/nest-modules/categories-module/categories.controller.ts](../src/nest-modules/categories-module/categories.controller.ts)
2. Providers: [src/nest-modules/categories-module/categories.providers.ts](../src/nest-modules/categories-module/categories.providers.ts)
3. Use Cases de Categoria: `src/core/category/application/use-cases/*`
4. Domínio (Aggregate/VO/Validator/Repository): `src/core/category/domain/*`
5. Infra DB (implementações): `src/core/category/infra/db/*`
6. Presenter/DTOs: `src/nest-modules/categories-module/*`
7. Filtros/Interceptors: `src/nest-modules/shared-module/*`

## Exercícios Práticos

- Exercício 1: Adicionar um novo campo à Categoria.
  - Criar VO/validação no domínio; ajustar `category.aggregate.ts`; adequar DTO/Presenter.

- Exercício 2: Implementar busca paginada com filtros.
  - Use `search-input.ts` e `pagination-output.ts` em um novo caso de uso; mapeie no controller e presenter.

- Exercício 3: Replicar fluxo para Cast Member.
  - Percorrer `src/core/cast-member/*` e criar endpoint similar aos de Categoria.

## Dicas

- Use os testes E2E para entender o contrato HTTP: `test/categories/*`.
- Abra a cobertura no navegador para navegar por arquivos com highlights.
- Consulte `diagrama.puml` para uma visão gráfica (PlantUML).
