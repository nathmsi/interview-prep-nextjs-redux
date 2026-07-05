import { describe, it, expect } from "vitest";
import { evaluateRPN } from "./exercise";

describe("algo/06-evaluate-rpn", () => {
  it("evaluates a simple expression", () => {
    expect(evaluateRPN(["2", "1", "+", "3", "*"])).toBe(9);
  });

  it("handles division before addition", () => {
    expect(evaluateRPN(["4", "13", "5", "/", "+"])).toBe(6);
  });

  it("handles a single number", () => {
    expect(evaluateRPN(["3"])).toBe(3);
  });

  it("handles subtraction", () => {
    expect(evaluateRPN(["5", "3", "-"])).toBe(2);
  });

  it("handles multiplication", () => {
    expect(evaluateRPN(["2", "3", "*"])).toBe(6);
  });

  it("truncates division toward zero", () => {
    expect(evaluateRPN(["7", "3", "/"])).toBe(2);
  });

  it("truncates negative division toward zero", () => {
    expect(evaluateRPN(["7", "-3", "/"])).toBe(-2);
  });

  it("evaluates a longer expression", () => {
    expect(
      evaluateRPN([
        "10",
        "6",
        "9",
        "3",
        "+",
        "-11",
        "*",
        "/",
        "*",
        "17",
        "+",
        "5",
        "+",
      ])
    ).toBe(22);
  });

  it("handles negative operands", () => {
    expect(evaluateRPN(["-2", "3", "+"])).toBe(1);
  });

  it("applies operators in stack order (second pop is left operand)", () => {
    expect(evaluateRPN(["3", "2", "-"])).toBe(1);
    expect(evaluateRPN(["2", "3", "-"])).toBe(-1);
  });
});
