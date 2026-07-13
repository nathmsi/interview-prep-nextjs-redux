/**
 * EXERCISE algo/04 — Longest Substring Without Repeating Characters
 *
 * Problem
 * -------
 * Given a string, return the length of the longest substring
 * that contains no repeated character.
 *
 * Examples
 * - "abcabcbb" → 3   ("abc")
 * - "bbbbb"    → 1   ("b")
 * - "pwwkew"   → 3   ("wke")
 * - ""         → 0
 * - "aab"      → 2   ("ab")
 *
 * Constraints
 * - 0 <= s.length <= 50_000
 * - s consists of English letters, digits, symbols, and spaces
 * - Target complexity: O(n) — use a sliding window, not O(n²) brute force
 *
 * Hint
 * 1. Use two pointers (window start + end)
 * 2. Track characters currently in the window (Set or Map)
 * 3. When you see a duplicate → shrink window from the left until it's valid again
 *
 * Pattern: sliding window (very common in interviews)
 *
 * Run: npm run algo:04
 */

export function lengthOfLongestSubstring(s: string): number {
  // TODO: your code here
  return 0;
}
