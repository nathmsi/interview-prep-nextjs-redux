import express, { type Express } from "express";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

/**
 * EXERCISE express 10 — Zod Validation
 *
 * POST /users — validate body with createUserSchema
 * 400 on invalid, 201 + { id: "1", email, name } on success
 * Run: npm run server:10
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());

  // TODO: POST /users with Zod validation

  return app;
}
