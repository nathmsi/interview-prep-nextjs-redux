/**
 * EXERCISE algo/08 — Deep Merge
 *
 * Recursively merge source into target. Nested plain objects are merged.
 * Arrays and primitives from source replace target values.
 *
 * Examples
 * - deepMerge({ a: 1, b: { x: 1 } }, { b: { y: 2 } })
 *   → { a: 1, b: { x: 1, y: 2 } }
 * - deepMerge({ a: [1] }, { a: [2, 3] }) → { a: [2, 3] }
 *
 * Hint: loop source keys — if both values are plain objects, recurse
 * Run: npm run algo:45
 */

export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  // TODO: your code here
  throw new Error("Not implemented");
}
