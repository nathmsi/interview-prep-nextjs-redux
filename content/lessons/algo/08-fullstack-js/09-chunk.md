# Algo 35 — Chunk

> **Category:** Full-stack / practical JS  
> **Function:** `chunk`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/09-chunk/`

## Problem

Split an array into sub-arrays of length `size`.

## TypeScript cheatsheet

```typescript
const result: T[][] = [];

for (let i = 0; i < items.length; i += size) {
  result.push(items.slice(i, i + size));
}

return result;
```

## Run

```bash
npm run algo:35
```
