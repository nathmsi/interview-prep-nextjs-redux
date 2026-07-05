# Algo 46 — Pick & Omit

> **Category:** Full-stack / practical JS  
> **Functions:** `pick`, `omit`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/20-pick-omit/`

## Problem

`pick` keeps only listed keys. `omit` removes listed keys. Do not mutate the input.

## TypeScript cheatsheet

```typescript
export function pick(obj, keys) {
  return Object.fromEntries(keys.map((k) => [k, obj[k]]));
}

export function omit(obj, keys) {
  const exclude = new Set(keys);
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !exclude.has(k))
  );
}
```

## Run

```bash
npm run algo:46
```
