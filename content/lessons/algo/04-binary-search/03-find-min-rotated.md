# Algo 15 — Find Minimum in Rotated Sorted Array

> **Category:** Binary search  
> **Function:** `findMinRotated`  
> **Exercise:** `content/exercises/algo/04-binary-search/03-find-min-rotated/`

## Problem

Sorted array rotated at unknown pivot → return the minimum value.

## TypeScript cheatsheet

```typescript
let left = 0;
let right = nums.length - 1;

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (nums[mid] > nums[right]) {
    // min is in the right half
    left = mid + 1;
  } else {
    // min is in the left half (including mid)
    right = mid;
  }
}

return nums[left];
```

## Run

```bash
npm run algo:15
```
