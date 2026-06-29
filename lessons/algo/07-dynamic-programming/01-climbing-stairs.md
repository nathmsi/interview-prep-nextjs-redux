# Algo 24 — Climbing Stairs

> **Category:** Dynamic programming  
> **Function:** `climbStairs`  
> **Exercise:** `src/exercises/algo/07-dynamic-programming/01-climbing-stairs/`

## Problem

Count distinct ways to climb `n` steps (1 or 2 at a time).

## TypeScript cheatsheet

Fibonacci — O(1) space with two variables:

```typescript
if (n <= 2) return n;

let prev = 1;
let curr = 2;

for (let i = 3; i <= n; i++) {
  const next = prev + curr;
  prev = curr;
  curr = next;
}

return curr;
```

## Run

```bash
npm run algo:24
```
