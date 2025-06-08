import { ValueObject } from "../value-object";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class Uuid extends ValueObject {
  readonly id: string;
  constructor(id: string) {
    super();
    this.id = id || uuidv4();
    this.validate();
  }

  private validate(): void {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUuidError(this.id);
    }
  }
}

export class InvalidUuidError extends Error {
  constructor(id: string) {
    super(`Invalid UUID: ${id}`);
    this.name = "InvalidUuidError";
  }
}
