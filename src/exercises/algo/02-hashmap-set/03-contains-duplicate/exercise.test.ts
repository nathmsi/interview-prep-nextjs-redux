import { describe, it, expect } from "vitest";
import { containsDuplicate } from "./exercise";

describe("algo/02-hashmap/03-contains-duplicate", () => {
  it("returns true when duplicate exists", () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
  });

  it("returns false when all unique", () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
  });

  it("returns true with multiple duplicates", () => {
    expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true);
  });

  it("handles empty array", () => {
    expect(containsDuplicate([])).toBe(false);
  });
});
