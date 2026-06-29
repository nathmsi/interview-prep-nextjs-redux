import { describe, it, expect } from "vitest";
import { calc } from "./exercise";

describe("algo/08-fullstack-js/13-calc-expression", () => {
  // it("evaluates multiplication and division with parentheses", () => {
  //   expect(calc("4*5/(3*3)")).toBeCloseTo(20 / 9);
  // });

  it("respects operator precedence", () => {
    expect(calc("1+2*3")).toBe(7);
  });

  // it("evaluates parentheses first", () => {
  //   expect(calc("(1+2)*3")).toBe(9);
  // });

  // it("handles subtraction and addition", () => {
  //   expect(calc("10-3+2")).toBe(9);
  // });

  it("handles division", () => {
    expect(calc("10/2")).toBe(5);
  });

  it("ignores whitespace", () => {
    expect(calc("  2 + 2  ")).toBe(4);
  });

  // it("handles unary minus", () => {
  //   expect(calc("-3+5")).toBe(2);
  // });
});
