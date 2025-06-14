import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/erros/not-found.error";
import { Uuid } from "../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  constructor(props: StubEntityProps) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }
  entity_id: Uuid;
  name: string;
  price: number;
  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  test("should insert an entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Test Entity",
      price: 100,
    });

    await repo.insert(entity);

    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toEqual(entity);
  });

  test("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({ name: "Entity 1", price: 50 }),
      new StubEntity({ name: "Entity 2", price: 150 }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items.length).toBe(2);
    expect(repo.items[0]).toBe(entities[0]);
    expect(repo.items[1]).toBe(entities[1]);
  });

  test("should update an entity", async () => {
    const aggregate = new StubEntity({
      entity_id: new Uuid(),
      name: "Old Name",
      price: 100,
    });

    await repo.insert(aggregate);

    const aggregateUpdated = new StubEntity({
      entity_id: aggregate.entity_id,
      name: "Updated Name",
      price: 200,
    });

    await repo.update(aggregateUpdated);

    expect(aggregateUpdated.toJSON()).toStrictEqual(repo.items[0].toJSON());
  });

  test("should throw NotFoundError when updating a non-existing entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Non-existing",
      price: 100,
    });

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, repo.getEntity())
    );
  });

  test("should delete an entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Entity to Delete",
      price: 100,
    });

    await repo.insert(entity);
    await repo.delete(entity.entity_id);

    expect(repo.items.length).toBe(0);
  });
  test("should throw NotFoundError when deleting a non-existing entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Non-existing",
      price: 100,
    });

    await expect(repo.delete(entity.entity_id)).rejects.toThrow(
      new NotFoundError(entity.entity_id, repo.getEntity())
    );
  });
  test("should find an entity by ID", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Find Me",
      price: 100,
    });

    await repo.insert(entity);
    const foundEntity = await repo.findById(entity.entity_id);

    expect(foundEntity).toEqual(entity);
  });

  test("shold find all entities", async () => {
    const entities = [
      new StubEntity({ name: "Entity 1", price: 50 }),
      new StubEntity({ name: "Entity 2", price: 150 }),
    ];
    await repo.bulkInsert(entities);
    const foundEntities = await repo.findAll();
    expect(foundEntities.length).toBe(2);
    expect(foundEntities[0]).toEqual(entities[0]);
    expect(foundEntities[1]).toEqual(entities[1]);
    expect(foundEntities).toEqual(repo.items);
  });
});
