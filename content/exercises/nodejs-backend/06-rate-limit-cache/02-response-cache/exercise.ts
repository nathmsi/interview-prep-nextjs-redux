/**
 * EXERCISE nodejs — Response Cache
 *
 * TTL per entry. Expired keys return undefined.
 *
 * Hint: Store expiresAt with value
 * Run: npm run node:22
 */

export class ResponseCache<V> {
  constructor() {}
  get(key: string): V | undefined { return undefined; }
  set(key: string, value: V, ttlMs: number): void {}
} {
  // TODO: your code here
}