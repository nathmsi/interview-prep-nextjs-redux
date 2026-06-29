# Algo 03 — Non-overlapping Intervals

> **Pattern:** Greedy (sort by **end**)  
> **Function:** `minRemovalsToNonOverlapping`  
> **Exercise:** `src/exercises/algo/03-non-overlapping-intervals/`

## Problem

Return the **minimum number of intervals to remove** so the rest do not overlap.

**Note:** Intervals that only **touch** at a point are OK (`[1,2]` and `[2,3]` can both stay).

## Examples

- `[[1,2],[2,3],[3,4],[1,3]]` → `1`
- `[[1,2],[1,2],[1,2]]` → `2`
- `[[1,2],[3,4],[5,6]]` → `0`

## Hint

1. Sort by **end time** (not start)
2. Greedily keep the interval that ends earliest
3. If the next starts before your kept end → count a removal

## TypeScript cheatsheet

```typescript
type Interval = [number, number];

// Sort by END time (key difference from algo/01)
const sorted = [...intervals].sort((a, b) => a[1] - b[1]);

// Greedy counters
let removals = 0;
let currentEnd = sorted[0][1];

for (let i = 1; i < sorted.length; i++) {
  const [start, end] = sorted[i];

  // Overlap: next starts BEFORE current end (strict < — touching is OK)
  if (start < currentEnd) {
    removals++;
  } else {
    currentEnd = end;
  }
}

return removals;
```

## Run locally

```bash
npm run algo:03
```
