import express, { type Express } from "express";

/**
 * EXERCISE express 02 — JSON Body
 *
 * - Use express.json()
 * - POST /echo → { received: req.body }
 * Run: npm run server:02
 */
export function createApp(): Express {
  const app = express();

  // TODO: app.use(express.json())
  // TODO: POST /echo

  return app;
}
