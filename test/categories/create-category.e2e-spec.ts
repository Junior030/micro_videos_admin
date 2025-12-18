import request from 'supertest';
import { ICategoryRepository } from '@core/category/domain/category.repository';
import { startApp } from '@nest-modules/shared-module/testing/helpers';
import { CreateCategoryFixture } from '@nest-modules/categories-module/testing/category-fixture';
import { CATEGORY_PROVIDER } from '@nest-modules/categories-module/categories.providers';
import { CategoriesController } from '@nest-modules/categories-module/categories.controller';
import { CategoryOutputMapper } from '@core/category/application/use-cases/common/category-output';
import { instanceToPlain } from 'class-transformer';
import { CategoryId } from '@core/category/domain/category.aggregate';

describe('CategoriesController (e2e)', () => {
  const appHelper = startApp();
  let categoryRepository: ICategoryRepository;

  beforeEach(async () => {
    categoryRepository = appHelper.app.get<ICategoryRepository>(
      CATEGORY_PROVIDER.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  describe('/categories (POST)', () => {
    describe('should return a response error with 422 status code when request body is invalid', () => {
      const invalidRequest = CreateCategoryFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('when body is $label', async ({ value }) => {
        return await request(appHelper.app.getHttpServer())
          .post('/categories')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should return a response error with 422 status code when throw EntityValidationError', () => {
      const invalidRequest =
        CreateCategoryFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));

      test.each(arrange)('when body is $label', async ({ value }) => {
        return await request(appHelper.app.getHttpServer())
          .post('/categories')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should create a category', () => {
      const arrange = CreateCategoryFixture.arrangeForCreate();
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const res = await request(appHelper.app.getHttpServer())
            .post('/categories')
            .send(send_data)
            .expect(201);

          const keysInResponse = CreateCategoryFixture.keysInResponse;

          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keysInResponse);

          const id = res.body.data.id;
          const categoryCreated = await categoryRepository.findById(
            new CategoryId(id),
          );
          const presenter = CategoriesController.serialize(
            CategoryOutputMapper.toOutput(categoryCreated),
          );
          const seralize = instanceToPlain(presenter);
          expect(res.body.data).toStrictEqual({
            id: seralize.id,
            created_at: seralize.created_at,
            updated_at: seralize.updated_at,
            ...expected,
          });
        },
      );

      // const presenter = await controller.create(send_data);
      // const entity = await categoryRepository.findById(
      //   new Uuid(presenter.id),
      // );
      // expect(entity!.toJSON()).toStrictEqual({
      //   category_id: presenter.id,
      //   created_at: presenter.created_at,
      //   updated_at: presenter.updated_at,
      //   ...expected,
      // });
      // const output = CategoryOutputMapper.toOutput(entity!);
      // expect(presenter).toEqual(new CategoryPresenter(output));
    });
  });
});
