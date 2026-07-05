/**
 * EXERCISE nodejs — Parse JSON Body
 *
 * Throw BodyTooLargeError or InvalidJsonError when appropriate.
 *
 * Hint: Length check then JSON.parse
 * Run: npm run node:09
 */

export class BodyTooLargeError extends Error { constructor() { super("Body too large"); this.name = "BodyTooLargeError"; } }
export class InvalidJsonError extends Error { constructor() { super("Invalid JSON"); this.name = "InvalidJsonError"; } }
export function parseJsonBody(raw: string, maxBytes: number): unknown {
  // TODO: your code here
  return {};
}