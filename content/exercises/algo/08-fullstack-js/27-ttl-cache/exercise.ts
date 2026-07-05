/**
 * EXERCISE algo/08 — TTL Cache
 *
 * get(key) returns value if present and not expired, else undefined.
 * set(key, value) stores value; expires after ttlMs from set time.
 *
 * Examples
 * - cache.set("a", 1); cache.get("a") → 1
 * - after ttlMs: cache.get("a") → undefined
 *
 * Hint: Map with { value, expiresAt }, check Date.now() on get
 * Run: npm run algo:53
 */

export class TTLCache<V> {
  constructor(_ttlMs: number) {
    // TODO: your code here
  }

  get(_key: string): V | undefined {
    throw new Error("Not implemented");
  }

  set(_key: string, _value: V): void {
    throw new Error("Not implemented");
  }
}
