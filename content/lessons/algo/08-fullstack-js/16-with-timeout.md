# Algo 42 — With Timeout

> **Category:** Full-stack / practical JS  
> **Function:** `withTimeout`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/16-with-timeout/`

## Problem

Reject with `Error("Timeout")` if `promise` does not settle within `ms`.

## TypeScript cheatsheet

```typescript
return Promise.race([
  promise,
  new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  ),
]);
```

## Run

```bash
npm run algo:42
```
