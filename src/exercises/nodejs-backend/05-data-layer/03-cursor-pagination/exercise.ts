/**
 * EXERCISE nodejs — Cursor Pagination
 *
 * Base64url JSON encode/decode. Throw on invalid cursor.
 *
 * Hint: Buffer.from JSON
 * Run: npm run node:19
 */

export type CursorPayload = { offset: number };
export function encodeCursor(payload: CursorPayload): string {
  // TODO: your code here
  return "";
}
export function decodeCursor(cursor: string): CursorPayload {
  // TODO: your code here
  return { offset: 0 };
}