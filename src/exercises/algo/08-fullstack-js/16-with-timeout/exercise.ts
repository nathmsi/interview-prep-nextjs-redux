/**
 * EXERCISE algo/08 — With Timeout
 *
 * Return a promise that rejects with Error("Timeout") if the
 * input promise does not settle within ms milliseconds.
 *
 * Examples
 * - withTimeout(slowFetch(), 5000) — rejects after 5s
 * - withTimeout(fast(), 1000)       — resolves with fast's value
 *
 * Hint: Promise.race with a timer promise
 * Run: npm run algo:42
 */

export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Timeout"));
    }, ms);

    try {
      const result = await promise;
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      clearTimeout(timer);
    }
  });
}
