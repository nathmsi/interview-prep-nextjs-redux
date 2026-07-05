/**
 * EXERCISE nodejs — Match Route
 *
 * Match pattern like `/users/:id` against path. Return params or null.
 *
 * Run: npm run node:02
 */

export type RouteMatch = { params: Record<string, string> };
export function matchRoute(pattern: string, path: string): RouteMatch | null {
  const patternPathName = pattern.split("/")[1];
  const [, key] = pattern.split(":");
  const value = path.split("/").at(-1);
  const targetPathName = path.split("/")[1];

  if (patternPathName !== targetPathName) {
    return null;
  }
  return {
    params: key
      ? {
          [key]: value || "",
        }
      : {},
  };
}
