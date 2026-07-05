import express, { type Express, type Request, type Response, type NextFunction } from "express";

/** Shared log buffer — tests read this */
export const requestLogs: string[] = [];

/**
 * EXERCISE express 07 — Request Logger
 *
 * Export requestLogger middleware: push "${method} ${path}" to requestLogs
 * Mount it before routes. GET /test → { ok: true }
 * Run: npm run server:07
 */
export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  // TODO: push to requestLogs, call next()
}

export function createApp(): Express {
  const app = express();
  requestLogs.length = 0;

  // TODO: app.use(requestLogger)
  // TODO: GET /test → { ok: true }

  return app;
}
