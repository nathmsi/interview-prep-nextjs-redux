/**
 * EXERCISE algo/08 — Throttle
 *
 * Return a throttled version of fn — at most once every `wait` ms.
 * The first call runs immediately; subsequent calls within the window are ignored.
 *
 * Examples
 * - throttle(fn, 100) — fn runs at most once per 100ms
 *
 * Hint: track last run time, or use a locked flag + setTimeout
 * Run: npm run algo:31
 */

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  // TODO: your code here
  return fn;
}
