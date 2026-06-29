# Algo 28 — Deep Equal

> **Category:** Full-stack / practical JS  
> **Function:** `deepEqual`  
> **Exercise:** `src/exercises/algo/08-fullstack-js/02-deep-equal/`

## Problem

Deep equality for primitives, arrays, and plain objects.

## TypeScript cheatsheet

```typescript
if (a === b) return true;
if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
  return false;
}

if (Array.isArray(a) !== Array.isArray(b)) return false;

const keysA = Object.keys(a as object);
const keysB = Object.keys(b as object);
if (keysA.length !== keysB.length) return false;

return keysA.every((key) =>
  deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
);
```

## Run

```bash
npm run algo:28
```
