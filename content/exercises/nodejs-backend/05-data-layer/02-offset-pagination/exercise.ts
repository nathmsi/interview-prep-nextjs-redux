/**
 * EXERCISE nodejs — Offset Pagination
 *
 * page is 1-based. totalPages = ceil(total/pageSize).
 *
 * Hint: slice (page-1)*pageSize
 * Run: npm run node:18
 */

export type PageResult<T> = { items: T[]; page: number; pageSize: number; total: number; totalPages: number };
export function paginateOffset<T>(items: T[], page: number, pageSize: number): PageResult<T> {
  // TODO: your code here
  return { items: [], page, pageSize, total: 0, totalPages: 0 };
}