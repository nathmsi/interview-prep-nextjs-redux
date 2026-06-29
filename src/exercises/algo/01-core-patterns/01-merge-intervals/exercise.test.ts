import { describe, it, expect } from "vitest";
import { mergeIntervals } from "./exercise";

describe("algo/01-merge-intervals", () => {
  it("merges a simple overlap", () => {
    expect(mergeIntervals([[9, 12], [11, 13], [14, 16]])).toEqual([
      [9, 13],
      [14, 16],
    ]);
  });

  it("merges when one interval is fully inside another", () => {
    expect(mergeIntervals([[1, 4], [2, 3]])).toEqual([[1, 4]]);
  });

  it("does not merge when there is no overlap", () => {
    expect(mergeIntervals([[5, 7], [8, 9], [10, 12]])).toEqual([
      [5, 7],
      [8, 9],
      [10, 12],
    ]);
  });

  it("handles an empty array", () => {
    expect(mergeIntervals([])).toEqual([]);
  });

  it("handles a zero-length interval (start = end)", () => {
    expect(mergeIntervals([[10, 10]])).toEqual([[10, 10]]);
  });

  it("merges even when input is not sorted", () => {
    const mergeIntervalsResult = mergeIntervals([
        [1, 5],
        [0, 3],
        [4, 8],
        [6, 10],
      ]);
    console.log({mergeIntervalsResult})
    expect(
      mergeIntervalsResult
    ).toEqual([[0, 10]]);
  });

  it("merges intervals that touch at the boundary", () => {
    const mergeIntervalsResult = mergeIntervals([[9, 12], [12, 14]]);
    console.log({mergeIntervalsResult})
    expect(mergeIntervalsResult).toEqual([[9, 14]]);
  });
});
