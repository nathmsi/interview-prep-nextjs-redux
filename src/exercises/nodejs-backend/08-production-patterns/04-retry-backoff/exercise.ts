/**
 * EXERCISE nodejs — Retry With Backoff
 *
 * Delay baseDelayMs * 2^attempt between retries.
 *
 * Hint: Loop with exponential delay
 * Run: npm run node:32
 */

export type BackoffOptions = { retries: number; baseDelayMs: number };
export async function retryWithBackoff<T>(fn: () => Promise<T>, options: BackoffOptions): Promise<T> {
  // TODO: your code here
  throw new Error("TODO");
}