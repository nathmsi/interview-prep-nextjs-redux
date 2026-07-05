# Algo 47 — Curry

> **Category:** Full-stack / practical JS  
> **Function:** `curry`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/21-curry/`

## Problem

Return a curried `fn`. Collect args until `fn.length` are provided, then call.

## TypeScript cheatsheet

```typescript
return function curried(...args: unknown[]) {
  if (args.length >= fn.length) return fn(...args);
  return (...more: unknown[]) => curried(...args, ...more);
};
```

## Run

```bash
npm run algo:47
```
