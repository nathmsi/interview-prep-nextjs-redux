/**
 * EXERCISE nodejs — Async Handler
 *
 * Wrap async handler; call next(err) on rejection.
 *
 * Hint: fn(req,res).catch(next)
 * Run: npm run node:06
 */

export type Req = Record<string, unknown>;
export type Res = { json: (body: unknown) => void };
export type Next = (err?: unknown) => void;
export type AsyncHandler = (req: Req, res: Res) => Promise<void>;
export function asyncHandler(fn: AsyncHandler): (req: Req, res: Res, next: Next) => void {
  // TODO: your code here
  return (_req, _res, next) => next();
}