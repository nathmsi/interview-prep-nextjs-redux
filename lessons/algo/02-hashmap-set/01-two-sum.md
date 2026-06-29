# Algo 08 — Two Sum

> **Category:** HashMap / Set  
> **Function:** `twoSum`  
> **Exercise:** `src/exercises/algo/02-hashmap-set/01-two-sum/`

## Problem

Return **indices** `[i, j]` (i < j) of two numbers that add up to `target`.

## Examples

- `[2, 7, 11, 15]`, target `9` → `[0, 1]`
- `[3, 2, 4]`, target `6` → `[1, 2]`

## TypeScript cheatsheet

```typescript
const seen = new Map<number, number>(); // value → index

for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i];
  if (seen.has(need)) {
    return [seen.get(need)!, i];
  }
  seen.set(nums[i], i);
}
```

## Run

```bash
npm run algo:08
```
