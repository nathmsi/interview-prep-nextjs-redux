/**
 * EXERCISE nodejs — Error Middleware
 *
 * Map err.status or AppError to JSON response.
 *
 * Hint: Check status property
 * Run: npm run node:28
 */

export type Req = Record<string, unknown>;
export type Res = { status: (code: number) => Res; json: (body: unknown) => void; statusCode?: number; body?: unknown };
export type Next = (err?: unknown) => void;
export function errorMiddleware(err: unknown, _req: Req, res: Res, _next: Next): void {
  // TODO: your code here
  res.status(500).json({ error: "Internal error" });
}