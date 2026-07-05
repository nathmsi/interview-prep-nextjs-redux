/**
 * EXERCISE nodejs — Compose Middleware
 *
 * Run middleware in order. Stop chain when next(err) is called.
 *
 * Hint: Index-based recursion.
 * Run: npm run node:05
 */

export type Req = Record<string, unknown>;
export type Res = {
  status: number;
  headers: Record<string, string>;
  body: string;
};
export type Next = (err?: unknown) => void;
export type Middleware = (req: Req, res: Res, next: Next) => void;
export function composeMiddleware(middlewares: Middleware[]): Middleware {
  return (req, res, next) => {
    let index = 0;

    function dispatch(err?: unknown): void {
      if (err) return;

      if (index >= middlewares.length) {
        next();
        return;
      }

      const middleware = middlewares[index++];
      middleware(req, res, dispatch);
    }

    dispatch();
  };
}
