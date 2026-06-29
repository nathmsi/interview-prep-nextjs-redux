/**
 * EXERCISE algo/02 — Contains Duplicate
 *
 * Return true if any value appears at least twice in the array.
 *
 * Examples
 * - [1, 2, 3, 1] → true
 * - [1, 2, 3, 4] → false
 * - [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] → true
 *
 * Hint: Set — if seen.has(n) return true
 * Run: npm run algo:10
 */

export function containsDuplicate(nums: number[]): boolean {

  const numbersSet: Set<number> = new Set();

  for (const num of nums) {
    if (numbersSet.has(num)) {
      return true;
    }
    numbersSet.add(num);
  }

  return false;
}
