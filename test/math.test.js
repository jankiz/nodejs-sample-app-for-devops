// test/math.test.js

const { addNumbers } = require('../src/math');

describe('addNumbers function', () => {
  test('should correctly add two numbers', () => {
    expect(addNumbers(1, 2)).toBe(3);
  });

  test('should throw an error if non-numeric values are passed', () => {
    expect(() => addNumbers(1, 'a')).toThrow('Both arguments must be numbers');
  });

  test('should return negative values correctly', () => {
    expect(addNumbers(-5, -3)).toBe(-8);
  });

  test('should handle floating-point numbers correctly', () => {
    expect(addNumbers(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
