/**
 * EXERCISE nodejs — Build HTTP Response
 *
 * Default Content-Type application/json for object bodies. String bodies pass through.
 *
 * Hint: JSON.stringify non-strings; merge headers.
 * Run: npm run node:03
 */

export type HttpResponse = { status: number; headers: Record<string, string>; body: string };
export function buildResponse(status: number, body: unknown, headers?: Record<string, string>): HttpResponse {
  // TODO: your code here
  return { status, headers: headers ?? {}, body: "" };
}