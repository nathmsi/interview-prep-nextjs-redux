import { describe, it, expect } from "vitest";
import { insertInterval } from "./exercise";

describe("algo/02-insert-interval", () => {
  it("merges new interval into the middle", () => {
    expect(insertInterval([[1, 3], [6, 9]], [2, 5])).toEqual([
      [1, 5],
      [6, 9],
    ]);
  });

  it("merges across multiple existing intervals", () => {
    expect(
      insertInterval(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [4, 8]
      )
    ).toEqual([
      [1, 2],
      [3, 10],
      [12, 16],
    ]);
  });

  it("inserts into an empty list", () => {
    expect(insertInterval([], [5, 7])).toEqual([[5, 7]]);
  });

  it("appends when there is no overlap", () => {
    expect(insertInterval([[1, 5]], [6, 8])).toEqual([
      [1, 5],
      [6, 8],
    ]);
  });

  it("prepends when there is no overlap", () => {
    expect(insertInterval([[5, 7], [8, 10]], [1, 3])).toEqual([
      [1, 3],
      [5, 7],
      [8, 10],
    ]);
  });

  it("merges when new interval covers everything", () => {
    expect(insertInterval([[1, 2], [3, 5], [6, 7]], [0, 10])).toEqual([
      [0, 10],
    ]);
  });

  it("merges touching boundaries on both sides", () => {
    expect(insertInterval([[1, 2], [5, 6]], [2, 5])).toEqual([[1, 6]]);
  });

  it("inserts into a gap without merging", () => {
    expect(insertInterval([[1, 2], [5, 6]], [3, 4])).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });
});
