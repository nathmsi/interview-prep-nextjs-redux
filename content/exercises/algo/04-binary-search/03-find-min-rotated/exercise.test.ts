import { describe, it, expect } from "vitest";
import { findMinRotated } from "./exercise";

describe("algo/04-binary-search/03-find-min-rotated", () => {
  it("finds min after rotation", () => {
    expect(findMinRotated([3, 4, 5, 1, 2])).toBe(1);
  });

  it("finds min with longer rotation", () => {
    expect(findMinRotated([4, 5, 6, 7, 0, 1, 2])).toBe(0);
  });

  it("returns first element when not rotated", () => {
    expect(findMinRotated([11, 13, 15, 17])).toBe(11);
  });

  it("handles two elements rotated", () => {
    expect(findMinRotated([2, 1])).toBe(1);
  });

  it("handles single element", () => {
    expect(findMinRotated([7])).toBe(7);
  });
});
