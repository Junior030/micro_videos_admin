import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("Uuid Unit Tests", () => {
  test("should throw error when uuid is invalid", () => {
    const invalidUuid = "invalid-uuid";
    expect(() => new Uuid(invalidUuid)).toThrow(InvalidUuidError);
  });

  test("should create a valid uuid when no id is provided", () => {
    const uuid = new Uuid("");
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy(); // UUID length
  });

  test("should create a valid uuid when a valid id is provided", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";
    const uuid = new Uuid(validUuid);
    expect(uuid.id).toBe(validUuid);
  });
});
