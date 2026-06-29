import { describe, it, expect } from "vitest";
import { coinChange } from "./exercise";

describe("algo/07-dynamic-programming/03-coin-change", () => {
  it("finds minimum coins", () => {
    expect(coinChange([1, 2, 5], 11)).toBe(3);
  });

  it("returns -1 when impossible", () => {
    expect(coinChange([2], 3)).toBe(-1);
  });

  it("returns 0 for amount 0", () => {
    expect(coinChange([1], 0)).toBe(0);
  });

  it("handles single coin match", () => {
    expect(coinChange([1, 2, 5], 5)).toBe(1);
  });
});
