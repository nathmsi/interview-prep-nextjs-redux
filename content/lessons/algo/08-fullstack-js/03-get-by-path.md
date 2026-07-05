# Algo 29 — Get By Path

> **Category:** Full-stack / practical JS  
> **Function:** `getByPath`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/03-get-by-path/`

## Problem

Read a nested value using a dot-separated path (e.g. `"a.b.c"`).

## TypeScript cheatsheet

```typescript
return path.split(".").reduce<unknown>((acc, key) => {
  if (acc === null || acc === undefined) return undefined;
  if (typeof acc !== "object") return undefined;
  return (acc as Record<string, unknown>)[key];
}, obj);
```

## Run

```bash
npm run algo:29
```
