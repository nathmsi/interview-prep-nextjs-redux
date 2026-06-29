# Algo 36 — Flatten

> **Category:** Full-stack / practical JS  
> **Function:** `flatten`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/10-flatten/`

## Problem

Flatten one level of nesting: `[1, [2, 3]]` → `[1, 2, 3]`.

## TypeScript cheatsheet

```typescript
return items.flatMap((item) =>
  Array.isArray(item) ? item : [item]
) as T[];
```

Or with `reduce`:

```typescript
return items.reduce<T[]>((acc, item) => {
  if (Array.isArray(item)) return acc.concat(item);
  acc.push(item as T);
  return acc;
}, []);
```

## Run

```bash
npm run algo:36
```
