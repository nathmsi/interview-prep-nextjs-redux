# Algo 27 — Debounce

> **Category:** Full-stack / practical JS  
> **Function:** `debounce`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/01-debounce/`

## Problem

Delay `fn` until `wait` ms after the last call.

## TypeScript cheatsheet

```typescript
let timer: ReturnType<typeof setTimeout> | undefined;

return (...args: Parameters<T>) => {
  clearTimeout(timer);
  timer = setTimeout(() => fn(...args), wait);
};
```

## Run

```bash
npm run algo:27
```
