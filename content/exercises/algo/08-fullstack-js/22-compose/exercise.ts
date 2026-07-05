/**
 * EXERCISE algo/08 — Compose
 *
 * compose(f, g, h)(x) === f(g(h(x)))
 * Functions are applied right-to-left.
 *
 * Examples
 * - compose((x: number) => x + 1, (x: number) => x * 2)(3) → 7
 *
 * Hint: reduceRight over the function list
 * Run: npm run algo:48
 */

export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  // TODO: your code here
  throw new Error("Not implemented");
}
