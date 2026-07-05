/**
 * EXERCISE nodejs — Request Dedup
 *
 * Same key in flight shares one promise.
 *
 * Hint: Map key -> promise, delete on settle
 * Run: npm run node:23
 */

export function dedupeRequests<T>(key: string, fn: () => Promise<T>): Promise<T> {
  // TODO: your code here
  return fn();
}