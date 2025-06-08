import isEqual from "lodash/isEqual";

export abstract class ValueObject {
  public equals(vo: ValueObject): boolean {
    if (this === vo) {
      return true;
    }

    if (vo === null || vo === undefined) {
      return false;
    }

    if (this.constructor.name !== vo.constructor.name) {
      return false;
    }

    return isEqual(vo, this);
  }
}
