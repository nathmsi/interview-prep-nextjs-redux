import { describe, it, expect } from "vitest";
import { twoSumII } from "./exercise";

describe("algo/03-two-pointers/02-two-sum-ii", () => {
  it("finds 1-based indices in sorted array", () => {
    expect(twoSumII([2, 7, 11, 15], 9)).toEqual([1, 2]);
  });

  it("works when pair is not adjacent", () => {
    expect(twoSumII([2, 3, 4], 6)).toEqual([1, 3]);
  });

  it("handles negative numbers", () => {
    expect(twoSumII([-1, 0], -1)).toEqual([1, 2]);
  });
});
