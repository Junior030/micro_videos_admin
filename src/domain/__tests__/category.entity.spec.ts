import { Category } from "../category.entity";

describe(`Category Unit Entity`, () => {
  describe(`constructor`, () => {
    test(`should create a category with all values`, () => {
      const props = {
        category_id: "123",
        name: "Test Category",
        description: "A test category",
        is_active: false,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-01"),
      };
      const category = new Category(props);
      expect(category.category_id).toBe(props.category_id);
      expect(category.name).toBe(props.name);
      expect(category.description).toBe(props.description);
      expect(category.is_active).toBe(props.is_active);
      expect(category.createdAt).toEqual(props.createdAt);
      expect(category.updatedAt).toEqual(props.updatedAt);
    });

    test(`should create a category with default values`, () => {
      const props = {
        name: "Default Category",
      };
      const category = new Category(props);
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe(props.name);
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe(`create`, () => {
    test(`should create a category using the static create method witch all values`, () => {
      const command = {
        category_id: "123",
        name: "Test Category",
        description: "A test category",
        is_active: false,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-01"),
      };
      const category = Category.create(command);
      expect(category.category_id).toBe(command.category_id);
      expect(category.name).toBe(command.name);
      expect(category.description).toBe(command.description);
      expect(category.is_active).toBe(command.is_active);
      expect(category.createdAt).toEqual(command.createdAt);
      expect(category.updatedAt).toEqual(command.updatedAt);
    });

    test(`should create a category using the static create method witch default values`, () => {
      const command = {
        name: "Static Category",
        description: "Created using static method",
      };
      const category = Category.create(command);
      expect(category.category_id).toBeUndefined();
      expect(category.name).toBe(command.name);
      expect(category.description).toBe(command.description);
      expect(category.is_active).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(category.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe(`changeName`, () => {
    test(`should change the name of the category`, () => {
      const category = new Category({ name: "Old Name" });
      category.changeName("New Name");
      expect(category.name).toBe("New Name");
      expect(category.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe(`changeDescription`, () => {
    test(`should change the description of the category`, () => {
      const category = new Category({ name: "Category" });
      category.changeDescription("New Description");
      expect(category.description).toBe("New Description");
      expect(category.updatedAt).toBeInstanceOf(Date);
    });

    test(`should set description to null if passed null`, () => {
      const category = new Category({ name: "Category" });
      category.changeDescription(null);
      expect(category.description).toBeNull();
      expect(category.updatedAt).toBeInstanceOf(Date);
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
      expect(category.updatedAt).toBeInstanceOf(Date);
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
      expect(category.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe(`toJSON`, () => {
    test(`should return the category as a JSON object`, () => {
      const props = {
        category_id: "123",
        name: "Test Category",
        description: "A test category",
        is_active: false,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-01"),
      };
      const category = Category.create(props);
      const json = category.toJSON();
      expect(json).toEqual({
        category_id: props.category_id,
        name: props.name,
        description: props.description,
        is_active: props.is_active,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
      });
    });
  });
});
