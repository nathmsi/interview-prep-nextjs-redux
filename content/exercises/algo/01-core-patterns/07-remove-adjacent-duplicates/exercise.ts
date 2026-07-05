/**
 * EXERCISE algo/07 — Remove All Adjacent Duplicates
 *
 * Problem
 * -------
 * Given a string, repeatedly remove adjacent duplicate characters
 * until no adjacent duplicates remain.
 *
 * When you find two identical adjacent letters, remove both.
 * Return the final string.
 *
 * Examples
 * - "abbaca"  → "ca"     (remove "bb" → "aaca", then "aa" → "ca")
 * - "azxxzy"  → "ay"     (remove "xx" → "azzy", then "zz" → "ay")
 * - "aabccba" → "a"      (remove "aa" → "bccba" → "bba" → "a")
 * - ""        → ""
 * - "abcd"    → "abcd"   (nothing to remove)
 *
 * Constraints
 * - 0 <= s.length <= 100_000
 * - s consists of lowercase English letters
 * - Target complexity: O(n) time, O(n) space
 *
 * Hint
 * 1. Same stack pattern as algo/05 and algo/06
 * 2. Scan left to right
 * 3. If current char equals stack top → pop (cancel the pair)
 * 4. Otherwise → push
 * 5. Join stack at the end
 *
 * Run: npm run algo:07
 */

export function removeAdjacentDuplicates(s: string): string {
  const stack: string[] = [];
  
  for(const letter of s) {
    if (letter === stack.at(-1)) {
      stack.pop();
    } else {
      stack.push(letter);
    }
  }

  return stack.join('');
}
