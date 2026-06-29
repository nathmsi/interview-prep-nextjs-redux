# Algo 26 — Coin Change

> **Category:** Dynamic programming  
> **Function:** `coinChange`  
> **Exercise:** `src/exercises/algo/07-dynamic-programming/03-coin-change/`

## Problem

Minimum number of coins to make `amount`. Return `-1` if impossible.

## TypeScript cheatsheet

```typescript
const dp = Array(amount + 1).fill(Infinity);
dp[0] = 0;

for (let a = 1; a <= amount; a++) {
  for (const coin of coins) {
    if (coin <= a) {
      dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
}

return dp[amount] === Infinity ? -1 : dp[amount];
```

## Run

```bash
npm run algo:26
```
