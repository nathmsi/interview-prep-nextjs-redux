import { describe, it, expect } from "vitest";
import { isValidPalindrome } from "./exercise";

describe("algo/03-two-pointers/01-valid-palindrome", () => {
  it("accepts a classic palindrome phrase", () => {
    expect(isValidPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it("rejects non-palindrome", () => {
    expect(isValidPalindrome("race a car")).toBe(false);
  });

  it("accepts empty string", () => {
    expect(isValidPalindrome("")).toBe(true);
  });

  it("ignores case and punctuation", () => {
    expect(isValidPalindrome("0P")).toBe(false);
    expect(isValidPalindrome("ab@ba")).toBe(true);
  });
});
