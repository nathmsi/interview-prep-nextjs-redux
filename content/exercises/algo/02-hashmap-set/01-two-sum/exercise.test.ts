import { describe, it, expect } from "vitest";
import { twoSum } from "./exercise";

describe("algo/02-hashmap/01-two-sum", () => {
  it("finds two indices that sum to target", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("works when pair is not at the start", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it("handles negative numbers", () => {
    expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
  });

  it("does not reuse the same index", () => {
    const result = twoSum([3, 3], 6);
    expect(result).toEqual([0, 1]);
  });
});
