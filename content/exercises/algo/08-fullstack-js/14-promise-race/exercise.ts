/**
 * EXERCISE algo/08 — Promise Race
 *
 * Implement promiseRace — like Promise.race.
 * Resolve or reject with the first settled promise.
 *
 * Examples
 * - promiseRace([slow, fast]) → fast's value
 * - promiseRace([ok, fail])   → rejects with fail's error
 *
 * Hint: Promise.race or attach then/catch to each promise
 * Run: npm run algo:40
 */

export function promiseRace<T>(promises: Promise<T>[]): Promise<T> {
  // TODO: your code here
  throw new Error("Not implemented");
}
