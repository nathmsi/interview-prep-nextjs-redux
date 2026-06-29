/**
 * EXERCISE algo/08 — Chunk
 *
 * Split an array into sub-arrays of length `size`.
 * The last chunk may be shorter.
 *
 * Examples
 * - chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]
 * - chunk([1, 2, 3], 1)       → [[1], [2], [3]]
 * - chunk([], 3)              → []
 *
 * Hint: loop with slice(i, i + size)
 * Run: npm run algo:35
 */

export function chunk<T>(items: T[], size: number): T[][] {
  

  const copiedItems = [...items];
  const result: Array<T>[] = [];

  let i = 0;
  let j = 0;
  while(copiedItems.length > 0) {
    if (i === size) {
      i = 0;
      j++;
    }
    const items = copiedItems.shift();
    if (items) {
      if (!result[j]) {
        result[j] = []
      }
      result[j].push(items);
    }
    i++;
  }

  return result;
}
