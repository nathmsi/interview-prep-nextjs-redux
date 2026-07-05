import express, { type Express, type Request, type Response, type NextFunction } from "express";

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * EXERCISE express 08 — Async Handler
 *
 * Implement asyncHandler — catches rejections and calls next(err)
 * GET /fail throws → error middleware returns 500
 * Run: npm run server:08
 */
export function asyncHandler(fn: AsyncRequestHandler) {
  // TODO: return middleware that catches async errors
  return (_req: Request, _res: Response, next: NextFunction) => next();
}

export function createApp(): Express {
  const app = express();

  app.get("/fail", asyncHandler(async () => {
    throw new Error("boom");
  }));

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: err.message });
  });

  return app;
}
