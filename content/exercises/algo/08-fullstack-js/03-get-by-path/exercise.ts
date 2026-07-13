/**
 * EXERCISE algo/08 — Get By Path
 *
 * Read a nested value using a dot-separated path string.
 * Return undefined if any segment is missing.
 *
 * Examples
 * - getByPath({ a: { b: { c: 42 } } }, "a.b.c") → 42
 * - getByPath({ a: 1 }, "a.b")                  → undefined
 * - getByPath([1, [2, 3]], "1.1")               → 3  (arrays are objects)
 *
 * Hint: split path, reduce with optional chaining logic
 * Run: npm run algo:29
 */


//Object.hasOwn(objB, key) 


export function getByPath(obj: unknown, path: string): unknown {
  // TODO: your code here
  void obj;
  void path;
  return undefined;
}