/**
 * EXERCISE nodejs — Match Route
 *
 * Match pattern like `/users/:id` against path. Return params or null.
 *
 * Hint: Split segments; compare static or capture :param.
 * Run: npm run node:02
 */

export type RouteMatch = { params: Record<string, string> };
export function matchRoute(pattern: string, path: string): RouteMatch | null {
  // TODO: your code here
  return null;
}