# Algo 43 — Concurrency Limit

> **Category:** Full-stack / practical JS  
> **Function:** `mapWithLimit`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/17-concurrency-limit/`

## Problem

Run `fn` on each item with at most `limit` concurrent promises. Preserve result order.

## TypeScript cheatsheet

```typescript
const results: R[] = new Array(items.length);
let nextIndex = 0;

async function worker() {
  while (nextIndex < items.length) {
    const i = nextIndex++;
    results[i] = await fn(items[i], i);
  }
}

await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
return results;
```

## Run

```bash
npm run algo:43
```
