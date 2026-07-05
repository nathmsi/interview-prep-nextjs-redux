import express, { type Express } from "express";

/**
 * EXERCISE express 06 — 404 Handler
 *
 * GET /exists → { ok: true }
 * anything else → 404 { error: "Not found" }
 * Run: npm run server:06
 */
export function createApp(): Express {
  const app = express();

  app.get("/exists", (_req, res) => {
    res.json({ ok: true });
  });

  // TODO: 404 middleware (must be last)

  return app;
}
