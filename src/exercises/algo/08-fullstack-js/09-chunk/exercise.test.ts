import { describe, it, expect } from "vitest";
import { chunk } from "./exercise";

describe("algo/08-fullstack-js/09-chunk", () => {
  it("splits array into chunks of given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("handles chunk size of 1", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it("returns empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("returns single chunk when size >= length", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
});
