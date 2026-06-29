# Algo 01 — Merge Intervals

> **Pattern:** Sort + merge  
> **Function:** `mergeIntervals`  
> **Exercise:** `src/exercises/algo/01-merge-intervals/`

## Problem

You are given a list of meetings. Each meeting is a pair `[start, end]` (minutes since midnight).

Merge all intervals that **overlap or touch**, then return the list sorted by start time.

## Examples

- `[[9, 12], [11, 13], [14, 16]]` → `[[9, 13], [14, 16]]`
- `[[1, 4], [2, 3]]` → `[[1, 4]]`
- `[]` → `[]`

## Constraints

- `0 <= intervals.length <= 10_000`
- Target: **O(n log n)** (sort dominates)

## Hint

1. Sort by start time
2. Keep a current interval
3. If the next overlaps → extend the end; else push current and move on

## TypeScript cheatsheet

Patterns you'll use (not the full solution):

```typescript
type Interval = [number, number];

// Copy + sort by start (don't mutate input)
const sorted = [...intervals].sort((a, b) => a[0] - b[0]);

// Destructure a pair
const [start, end] = sorted[i];

// Build result array
const result: Interval[] = [];
result.push([start, end]);

// Read / update last element
const last = result[result.length - 1];
last[1] = Math.max(last[1], end);

// Loop with index
for (let i = 0; i < sorted.length; i++) { /* ... */ }

// Early return
if (intervals.length === 0) return [];
```

## Run locally

```bash
npm run algo:01
```

Implement in `exercise.ts`, then compare with tests in `exercise.test.ts`.
