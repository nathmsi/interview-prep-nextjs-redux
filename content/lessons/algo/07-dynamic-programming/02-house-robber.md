# Algo 25 — House Robber

> **Category:** Dynamic programming  
> **Function:** `rob`  
> **Exercise:** `content/exercises/algo/07-dynamic-programming/02-house-robber/`

## Problem

Max money robbing non-adjacent houses.

## TypeScript cheatsheet

```typescript
let prev2 = 0; // dp[i-2]
let prev1 = 0; // dp[i-1]

for (const n of nums) {
  const curr = Math.max(prev1, prev2 + n);
  prev2 = prev1;
  prev1 = curr;
}

return prev1;
```

## Run

```bash
npm run algo:25
```
