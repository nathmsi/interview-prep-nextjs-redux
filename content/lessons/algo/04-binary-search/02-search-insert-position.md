# Algo 14 — Search Insert Position

> **Category:** Binary search  
> **Function:** `searchInsert`  
> **Exercise:** `content/exercises/algo/04-binary-search/02-search-insert-position/`

## Problem

Return the index where `target` would be inserted in a sorted array.

## TypeScript cheatsheet

Same loop as binary search. When target is not found, **`left`** is the insert index.

```typescript
let left = 0;
let right = nums.length - 1;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (nums[mid] === target) return mid;
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}

return left; // insert here
```

## Run

```bash
npm run algo:14
```
