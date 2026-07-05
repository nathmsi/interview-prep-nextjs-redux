# Algo 45 — Deep Merge

> **Category:** Full-stack / practical JS  
> **Function:** `deepMerge`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/19-deep-merge/`

## Problem

Merge `source` into `target`. Nested plain objects merge; arrays and primitives are replaced.

## TypeScript cheatsheet

```typescript
const result = { ...target };
for (const [key, value] of Object.entries(source)) {
  const existing = result[key];
  if (isPlainObject(existing) && isPlainObject(value)) {
    result[key] = deepMerge(existing, value);
  } else {
    result[key] = value;
  }
}
return result;
```

## Run

```bash
npm run algo:45
```
