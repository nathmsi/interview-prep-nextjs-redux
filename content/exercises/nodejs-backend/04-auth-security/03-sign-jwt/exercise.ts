/**
 * EXERCISE nodejs — Sign JWT
 *
 * Return header.payload.signature (base64url). Signature = simpleHmac(header.payload, secret) — use provided hmac fn.
 *
 * Hint: base64url(JSON), join with dots
 * Run: npm run node:15
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
  // TODO: your code here
  return "";
}