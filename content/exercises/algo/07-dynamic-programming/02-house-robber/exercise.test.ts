import { describe, it, expect } from "vitest";
import { rob } from "./exercise";

describe("algo/07-dynamic-programming/02-house-robber", () => {
  it("picks non-adjacent houses", () => {
    expect(rob([1, 2, 3, 1])).toBe(4);
  });

  it("handles longer street", () => {
    expect(rob([2, 7, 9, 3, 1])).toBe(12);
  });

  it("handles single house", () => {
    expect(rob([5])).toBe(5);
  });

  it("handles two houses", () => {
    expect(rob([2, 1])).toBe(2);
  });
});
