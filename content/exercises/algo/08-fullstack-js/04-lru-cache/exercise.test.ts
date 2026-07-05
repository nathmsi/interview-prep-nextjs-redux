import { describe, it, expect } from "vitest";
import { LRUCache } from "./exercise";

describe("algo/08-fullstack-js/04-lru-cache", () => {
  it("evicts least recently used key", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(1);
    cache.put(3, 3);
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(3)).toBe(3);
  });

  it("updates existing key and marks as recently used", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(1, 10);
    cache.put(3, 3);
    expect(cache.get(1)).toBe(10);
    expect(cache.get(2)).toBe(-1);
  });

  it("returns -1 for missing key", () => {
    const cache = new LRUCache(1);
    expect(cache.get(99)).toBe(-1);
  });

  it("handles capacity 1", () => {
    const cache = new LRUCache(1);
    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
  });
});
