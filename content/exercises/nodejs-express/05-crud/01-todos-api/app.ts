import express, { type Express } from "express";

export type Todo = { id: string; title: string; done: boolean };

/**
 * EXERCISE express 11 — Todos CRUD
 *
 * In-memory store (module-level array + nextId counter):
 * - GET    /api/todos       → all todos
 * - POST   /api/todos       → { title } → 201 created todo
 * - GET    /api/todos/:id   → one or 404
 * - DELETE /api/todos/:id   → 204 or 404
 * Run: npm run server:11
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());

  // TODO: implement CRUD routes

  return app;
}
