/**
 * EXERCISE algo/02 — Find All Anagrams in a String
 *
 * Given strings s and p, return all start indices of substrings in s
 * that are an anagram of p. Indices in ascending order.
 *
 * Examples
 * - s = "cbaebabacd", p = "abc"  → [0, 6]
 *   "cba" at 0 and "bac" at 6 are anagrams of "abc"
 * - s = "abab", p = "ab"         → [0, 1, 2]
 * - s = "bcd", p = "abcd"        → []
 *
 * Constraints
 * - 1 <= p.length <= s.length <= 30_000
 * - s and p consist of lowercase English letters
 * - Target: O(n) with a sliding window + frequency counts
 *
 * Hint
 * 1. Count letter frequencies in p
 * 2. Slide a window of length p.length over s
 * 3. When window counts match p → record start index
 *
 * Run: npm run algo:56
 */

export function findAnagrams(s: string, p: string): number[] {
  // TODO: your code here
  return [];
}
