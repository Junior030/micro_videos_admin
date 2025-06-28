import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { ValueObject } from "../../shared/domain/value-object";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryFakeBuilder } from "./category-fake.builder";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructoProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
  updatedAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category extends Entity {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updatedAt: Date;

  constructor(props: CategoryConstructoProps) {
    super();
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  get entity_id(): ValueObject {
    return this.category_id;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validade(category);
    return category;
  }

  changeName(name: string) {
    this.name = name;
    this.updatedAt = new Date();
    Category.validade(this);
  }

  changeDescription(description: string | null) {
    this.description = description;
    this.updatedAt = new Date();
    Category.validade(this);
  }

  activate(is_active: boolean) {
    this.is_active = is_active;
    this.updatedAt = new Date();
    Category.validade(this);
  }

  deactivate() {
    this.is_active = false;
    this.updatedAt = new Date();
    Category.validade(this);
  }

  static validade(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validade(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.erros);
    }
  }

  static fake() {
    return CategoryFakeBuilder;
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
      updatedAt: this.updatedAt,
    };
  }
}
