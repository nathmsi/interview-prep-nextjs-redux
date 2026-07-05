# Algo 13 — Binary Search

> **Category:** Binary search  
> **Function:** `binarySearch`  
> **Exercise:** `content/exercises/algo/04-binary-search/01-binary-search/`

## Problem

Sorted array, find `target`. Return index or `-1`.

## TypeScript cheatsheet

```typescript
let left = 0;
let right = nums.length - 1;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (nums[mid] === target) return mid;
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}

return -1;
```

## Run

```bash
npm run algo:13
```
