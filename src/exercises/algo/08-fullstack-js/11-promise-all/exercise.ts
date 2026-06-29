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
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results: T[] = new Array(promises.length);
    let remaining = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          remaining--;
          if (remaining === 0) resolve(results);
        })
        .catch(reject);
    });
  });
}
