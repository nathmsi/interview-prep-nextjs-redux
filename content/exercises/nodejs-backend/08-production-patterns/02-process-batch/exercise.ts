/**
 * EXERCISE nodejs — Process Batch
 *
 * Process items in batches sequentially (batch fully done before next).
 *
 * Hint: Chunk array, Promise.all per batch
 * Run: npm run node:30
 */

export async function processBatch<T, R>(items: T[], batchSize: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  // TODO: your code here
  return [];
}