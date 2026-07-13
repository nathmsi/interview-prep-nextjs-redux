/**
 * EXERCISE algo/08 — Promise All
 *
 * Implement promiseAll — like Promise.all.
 * Resolve with an array of results, or reject on first failure.
 *
 * Examples
 * - promiseAll([Promise.resolve(1), Promise.resolve(2)]) → [1, 2]
 * - promiseAll([Promise.resolve(1), Promise.reject("err")]) → rejects
 *
 * Hint: Promise.all or manual counter + results array
 * Run: npm run algo:37
 */

export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  // TODO: your code here
  promises.forEach((p) => void p.catch(() => {}));
  return Promise.resolve([]);
}
