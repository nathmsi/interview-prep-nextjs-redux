/**
 * EXERCISE algo/08 — Deep Equal
 *
 * Deep equality for plain objects, arrays, and primitives.
 * Ignore prototype differences — compare own enumerable keys only.
 *
 * Examples
 * - deepEqual({ a: 1 }, { a: 1 })           → true
 * - deepEqual({ a: [1, 2] }, { a: [1, 2] }) → true
 * - deepEqual({ a: 1 }, { a: 2 })             → false
 *
 * Hint: recursive — typeof, Array.isArray, Object.keys
 * Run: npm run algo:28
 */

export function deepEqual(a: unknown, b: unknown): boolean {
  // TODO: your code here
  return a === b;
}
