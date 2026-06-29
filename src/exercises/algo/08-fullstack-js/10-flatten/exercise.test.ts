import { describe, it, expect } from "vitest";
import { flatten } from "./exercise";

describe("algo/08-fullstack-js/10-flatten", () => {
  it("flattens one level of nesting", () => {
    expect(flatten([1, [2, 3], [4]])).toEqual([1, 2, 3, 4]);
  });

  it("flattens array of arrays", () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it("returns flat array unchanged", () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles empty array", () => {
    expect(flatten([])).toEqual([]);
  });
});
