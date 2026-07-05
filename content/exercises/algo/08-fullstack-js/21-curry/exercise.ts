/**
 * EXERCISE algo/08 — Curry
 *
 * Return a curried version of fn. Each call consumes one argument
 * until all are provided, then fn runs.
 *
 * Examples
 * - curry((a, b, c) => a + b + c)(1)(2)(3) → 6
 * - curry((a, b) => a + b)(1, 2)           → 3  (all at once)
 *
 * Hint: check args.length vs fn.length, return wrapper or result
 * Run: npm run algo:47
 */

export function curry<T extends (...args: unknown[]) => unknown>(
  fn: T
): (...args: unknown[]) => unknown {
  // TODO: your code here
  throw new Error("Not implemented");
}
