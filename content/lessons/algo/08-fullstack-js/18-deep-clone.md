# Algo 44 — Deep Clone

> **Category:** Full-stack / practical JS  
> **Function:** `deepClone`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/18-deep-clone/`

## Problem

Deep clone plain objects and arrays. Primitives returned as-is.

## TypeScript cheatsheet

```typescript
if (typeof value !== "object" || value === null) return value;
if (Array.isArray(value)) return value.map(deepClone) as T;
return Object.fromEntries(
  Object.entries(value).map(([k, v]) => [k, deepClone(v)])
) as T;
```

## Run

```bash
npm run algo:44
```
