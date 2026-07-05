import { describe, it, expect } from "vitest";
import { isAnagram } from "./exercise";

describe("algo/02-hashmap/04-valid-anagram", () => {
  it("returns true for valid anagrams", () => {
    expect(isAnagram("anagram", "nagaram")).toBe(true);
    expect(isAnagram("listen", "silent")).toBe(true);
  });

  it("returns false when letters differ", () => {
    expect(isAnagram("rat", "car")).toBe(false);
  });

  it("returns false when lengths differ", () => {
    expect(isAnagram("a", "ab")).toBe(false);
    expect(isAnagram("ab", "a")).toBe(false);
  });

  it("returns false when same length but different counts", () => {
    expect(isAnagram("aab", "abb")).toBe(false);
  });

  it("handles empty strings", () => {
    expect(isAnagram("", "")).toBe(true);
  });

  it("handles single character", () => {
    expect(isAnagram("a", "a")).toBe(true);
    expect(isAnagram("a", "b")).toBe(false);
  });
});
