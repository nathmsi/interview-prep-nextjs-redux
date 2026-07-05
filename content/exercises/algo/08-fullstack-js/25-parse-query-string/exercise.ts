/**
 * EXERCISE algo/08 — Parse Query String
 *
 * parseQueryString — "a=1&b=2" → { a: "1", b: "2" }
 * stringifyQuery   — { a: "1", b: "2" } → "a=1&b=2"
 *
 * No URL-encoding/decoding required. Keys and values are plain strings.
 * Empty string input → {}. Empty object → "".
 *
 * Hint: split("&"), split("="), Object.fromEntries / join
 * Run: npm run algo:51
 */

export function parseQueryString(query: string): Record<string, string> {
  // TODO: your code here
  throw new Error("Not implemented");
}

export function stringifyQuery(params: Record<string, string>): string {
  // TODO: your code here
  throw new Error("Not implemented");
}
