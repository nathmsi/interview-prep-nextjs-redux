/**
 * EXERCISE algo/02 — Insert Interval
 *
 * Problem
 * -------
 * You are given an array of non-overlapping intervals sorted by start time,
 * and a new interval to insert.
 *
 * Insert the new interval into the list and merge any overlapping intervals.
 * Return the final sorted, non-overlapping result.
 *
 * Rules
 * - Input intervals do not overlap each other (already merged).
 * - Input is sorted by ascending start time.
 * - Two intervals merge if they overlap OR touch (same rule as algo/01).
 *
 * Examples
 * - intervals = [[1,3],[6,9]],  newInterval = [2,5]  → [[1,5],[6,9]]
 * - intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8] → [[1,2],[3,10],[12,16]]
 * - intervals = [],               newInterval = [5,7]  → [[5,7]]
 * - intervals = [[1,5]],          newInterval = [6,8]  → [[1,5],[6,8]]
 *
 * Constraints
 * - 0 <= intervals.length <= 10_000
 * - 0 <= start <= end <= 1440
 * - Target complexity: O(n) — input is already sorted, avoid re-sorting everything
 *
 * Hint
 * 1. Three phases: add intervals that end BEFORE newInterval starts
 * 2. Merge all intervals that overlap/touch newInterval into one
 * 3. Append intervals that start AFTER the merged block ends
 *
 * Related: algo/01 — merge intervals (same merge logic, but exploit sorted input)
 *
 * Run: npm run algo:02
 */

export type Interval = [number, number];

export function insertInterval(
  intervals: Interval[],
  newInterval: Interval
): Interval[] {
  // TODO: your code here
  return [];
}
