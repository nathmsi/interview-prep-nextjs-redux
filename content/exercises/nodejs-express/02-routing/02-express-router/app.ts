import express, { type Express } from "express";
import { usersRouter } from "./routes/users";

/**
 * EXERCISE express 05 — Express Router
 *
 * Mount usersRouter at /api/users
 * Run: npm run server:05
 */
export function createApp(): Express {
  const app = express();

  // TODO: app.use("/api/users", usersRouter)

  return app;
}
