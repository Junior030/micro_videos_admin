import { ValueObject } from '../value-object';

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    readonly prop1: string,
    readonly prop2: string,
  ) {
    super();
  }
}

describe('ValueObject Unit Tests', () => {
  describe('StringValueObject', () => {
    test('should be equals', () => {
      const vo1 = new StringValueObject('test');
      const vo2 = new StringValueObject('test');
      expect(vo1.equals(vo2)).toBeTruthy();
    });
    test('should not be equals with different values', () => {
      const vo1 = new StringValueObject('test1');
      const vo2 = new StringValueObject('test2');
      expect(vo1.equals(vo2)).toBeFalsy();
    });
  });

  describe('ComplexValueObject', () => {
    test('should be equals', () => {
      const vo1 = new ComplexValueObject('value1', 'value2');
      const vo2 = new ComplexValueObject('value1', 'value2');
      expect(vo1.equals(vo2)).toBeTruthy();
    });
    test('should not be equals with different properties', () => {
      const vo1 = new ComplexValueObject('value1', 'value2');
      const vo2 = new ComplexValueObject('value3', 'value4');
      expect(vo1.equals(vo2)).toBeFalsy();
    });
  });
});
