import express, { type Express } from "express";

/**
 * EXERCISE express 01 — Hello Express
 *
 * Add GET /health → { status: "ok" }
 * Run: npm run server:01
 */
export function createApp(): Express {
  const app = express();

  // TODO: GET /health → res.json({ status: "ok" })

  return app;
}
