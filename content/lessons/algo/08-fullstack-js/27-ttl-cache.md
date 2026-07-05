# Algo 53 — TTL Cache

> **Category:** Full-stack / practical JS  
> **Class:** `TTLCache`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/27-ttl-cache/`

## Problem

`get` returns value if not expired. `set` stores with TTL from set time.

## TypeScript cheatsheet

```typescript
set(key: string, value: V) {
  this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
}

get(key: string) {
  const entry = this.store.get(key);
  if (!entry || Date.now() >= entry.expiresAt) {
    this.store.delete(key);
    return undefined;
  }
  return entry.value;
}
```

## Run

```bash
npm run algo:53
```
