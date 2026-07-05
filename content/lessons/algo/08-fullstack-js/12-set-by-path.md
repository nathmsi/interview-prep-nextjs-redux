# Algo 38 — Set By Path

> **Category:** Full-stack / practical JS  
> **Function:** `setByPath`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/12-set-by-path/`

## Problem

Set a nested value by dot-separated path. Mutates `obj` in place.

## TypeScript cheatsheet

Pair with **getByPath** — same `split(".")`, but write instead of read:

```typescript
const keys = path.split(".");
let current: Record<string, unknown> = obj;

for (let i = 0; i < keys.length - 1; i++) {
  const key = keys[i]!;
  if (typeof current[key] !== "object" || current[key] === null) {
    current[key] = {};
  }
  current = current[key] as Record<string, unknown>;
}

current[keys[keys.length - 1]!] = value;
```

## Run

```bash
npm run algo:38
```
