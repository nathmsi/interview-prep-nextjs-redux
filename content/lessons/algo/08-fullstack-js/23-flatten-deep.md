# Algo 49 — Flatten Deep

> **Category:** Full-stack / practical JS  
> **Function:** `flattenDeep`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/23-flatten-deep/`

## Problem

Flatten nested arrays to any depth into a single-level array.

## TypeScript cheatsheet

```typescript
return arr.reduce<T[]>((acc, item) => {
  if (Array.isArray(item)) return acc.concat(flattenDeep(item));
  acc.push(item as T);
  return acc;
}, []);
```

## Run

```bash
npm run algo:49
```
