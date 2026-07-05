/**
 * EXERCISE algo/08 — Memoize
 *
 * Return a memoized version of fn that caches results by arguments.
 * Use JSON.stringify(args) as the cache key.
 *
 * Examples
 * - memoize((n) => n * 2)(5) → 10, second call with 5 hits cache
 *
 * Hint: Map<string, ReturnType<T>>, key = JSON.stringify(args)
 * Run: npm run algo:32
 */

export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  };
}
