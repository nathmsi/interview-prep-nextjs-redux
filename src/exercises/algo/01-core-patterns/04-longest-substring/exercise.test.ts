import { describe, it, expect } from "vitest";
import { lengthOfLongestSubstring } from "./exercise";

describe("algo/04-longest-substring", () => {
  it("finds longest substring in a mixed string", () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
  });

  it("handles all identical characters", () => {
    expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
  });

  it("handles a window in the middle", () => {
    expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
  });

  it("returns 0 for an empty string", () => {
    expect(lengthOfLongestSubstring("")).toBe(0);
  });

  it("handles repeated chars at the start", () => {
    expect(lengthOfLongestSubstring("aab")).toBe(2);
  });

  it("handles a single character", () => {
    expect(lengthOfLongestSubstring("z")).toBe(1);
  });

  it("treats the whole string as valid when all unique", () => {
    expect(lengthOfLongestSubstring("abcdef")).toBe(6);
  });

  it("handles duplicate separated by other chars", () => {
    expect(lengthOfLongestSubstring("abca")).toBe(3);
  });

  it("does not reset the whole window on duplicate (dvdf)", () => {
    expect(lengthOfLongestSubstring("dvdf")).toBe(3);
  });

  it("keeps a valid window after a duplicate in the middle (abcbad)", () => {
    expect(lengthOfLongestSubstring("abcbad")).toBe(4);
  });
});
