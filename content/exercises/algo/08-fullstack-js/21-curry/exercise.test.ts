import { describe, it, expect } from "vitest";
import { curry } from "./exercise";

describe("algo/08-fullstack-js/21-curry", () => {
  const add3 = (a: number, b: number, c: number) => a + b + c;
  const add2 = (a: number, b: number) => a + b;

  it("curries one argument at a time", () => {
    expect(curry(add3)(1)(2)(3)).toBe(6);
  });

  it("allows partial application then remaining args", () => {
    expect(curry(add3)(1, 2)(3)).toBe(6);
  });

  it("calls immediately when all args provided at once", () => {
    expect(curry(add2)(1, 2)).toBe(3);
  });

  it("supports intermediate partial functions", () => {
    const add1 = curry(add3)(5) as (b: number) => (c: number) => number;
    expect(add1(10)(15)).toBe(30);
  });
});
