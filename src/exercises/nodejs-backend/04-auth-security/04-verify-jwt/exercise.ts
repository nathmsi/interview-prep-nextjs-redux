/**
 * EXERCISE nodejs — Verify JWT
 *
 * Verify signature and return parsed payload. Throw on invalid token.
 *
 * Hint: Split token, recompute signature
 * Run: npm run node:16
 */

export type JwtPayload = Record<string, string | number>;

export function base64url(data: string): string {
  const binary = Array.from(new TextEncoder().encode(data), (b) =>
    String.fromCharCode(b)
  ).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function simpleHmac(data: string, secret: string): string {
  return base64url(data + secret);
}

export function signJwt(payload: JwtPayload, secret: string): string {
  // TODO: implement (same as exercise 03) or import after solving 03
  return "";
}

export function verifyJwt(token: string, secret: string): JwtPayload {
  // TODO: your code here
  throw new Error("not implemented");
}