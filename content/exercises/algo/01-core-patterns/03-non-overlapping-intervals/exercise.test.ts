import { describe, it, expect } from "vitest";
import { minRemovalsToNonOverlapping } from "./exercise";

describe("algo/03-non-overlapping-intervals", () => {
  it("removes one interval when one blocks the rest", () => {
    expect(
      minRemovalsToNonOverlapping([
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 3],
      ])
    ).toBe(1);
  });

  it("removes duplicates until one remains", () => {
    expect(
      minRemovalsToNonOverlapping([
        [1, 2],
        [1, 2],
        [1, 2],
      ])
    ).toBe(2);
  });

  it("returns 0 when nothing overlaps", () => {
    expect(
      minRemovalsToNonOverlapping([
        [1, 2],
        [3, 4],
        [5, 6],
      ])
    ).toBe(0);
  });

  it("removes one when two intervals overlap", () => {
    expect(
      minRemovalsToNonOverlapping([
        [1, 3],
        [2, 4],
      ])
    ).toBe(1);
  });

  it("allows intervals that only touch at a point", () => {
    expect(
      minRemovalsToNonOverlapping([
        [1, 2],
        [2, 3],
        [3, 4],
      ])
    ).toBe(0);
  });

  it("handles a single interval", () => {
    expect(minRemovalsToNonOverlapping([[5, 10]])).toBe(0);
  });

  it("picks optimal removals on unsorted input", () => {
    expect(
      minRemovalsToNonOverlapping([
        [10, 12],
        [6, 8],
        [1, 3],
        [2, 4],
      ])
    ).toBe(1);
  });

  it("handles nested overlaps", () => {
    expect(
      minRemovalsToNonOverlapping([
        [1, 10],
        [2, 3],
        [4, 5],
        [6, 7],
      ])
    ).toBe(1);
  });
});
