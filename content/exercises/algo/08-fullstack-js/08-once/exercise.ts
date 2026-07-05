/**
 * EXERCISE algo/08 — Once
 *
 * Return a wrapper that calls fn at most once.
 * Subsequent calls return the result of the first invocation.
 *
 * Examples
 * - const init = once(() => expensive()); init(); init(); // runs once
 *
 * Hint: boolean flag or check if result is cached
 * Run: npm run algo:34
 */

export function once<T extends (...args: unknown[]) => unknown>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
  let result: unknown = null;

  return (...args) => {
    if (result) {
      return result as ReturnType<T>;
    }
    result = fn(...args);
    return result as ReturnType<T>;
  };
}
