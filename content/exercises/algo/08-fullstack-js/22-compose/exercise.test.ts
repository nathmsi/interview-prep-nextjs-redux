import { describe, it, expect } from "vitest";
import { compose } from "./exercise";

describe("algo/08-fullstack-js/22-compose", () => {
  const double = (x: number) => x * 2;
  const inc = (x: number) => x + 1;
  const square = (x: number) => x * x;

  it("applies functions right to left", () => {
    expect(compose(inc, double)(3)).toBe(7);
  });

  it("composes multiple functions", () => {
    expect(compose(inc, square, double)(2)).toBe(17);
  });

  it("returns identity for no functions", () => {
    const id = compose<number>();
    expect(id(42)).toBe(42);
  });

  it("works with a single function", () => {
    expect(compose(double)(5)).toBe(10);
  });
});
