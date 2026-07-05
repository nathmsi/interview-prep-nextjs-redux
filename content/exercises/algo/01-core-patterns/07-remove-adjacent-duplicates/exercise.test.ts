import { describe, it, expect } from "vitest";
import { removeAdjacentDuplicates } from "./exercise";

describe("algo/07-remove-adjacent-duplicates", () => {
  it("removes duplicates in multiple passes", () => {
    expect(removeAdjacentDuplicates("abbaca")).toBe("ca");
  });

  it("removes nested duplicate pairs", () => {
    expect(removeAdjacentDuplicates("azxxzy")).toBe("ay");
  });

  it("chains removals across the string", () => {
    expect(removeAdjacentDuplicates("aabccba")).toBe("a");
  });

  it("returns an empty string when input is empty", () => {
    expect(removeAdjacentDuplicates("")).toBe("");
  });

  it("returns the same string when there are no duplicates", () => {
    expect(removeAdjacentDuplicates("abcd")).toBe("abcd");
  });

  it("removes a single adjacent pair", () => {
    expect(removeAdjacentDuplicates("aab")).toBe("b");
  });

  it("fully clears when everything cancels out", () => {
    expect(removeAdjacentDuplicates("aabb")).toBe("");
  });

  it("handles duplicates at the end", () => {
    expect(removeAdjacentDuplicates("abb")).toBe("a");
  });
});
