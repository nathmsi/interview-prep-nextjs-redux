# Algo 33 — Group By

> **Category:** Full-stack / practical JS  
> **Function:** `groupBy`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/07-group-by/`

## Problem

Group array items into buckets keyed by `keyFn(item)`.

## TypeScript cheatsheet

```typescript
return items.reduce<Record<K, T[]>>((acc, item) => {
  const key = keyFn(item);
  if (!acc[key]) acc[key] = [];
  acc[key].push(item);
  return acc;
}, {} as Record<K, T[]>);
```

## Run

```bash
npm run algo:33
```
