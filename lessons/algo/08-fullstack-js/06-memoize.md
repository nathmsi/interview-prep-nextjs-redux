# Algo 32 — Memoize

> **Category:** Full-stack / practical JS  
> **Function:** `memoize`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/06-memoize/`

## Problem

Cache function results keyed by `JSON.stringify(args)`.

## TypeScript cheatsheet

```typescript
const cache = new Map<string, ReturnType<T>>();

return (...args: Parameters<T>): ReturnType<T> => {
  const key = JSON.stringify(args);
  if (cache.has(key)) return cache.get(key)! as ReturnType<T>;

  const result = fn(...args) as ReturnType<T>;
  cache.set(key, result);
  return result;
};
```

## Run

```bash
npm run algo:32
```
