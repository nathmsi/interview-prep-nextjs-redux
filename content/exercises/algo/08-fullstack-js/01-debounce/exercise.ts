/**
 * EXERCISE algo/08 — Debounce
 *
 * Return a debounced version of fn that delays invocation until
 * wait ms have passed since the last call.
 *
 * Examples
 * - debounce(fn, 100) — fn runs once after 100ms of silence
 *
 * Hint: clearTimeout + setTimeout, return a wrapper function
 * Run: npm run algo:27
 */

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => void {
  // TODO: your code here
  void wait;
  return fn;
}
