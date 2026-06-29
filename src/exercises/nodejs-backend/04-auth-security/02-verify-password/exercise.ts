/**
 * EXERCISE nodejs — Verify Password
 *
 * Recompute simpleHash(salt + password) and compare.
 *
 * Hint: Use same simpleHash as hash exercise
 * Run: npm run node:14
 */

export type PasswordHash = { salt: string; hash: string };
export function simpleHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i);
  return (h >>> 0).toString(16);
}
export function verifyPassword(password: string, stored: PasswordHash): boolean {
  // TODO: your code here
  return false;
}