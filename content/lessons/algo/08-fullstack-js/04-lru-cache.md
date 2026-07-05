# Algo 30 — LRU Cache

> **Category:** Full-stack / practical JS  
> **Function:** `LRUCache`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/04-lru-cache/`

## Problem

`get` and `put` in O(1) average time. Evict least recently used when full.

## TypeScript cheatsheet

Use a `Map` — on access, delete and re-insert to mark as most recent:

```typescript
get(key: number): number {
  if (!this.map.has(key)) return -1;
  const value = this.map.get(key)!;
  this.map.delete(key);
  this.map.set(key, value);
  return value;
}

put(key: number, value: number): void {
  if (this.map.has(key)) this.map.delete(key);
  this.map.set(key, value);
  if (this.map.size > this.capacity) {
    const oldest = this.map.keys().next().value!;
    this.map.delete(oldest);
  }
}
```

## Run

```bash
npm run algo:30
```
