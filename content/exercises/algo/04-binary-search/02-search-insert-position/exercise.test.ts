import { describe, it, expect } from "vitest";
import { searchInsert } from "./exercise";

describe("algo/04-binary-search/02-search-insert-position", () => {
  it("returns index when target exists", () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
  });

  it("returns insert index in the middle", () => {
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
  });

  it("inserts at the end", () => {
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
  });

  it("inserts at the start", () => {
    expect(searchInsert([1, 3, 5, 6], 0)).toBe(0);
  });

  it("handles empty array", () => {
    expect(searchInsert([], 3)).toBe(0);
  });
});
