import { describe, it, expect } from "vitest";
import { flattenDeep } from "./exercise";

describe("algo/08-fullstack-js/23-flatten-deep", () => {
  it("flattens nested arrays of any depth", () => {
    expect(flattenDeep([1, [2, [3, 4]], 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns empty array for empty input", () => {
    expect(flattenDeep([])).toEqual([]);
  });

  it("handles already flat arrays", () => {
    expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("flattens deeply nested structure", () => {
    expect(flattenDeep([[[[1]]], 2])).toEqual([1, 2]);
  });
});
