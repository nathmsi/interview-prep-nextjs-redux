# Algo 50 — Unique By

> **Category:** Full-stack / practical JS  
> **Function:** `uniqueBy`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/24-unique-by/`

## Problem

Deduplicate items by `keyFn(item)`. First occurrence wins.

## TypeScript cheatsheet

```typescript
const seen = new Set<K>();
return items.filter((item) => {
  const key = keyFn(item);
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});
```

## Run

```bash
npm run algo:50
```
