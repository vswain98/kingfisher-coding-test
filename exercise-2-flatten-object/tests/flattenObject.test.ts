//To run this test, use the command: npx jest tests/flattenObject.test.ts
//To check code coverage, use the command: npx jest --coverage

import { flattenObject } from "../src/flattenObject";

describe("flattenObject program", () => {
  it("flattens single level object", () => {
    const data = { name: "Venktesh", age: 26 };
    const result = flattenObject(data);
    expect(result).toEqual({ name: "Venktesh", age: 26 });
  });

  it("flattens nested objects", () => {
    const data = { b: { d: { e: 14 } } };
    const result = flattenObject(data);
    expect(result).toEqual({ "b.d.e": 14 });
  });

  it("flattens arrays inside objects", () => {
    const data = { a: [{ message: "hello" }, { message: "world" }] };
    const result = flattenObject(data);
    expect(result).toEqual({
      "a.0.message": "hello",
      "a.1.message": "world",
    });
  });
  it("handles single level and nested object & arrays together", () => {
    const data = {
      a: 1,
      b: {
        c: "hello",
        d: {
          e: true,
        },
      },
      f: [{ g: "world" }],
    };
    const result = flattenObject(data);
    expect(result).toEqual({
      a: 1,
      "b.c": "hello",
      "b.d.e": true,
      "f.0.g": "world",
    });
  });
});
