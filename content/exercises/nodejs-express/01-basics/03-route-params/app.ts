import express, { type Express } from "express";

/**
 * EXERCISE express 03 — Route Params
 *
 * GET /users/:id → { id, name: "User " + id }
 * Run: npm run server:03
 */
export function createApp(): Express {
  const app = express();

  // TODO: GET /users/:id

  return app;
}
