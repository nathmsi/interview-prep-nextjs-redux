import { describe, it, expect } from "vitest";
import { isValidParentheses } from "./exercise";

describe("algo/05-valid-parentheses", () => {
  it("accepts a single pair", () => {
    expect(isValidParentheses("()")).toBe(true);
  });

  it("accepts multiple types in sequence", () => {
    expect(isValidParentheses("()[]{}")).toBe(true);
  });

  it("rejects mismatched types", () => {
    expect(isValidParentheses("(]")).toBe(false);
  });

  it("rejects correct types in wrong order", () => {
    expect(isValidParentheses("([)]")).toBe(false);
  });

  it("accepts nested brackets", () => {
    expect(isValidParentheses("{[]}")).toBe(true);
  });

  it("accepts an empty string", () => {
    expect(isValidParentheses("")).toBe(true);
  });

  it("rejects an unmatched opening bracket", () => {
    expect(isValidParentheses("(")).toBe(false);
  });

  it("rejects an unmatched closing bracket", () => {
    expect(isValidParentheses(")")).toBe(false);
  });

  it("accepts deeply nested valid brackets", () => {
    expect(isValidParentheses("((([{}])))")).toBe(true);
  });

  it("rejects extra closing bracket at the end", () => {
    expect(isValidParentheses("()())")).toBe(false);
  });
});
