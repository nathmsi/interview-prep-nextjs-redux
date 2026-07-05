# Algo 41 — Retry

> **Category:** Full-stack / practical JS  
> **Function:** `retry`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/15-retry/`

## Problem

Call `fn` up to `retries + 1` times. Optional `delay` ms between failed attempts.

## TypeScript cheatsheet

```typescript
for (let attempt = 0; attempt <= options.retries; attempt++) {
  try {
    return await fn();
  } catch (err) {
    if (attempt === options.retries) throw err;
    if (options.delay) await new Promise((r) => setTimeout(r, options.delay));
  }
}
```

## Run

```bash
npm run algo:41
```
