/**
 * EXERCISE nodejs — Request ID Middleware
 *
 * Reuse X-Request-Id or generate new id on req and res.
 *
 * Hint: headers['x-request-id'] || generator()
 * Run: npm run node:08
 */

export type Req = { headers: Record<string, string | undefined>; id?: string };
export type Res = { headers: Record<string, string> };
export type Next = () => void;
export function requestIdMiddleware(idGenerator: () => string): (req: Req, res: Res, next: Next) => void {
  // TODO: your code here
  return (_req, _res, next) => next();
}