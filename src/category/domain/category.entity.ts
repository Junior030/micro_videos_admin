import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { Uuid } from "../../shared/domain/value-ojects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructoProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: CategoryConstructoProps) {
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
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

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
