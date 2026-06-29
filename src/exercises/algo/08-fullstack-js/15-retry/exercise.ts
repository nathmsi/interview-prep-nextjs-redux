/**
 * EXERCISE algo/08 — Retry
 *
 * Call fn up to (retries + 1) times until it succeeds.
 * Optional delay ms between attempts (after a failure).
 *
 * Examples
 * - retry(() => fetch(url), { retries: 2 }) — up to 3 attempts
 * - retry(fn, { retries: 1, delay: 100 }) — wait 100ms before retry
 *
 * Hint: loop with try/catch, await sleep(delay) between attempts
 * Run: npm run algo:41
 */

export type RetryOptions = {
  retries: number;
  delay?: number;
};

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const run = async (retries: number) => {
    try { 
      return await fn();
    } catch(error) {
      if (retries > 0) {
        if (options.delay) {
          await new Promise((resolve)=> setTimeout(()=>{resolve(true)},options.delay))
        }
        return run(retries - 1);
      } else {
       throw error;
      }
    }
  }
  return run(options.retries);
}
