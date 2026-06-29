/**
 * EXERCISE algo/08 — Concurrency Limit
 *
 * Run async fn on each item, but at most `limit` promises in flight.
 * Return results in the same order as items.
 *
 * Examples
 * - mapWithLimit([1, 2, 3], 2, async (x) => x * 2) → [2, 4, 6]
 *
 * Hint: queue + worker pool, or sliding window with index tracking
 * Run: npm run algo:43
 */

export async function mapWithLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  // TODO: your code here
  throw new Error("Not implemented");
}
