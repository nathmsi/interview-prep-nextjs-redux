# Algo 31 — Throttle

> **Category:** Full-stack / practical JS  
> **Function:** `throttle`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/05-throttle/`

## Problem

At most one call every `wait` ms. First call runs immediately.

## TypeScript cheatsheet

```typescript
let lastRun = 0;

return (...args: Parameters<T>) => {
  const now = Date.now();
  if (now - lastRun >= wait) {
    lastRun = now;
    fn(...args);
  }
};
```

With fake timers in tests, `Date.now()` works when advanced via `vi.advanceTimersByTime`.

## Run

```bash
npm run algo:31
```
