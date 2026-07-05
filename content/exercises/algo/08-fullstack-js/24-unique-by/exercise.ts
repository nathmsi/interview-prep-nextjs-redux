/**
 * EXERCISE algo/08 — Unique By
 *
 * Return items with unique keys from keyFn. First occurrence wins.
 *
 * Examples
 * - uniqueBy([{id:1},{id:2},{id:1}], x => x.id)
 *   → [{id:1},{id:2}]
 *
 * Run: npm run algo:50
 */

export function uniqueBy<T, K>(items: T[], keyFn: (item: T) => K): T[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keyAlreadyExist: Record<any,boolean> = {};
  return items.reduce((acc,el) => {
    const key = keyFn(el);
    if (keyAlreadyExist[key]) {
      return acc;
    }
    keyAlreadyExist[key] = true;
    acc.push(el);
    return acc;
  },[] as T[]);
}
