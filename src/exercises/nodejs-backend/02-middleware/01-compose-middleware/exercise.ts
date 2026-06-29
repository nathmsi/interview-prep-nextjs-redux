/**
 * EXERCISE nodejs — Compose Middleware
 *
 * Run middleware in order. Stop chain when next(err) is called.
 *
 * Hint: Index-based recursion.
 * Run: npm run node:05
 */

export type Req = Record<string, unknown>;
export type Res = { status: number; headers: Record<string, string>; body: string };
export type Next = (err?: unknown) => void;
export type Middleware = (req: Req, res: Res, next: Next) => void;
export function composeMiddleware(middlewares: Middleware[]): Middleware {
  // TODO: your code here
  return (_req, _res, next) => next();
}