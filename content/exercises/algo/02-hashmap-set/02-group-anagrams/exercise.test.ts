import { describe, it, expect } from "vitest";
import { groupAnagrams } from "./exercise";

function normalize(groups: string[][]): string[][] {
  return groups
    .map((g) => [...g].sort())
    .sort((a, b) => a[0]?.localeCompare(b[0] ?? "") ?? 0);
}

describe("algo/02-hashmap/02-group-anagrams", () => {
  it("groups anagrams together", () => {
    expect(
      normalize(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
    ).toEqual(
      normalize([
        ["eat", "tea", "ate"],
        ["tan", "nat"],
        ["bat"],
      ])
    );
  });

  it("handles a single empty string", () => {
    expect(normalize(groupAnagrams([""]))).toEqual([[""]]);
  });

  it("handles a single word", () => {
    expect(normalize(groupAnagrams(["a"]))).toEqual([["a"]]);
  });
});
