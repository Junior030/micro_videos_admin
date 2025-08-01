import { EntityValidationError } from "../../../shared/domain/validators/validation.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe(`Category Unit Entity`, () => {
  let validateSpy: jest.SpyInstance;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  describe(`constructor`, () => {
    test(`should create a category with all values`, () => {
      const props = {
        name: "Test Category",
        description: "A test category",
        is_active: false,
        created_at: new Date("2023-01-01"),
        updated_at: new Date("2023-01-01"),
      };
      const category = new Category(props);
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe(props.name);
      expect(category.description).toBe(props.description);
      expect(category.is_active).toBe(props.is_active);
      expect(category.created_at).toEqual(props.created_at);
      expect(category.updated_at).toEqual(props.updated_at);
    });

    test(`should create a category with default values`, () => {
      const props = {
        name: "Default Category",
      };
      const category = new Category(props);
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe(props.name);
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.updated_at).toBeInstanceOf(Date);
    });
  });

  describe(`create`, () => {
    test(`should create a category using the static create method witch all values`, () => {
      const command = {
        name: "Test Category",
        description: "A test category",
        is_active: false,
        created_at: new Date("2023-01-01"),
        updated_at: new Date("2023-01-01"),
      };
      const category = Category.create(command);
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe(command.name);
      expect(category.description).toBe(command.description);
      expect(category.is_active).toBe(command.is_active);
      expect(category.created_at).toEqual(command.created_at);
      expect(category.updated_at).toEqual(command.updated_at);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test(`should create a category using the static create method witch default values`, () => {
      const command = {
        name: "Static Category",
        description: "Created using static method",
      };
      const category = Category.create(command);
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe(command.name);
      expect(category.description).toBe(command.description);
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.updated_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe(`changeName`, () => {
    test(`should change the name of the category`, () => {
      const category = new Category({ name: "Old Name" });
      category.changeName("New Name");
      expect(category.name).toBe("New Name");
      expect(category.updated_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe(`changeDescription`, () => {
    test(`should change the description of the category`, () => {
      const category = new Category({ name: "Category" });
      category.changeDescription("New Description");
      expect(category.description).toBe("New Description");
      expect(category.updated_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test(`should set description to null if passed null`, () => {
      const category = new Category({ name: "Category" });
      category.changeDescription(null);
      expect(category.description).toBeNull();
      expect(category.updated_at).toBeInstanceOf(Date);
    });
  });

  describe(`activate`, () => {
    test(`should activate the category`, () => {
      const category = new Category({
        name: "Inactive Category",
        is_active: false,
      });
      category.activate(true);
      expect(category.is_active).toBe(true);
      expect(category.updated_at).toBeInstanceOf(Date);
    });
  });

  describe(`deactivate`, () => {
    test(`should deactivate the category`, () => {
      const category = new Category({
        name: "Active Category",
        is_active: true,
      });
      category.deactivate();
      expect(category.is_active).toBe(false);
      expect(category.updated_at).toBeInstanceOf(Date);
    });
  });

  describe(`toJSON`, () => {
    test(`should return the category as a JSON object`, () => {
      const props = {
        name: "Test Category",
        description: "A test category",
        is_active: false,
        created_at: new Date("2023-01-01"),
        updated_at: new Date("2023-01-01"),
      };
      const category = Category.create(props);
      const json = category.toJSON();
      expect(json).toEqual({
        category_id: category.category_id.id,
        name: props.name,
        description: props.description,
        is_active: props.is_active,
        created_at: props.created_at,
        updated_at: props.updated_at,
      });
    });
  });

  describe("category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];
    test.each(arrange)(
      "should create a category with category_id %j",
      ({ category_id }) => {
        const category = new Category({
          name: "Test Category",
          category_id: category_id as any,
        });
        expect(category.category_id).toBeInstanceOf(Uuid);
        if (category_id instanceof Uuid) {
          expect(category.category_id.id).toBe(category_id.id);
        } else {
          expect(category.category_id.id).toBeDefined();
        }
      }
    );
  });
});

describe("validate method", () => {
  test("should an invalid category with name property", () => {
    expect(() => Category.create({ name: null })).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect(() => Category.create({ name: "" })).containsErrorMessages({
      name: ["name should not be empty"],
    });

    expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect(() =>
      Category.create({ name: "repeat".repeat(100) })
    ).containsErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  test("should an invalid category with description property", () => {
    expect(() =>
      Category.create({ description: 5 } as any)
    ).containsErrorMessages({
      description: [
        "description must be a string",
        "description must be shorter than or equal to 1000 characters",
      ],
    });
  });

  test("should an invalid category with is_active property", () => {
    expect(() =>
      Category.create({ is_active: 5 } as any)
    ).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
  });

  test("should an invalid category with changeName", () => {
    const category = Category.create({ name: "Test Category" });
    expect(() => category.changeName(null)).containsErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });

    expect(() => category.changeName("")).containsErrorMessages({
      name: ["name should not be empty"],
    });

    expect(() => category.changeName(5 as any)).containsErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
  });

  test("should a invalid category using changeDescription", () => {
    const category = Category.create({ name: "Test Category" });
    expect(() => category.changeDescription(5 as any)).containsErrorMessages({
      description: [
        "description must be a string",
        "description must be shorter than or equal to 1000 characters",
      ],
    });
  });
});
