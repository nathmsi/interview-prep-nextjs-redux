/**
 * EXERCISE algo/08 — Pick & Omit
 *
 * pick  — return a new object with only the given keys.
 * omit  — return a new object without the given keys.
 *
 * Examples
 * - pick({ a: 1, b: 2, c: 3 }, ["a", "c"]) → { a: 1, c: 3 }
 * - omit({ a: 1, b: 2, c: 3 }, ["b"])     → { a: 1, c: 3 }
 *
 * Hint: reduce over keys, or Object.fromEntries + filter
 * Run: npm run algo:46
 */

export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  // TODO: your code here
  throw new Error("Not implemented");
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  // TODO: your code here
  throw new Error("Not implemented");
}
