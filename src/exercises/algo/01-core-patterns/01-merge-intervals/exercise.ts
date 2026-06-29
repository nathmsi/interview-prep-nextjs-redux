/**
 * EXERCISE algo/01 — Merge Intervals
 *
 * Problem
 * -------
 * You are given a list of meetings. Each meeting is a pair [start, end]
 * (integers = minutes since midnight, e.g. [9, 12] = 9:00 → 12:00).
 *
 * Goal: merge all intervals that overlap or touch,
 * then return the list sorted by start time.
 *
 * Rules
 * - Two intervals [a, b] and [c, d] merge if c <= b (touching counts as merging).
 * - e.g. [9, 12] + [12, 14] → [9, 14]
 * - Output must be sorted by ascending start time.
 *
 * Examples
 * - [[9, 12], [11, 13], [14, 16]] → [[9, 13], [14, 16]]
 * - [[1, 4], [2, 3]]               → [[1, 4]]
 * - [[5, 7], [8, 9], [10, 12]]     → [[5, 7], [8, 9], [10, 12]]
 * - []                             → []
 *
 * Constraints
 * - 0 <= intervals.length <= 10_000
 * - 0 <= start <= end <= 1440 (24 hours in minutes)
 * - Target complexity: O(n log n) or better
 *
 * Hint
 * 1. Sort by start time
 * 2. Walk through while keeping a "current" interval
 * 3. If the next one overlaps → extend the end; otherwise → push current and move on
 *
 * Run: npm run algo:01
 */

export type Interval = [number, number];

export function mergeIntervals(intervals: Interval[]): Interval[] {
  // TODO: your code here
  return [];
}