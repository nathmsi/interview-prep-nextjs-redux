import express, { type Express, type Request, type Response, type NextFunction } from "express";

export class AppError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

/**
 * EXERCISE express 09 — Error Middleware
 *
 * Implement errorHandler (4 args): AppError → its status, else 500
 * GET /missing throws AppError("Item not found", 404)
 * Run: npm run server:09
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // TODO: map error to status + { error: message }
  res.status(500).json({ error: "Internal error" });
}

export function createApp(): Express {
  const app = express();

  app.get("/missing", () => {
    throw new AppError("Item not found", 404);
  });

  // TODO: app.use(errorHandler)

  return app;
}
