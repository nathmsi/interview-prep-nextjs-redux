/**
 * EXERCISE algo/08 — Flatten
 *
 * Flatten one level of nesting in an array.
 *
 * Examples
 * - flatten([1, [2, 3], [4]])     → [1, 2, 3, 4]
 * - flatten([[1, 2], [3, 4]])     → [1, 2, 3, 4]
 * - flatten([1, 2, 3])            → [1, 2, 3]
 *
 * Hint: flatMap or reduce + Array.isArray
 * Run: npm run algo:36
 */

export function flatten<T>(items: unknown[]): T[] {
  // TODO: your code here
  return items as T[];
}
