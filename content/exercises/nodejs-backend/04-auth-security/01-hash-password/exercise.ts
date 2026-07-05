/**
 * EXERCISE nodejs — Hash Password
 *
 * hash = simpleHash(salt + password). simpleHash is provided.
 *
 * Hint: Use simpleHash helper
 * Run: npm run node:13
 */

export type PasswordHash = { salt: string; hash: string };
export function simpleHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i);
  return (h >>> 0).toString(16);
}
export function hashPassword(password: string, randomBytes: (n: number) => string): PasswordHash {
  // TODO: your code here
  return { salt: "", hash: "" };
}