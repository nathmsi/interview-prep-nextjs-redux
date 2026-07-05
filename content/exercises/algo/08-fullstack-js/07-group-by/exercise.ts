/**
 * EXERCISE algo/08 — Group By
 *
 * Group array items into a Record keyed by the result of keyFn(item).
 *
 * Examples
 * - groupBy([{type:"a"},{type:"b"},{type:"a"}], x => x.type)
 *   → { a: [{type:"a"},{type:"a"}], b: [{type:"b"}] }
 *
 * Hint: reduce into Record, push into bucket array
 * Run: npm run algo:33
 */

export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return items.reduce<Record<K, T[]>>((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {});
}
