/**
 * EXERCISE nodejs — CORS Middleware
 *
 * Set Access-Control-Allow-Origin when origin is whitelisted.
 *
 * Hint: Check req.headers.origin
 * Run: npm run node:07
 */

export type Req = { headers: Record<string, string | undefined> };
export type Res = { headers: Record<string, string> };
export type Next = () => void;
export type Middleware = (req: Req, res: Res, next: Next) => void;
export function createCorsMiddleware(allowedOrigins: string[]): Middleware {
  // TODO: your code here
  return (_req, _res, next) => next();
}