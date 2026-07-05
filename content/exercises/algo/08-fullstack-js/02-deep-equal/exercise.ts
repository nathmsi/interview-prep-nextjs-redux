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
  if (a === b) return true;

  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null || b === null) return false;

  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) return false;

  if (aIsArray && bIsArray) {
    if (a.length !== b.length) return false;
    return a.every((value, index) => deepEqual(value, b[index]));
  }

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keysA = Object.keys(objA);

  if (keysA.length !== Object.keys(objB).length) return false;

  return keysA.every(
    (key) => Object.hasOwn(objB, key) && deepEqual(objA[key], objB[key])
  );
}
