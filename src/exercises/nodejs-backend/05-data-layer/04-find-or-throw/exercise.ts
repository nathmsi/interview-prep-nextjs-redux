/**
 * EXERCISE nodejs — Find Or Throw
 *
 * Return first match or throw NotFoundError.
 *
 * Hint: Array.find
 * Run: npm run node:20
 */

export class NotFoundError extends Error {
  constructor(message: string) { super(message); this.name = "NotFoundError"; }
}
export function findOrThrow<T>(items: T[], predicate: (item: T) => boolean, message?: string): T {
  // TODO: your code here
  throw new NotFoundError("not found");
}