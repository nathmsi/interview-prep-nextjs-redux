/**
 * EXERCISE algo/03 — Non-overlapping Intervals
 *
 * Problem
 * -------
 * You are given a list of intervals [start, end].
 *
 * Return the **minimum number of intervals you must remove**
 * so that the rest do not overlap at all.
 *
 * Note: intervals that only touch at a point do NOT count as overlapping.
 * e.g. [1, 2] and [2, 3] can both stay.
 *
 * Examples
 * - [[1,2],[2,3],[3,4],[1,3]] → 1  (remove [1,3])
 * - [[1,2],[1,2],[1,2]]         → 2  (keep one, remove two)
 * - [[1,2],[3,4],[5,6]]         → 0  (already fine)
 * - [[1,3],[2,4]]               → 1  (remove one of them)
 *
 * Constraints
 * - 1 <= intervals.length <= 10_000
 * - 0 <= start < end <= 1440
 * - Target complexity: O(n log n) or better
 *
 * Hint
 * 1. Sort intervals by **end time** (not start — key difference from algo/01)
 * 2. Greedily keep the interval that ends earliest
 * 3. When the next interval starts before your kept end → conflict → count a removal
 *
 * Related
 * - algo/01: merge overlapping intervals
 * - algo/02: insert into non-overlapping list
 *
 * Run: npm run algo:03
 */

export type Interval = [number, number];

export function minRemovalsToNonOverlapping(intervals: Interval[]): number {
  // TODO: your code here
  return 0;
}
