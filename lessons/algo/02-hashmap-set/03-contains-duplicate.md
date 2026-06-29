# Algo 10 — Contains Duplicate

> **Category:** HashMap / Set  
> **Function:** `containsDuplicate`  
> **Exercise:** `src/exercises/algo/02-hashmap-set/03-contains-duplicate/`

## Problem

Return `true` if any value appears at least twice.

## Examples

- `[1, 2, 3, 1]` → `true`
- `[1, 2, 3, 4]` → `false`

## TypeScript cheatsheet

```typescript
const seen = new Set<number>();

for (const n of nums) {
  if (seen.has(n)) return true;
  seen.add(n);
}

return false;
```

## Run

```bash
npm run algo:10
```
