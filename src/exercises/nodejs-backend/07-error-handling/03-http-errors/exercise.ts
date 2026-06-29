/**
 * EXERCISE nodejs — HTTP Error Helpers
 *
 * Return errors with status property 400 and 404.
 *
 * Hint: Attach status on Error object
 * Run: npm run node:27
 */

export function badRequest(message: string): Error {
  // TODO: your code here
  return new Error(message);
}
export function notFound(message?: string): Error {
  // TODO: your code here
  return new Error(message);
}