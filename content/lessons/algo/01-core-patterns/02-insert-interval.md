# Algo 02 — Insert Interval

> **Pattern:** Linear scan (sorted input)  
> **Function:** `insertInterval`  
> **Exercise:** `content/exercises/algo/02-insert-interval/`

## Problem

Given **sorted, non-overlapping** intervals and a new interval, insert it and merge overlaps.

## Examples

- `[[1,3],[6,9]]` + `[2,5]` → `[[1,5],[6,9]]`
- `[[1,2],[3,5],[6,7],[8,10],[12,16]]` + `[4,8]` → `[[1,2],[3,10],[12,16]]`
- `[]` + `[5,7]` → `[[5,7]]`

## Constraints

- Target: **O(n)** — avoid re-sorting the whole list

## Hint

Three phases in one pass:

1. Intervals that end **before** the new one starts
2. Merge everything that overlaps/touches the new interval
3. Append the rest

## TypeScript cheatsheet

```typescript
type Interval = [number, number];

// Destructure the new interval
let [start, end] = newInterval;

// while loop — phase 1: skip intervals that end before new start
let i = 0;
while (i < intervals.length && intervals[i][1] < start) {
  result.push(intervals[i]);
  i++;
}

// Merge overlapping: extend start/end
start = Math.min(start, intervals[i][0]);
end = Math.max(end, intervals[i][1]);

// for loop — scan the rest
for (; i < intervals.length; i++) { /* ... */ }

// Optional shortcut (O(n log n)): reuse merge from algo/01
// mergeIntervals([...intervals, newInterval])
```

## Run locally

```bash
npm run algo:02
```
