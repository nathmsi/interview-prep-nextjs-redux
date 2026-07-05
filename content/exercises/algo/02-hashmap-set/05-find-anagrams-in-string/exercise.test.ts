import { describe, it, expect } from "vitest";
import { findAnagrams } from "./exercise";

describe("algo/02-hashmap/05-find-anagrams-in-string", () => {
  it("finds anagram substrings in classic example", () => {
    expect(findAnagrams("cbaebabacd", "abc")).toEqual([0, 6]);
  });

  it("finds overlapping anagram windows", () => {
    expect(findAnagrams("abab", "ab")).toEqual([0, 1, 2]);
  });

  it("returns empty when p is longer than s", () => {
    expect(findAnagrams("bcd", "abcd")).toEqual([]);
  });

  it("returns empty when no anagram exists", () => {
    expect(findAnagrams("abcdef", "gh")).toEqual([]);
  });

  it("handles single-character pattern", () => {
    expect(findAnagrams("aaabb", "a")).toEqual([0, 1, 2]);
    expect(findAnagrams("aaabb", "b")).toEqual([3, 4]);
  });

  it("handles exact full-string match", () => {
    expect(findAnagrams("abc", "abc")).toEqual([0]);
    expect(findAnagrams("abc", "cba")).toEqual([0]);
  });

  it("handles repeated letters in pattern", () => {
    expect(findAnagrams("baa", "aa")).toEqual([1]);
    expect(findAnagrams("ababab", "aab")).toEqual([0, 1, 2, 3]);
  });
});
