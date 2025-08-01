import { Sequelize } from "sequelize-typescript";
import { CategoryModelMapper } from "../category-model-mapper";
import { CategoryModel } from "../category.model";
import { EntityValidationError } from "../../../../../../shared/domain/validators/validation.error";
import { Category } from "../../../../category.entity";
import { Uuid } from "../../../../../../shared/domain/value-objects/uuid.vo";

describe("CategoryModelMapper Integration Tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
      logging: false,
    });
    await sequelize.sync({ force: true });
  });

  it("should throws error when category is invalid", () => {
    expect.assertions(2);
    const model = CategoryModel.build({
      category_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "a".repeat(256),
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail(
        "The category is valid, but it needs throws a EntityValidationError"
      );
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    }
  });

  it("should convert a category model to a category aggregate", () => {
    const created_at = new Date();
    const updated_at = new Date();
    const model = CategoryModel.build({
      category_id: "5490020a-e866-4229-9adc-aa44b83234c4",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
      updated_at,
    });
    const aggregate = CategoryModelMapper.toEntity(model);
    expect(aggregate.toJSON()).toStrictEqual(
      new Category({
        category_id: new Uuid("5490020a-e866-4229-9adc-aa44b83234c4"),
        name: "some value",
        description: "some description",
        is_active: true,
        created_at,
        updated_at,
      }).toJSON()
    );
  });
});
