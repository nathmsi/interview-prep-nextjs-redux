/**
 * EXERCISE nodejs — Parse URL
 *
 * Given `/users?page=2&limit=10`, return `{ pathname, query }`. Decode URI components. First value wins for duplicate keys.
 *
 * Hint: Split on `?`, parse query with `&` and `=`.
 * Run: npm run node:01
 */

export type ParsedUrl = { pathname: string; query: Record<string, string> };
export function parseUrl(path: string): ParsedUrl {
  const [pathname, queryPath] = path.replaceAll('%20',' ').split("?");
  const query = queryPath?.split("&").reduce((acc, el) => {
    const [key, value] = el.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>) || {};
  return { pathname, query };
}
