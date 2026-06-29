/**
 * EXERCISE algo/08 — Set By Path
 *
 * Set a nested value using a dot-separated path.
 * Mutates the object in place. Creates intermediate objects as needed.
 *
 * Examples
 * - setByPath({}, "a.b.c", 42)           → { a: { b: { c: 42 } } }
 * - setByPath({ a: { b: 1 } }, "a.b", 2) → { a: { b: 2 } }
 *
 * Hint: split path, reduce to parent, assign last key — like getByPath but write
 * Run: npm run algo:38
 */

export function setByPath(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): void {
  // TODO: your code here
}
