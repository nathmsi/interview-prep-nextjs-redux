# Algo 12 — Two Sum II (sorted)

> **Category:** Two pointers  
> **Function:** `twoSumII`  
> **Exercise:** `src/exercises/algo/03-two-pointers/02-two-sum-ii/`

## Problem

Sorted array, find two numbers that sum to `target`. Return **1-based** indices `[i, j]`.

## Examples

- `[2, 7, 11, 15]`, target `9` → `[1, 2]`
- `[2, 3, 4]`, target `6` → `[1, 3]`

## TypeScript cheatsheet

```typescript
let left = 0;
let right = nums.length - 1;

while (left < right) {
  const sum = nums[left] + nums[right];
  if (sum === target) {
    return [left + 1, right + 1]; // 1-based
  }
  if (sum < target) {
    left++;
  } else {
    right--;
  }
}
```

## Run

```bash
npm run algo:12
```
