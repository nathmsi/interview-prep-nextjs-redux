/**
 * EXERCISE algo/03 — Two Sum II (sorted array)
 *
 * Given a 1-indexed sorted array and a target, return the two indices [i, j]
 * (1-based) such that nums[i-1] + nums[j-1] === target.
 *
 * Exactly one solution exists; you may not use the same element twice.
 *
 * Examples
 * - numbers = [2, 7, 11, 15], target = 9 → [1, 2]
 * - numbers = [2, 3, 4], target = 6       → [1, 3]
 *
 * Hint: left at 0, right at length - 1, move pointers inward
 * Run: npm run algo:12
 */

export function twoSumII(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left + 1, right + 1];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return null;
}
