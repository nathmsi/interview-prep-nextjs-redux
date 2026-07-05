/**
 * EXERCISE nodejs — Graceful Shutdown
 *
 * Return async fn that runs all cleanups in order.
 *
 * Hint: for...of await cleanup()
 * Run: npm run node:29
 */

export type CleanupFn = () => void | Promise<void>;
export function createShutdownHandler(cleanups: CleanupFn[]): () => Promise<void> {
  // TODO: your code here
  return async () => {};
}