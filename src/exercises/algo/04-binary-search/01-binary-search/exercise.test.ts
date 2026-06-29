import { describe, it, expect } from "vitest";
import { binarySearch } from "./exercise";

describe("algo/04-binary-search/01-binary-search", () => {
  it("finds target in the middle of array", () => {
    expect(binarySearch([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
  });

  it("returns -1 when target is missing", () => {
    expect(binarySearch([-1, 0, 3, 5, 9, 12], 2)).toBe(-1);
  });

  it("finds target at the start", () => {
    expect(binarySearch([1, 2, 3, 4, 5], 1)).toBe(0);
  });

  it("finds target at the end", () => {
    expect(binarySearch([1, 2, 3, 4, 5], 5)).toBe(4);
  });

  it("handles single element found", () => {
    expect(binarySearch([5], 5)).toBe(0);
  });

  it("handles single element not found", () => {
    expect(binarySearch([5], 2)).toBe(-1);
  });
});
