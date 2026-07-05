# Algo 34 — Once

> **Category:** Full-stack / practical JS  
> **Function:** `once`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/08-once/`

## Problem

Wrap `fn` so it runs at most once; later calls return the cached result.

## TypeScript cheatsheet

```typescript
let called = false;
let result: ReturnType<T>;

return (...args: Parameters<T>): ReturnType<T> => {
  if (!called) {
    called = true;
    result = fn(...args) as ReturnType<T>;
  }
  return result;
};
```

## Run

```bash
npm run algo:34
```
