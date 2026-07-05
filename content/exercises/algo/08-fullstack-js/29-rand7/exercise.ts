/**
 * EXERCISE algo/08 — Rand7 from Rand5
 *
 * `rand5()` returns a uniform random integer in [1, 5].
 * Implement `rand7(rand5)` returning a uniform random integer in [1, 7].
 *
 * You may call `rand5()` as many times as needed.
 * Each value 1–7 must have equal probability (rejection sampling is the classic approach).
 *
 * Examples (with a mocked rand5)
 * - Combine two rand5() calls into a value in [1, 25]
 * - Reject values > 21, then map to [1, 7]
 *
 * Hint: rejection sampling — (rand5()-1)*5 + rand5() gives 1..25 uniformly
 * Run: npm run algo:57
 */

export function rand7(rand5: () => number): number {
  // TODO: your code here
  return 1;
}
