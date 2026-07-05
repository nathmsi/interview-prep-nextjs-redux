import express, { type Express, type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "exercise-dev-secret";

type User = { email: string; passwordHash: string };
const users: User[] = [];

declare global {
  namespace Express {
    interface Request {
      user?: { email: string };
    }
  }
}

/**
 * EXERCISE express 12 — JWT Auth
 *
 * POST /auth/register { email, password } → 201
 * POST /auth/login    { email, password } → { token }
 * GET  /me            (Bearer token)      → { email }
 * Run: npm run server:12
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // TODO: read Bearer token, jwt.verify, set req.user, or 401
  res.status(401).json({ error: "Unauthorized" });
}

export function createApp(): Express {
  const app = express();
  app.use(express.json());
  users.length = 0;

  // TODO: POST /auth/register
  // TODO: POST /auth/login → { token }
  // TODO: GET /me with requireAuth

  return app;
}
