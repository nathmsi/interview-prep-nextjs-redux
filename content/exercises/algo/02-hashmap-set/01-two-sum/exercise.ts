/**
 * EXERCISE algo/02 — Two Sum
 *
 * Given an array of integers and a target, return indices of two numbers
 * that add up to target. Exactly one solution exists; don't reuse the same element twice.
 *
 * Return [i, j] with i < j, or null if none (tests always have a solution).
 *
 * Examples
 * - nums = [2, 7, 11, 15], target = 9  → [0, 1]
 * - nums = [3, 2, 4], target = 6         → [1, 2]
 *
 * Hint: Map of (target - num) → index seen so far
 * Run: npm run algo:08
 */

export function twoSum(nums: number[], target: number): [number, number] | null {
  const mapSeenNumberAlready: Map<number,number> = new Map();

  for (let i = 0 ; i <= nums.length -1 ; i++){
    const neededValue = target - nums[i];
    if (neededValue && mapSeenNumberAlready.has(neededValue)){
      return [Number(mapSeenNumberAlready.get(neededValue)),i]
    }
    mapSeenNumberAlready.set(nums[i],i);
  }


  return null;
}
