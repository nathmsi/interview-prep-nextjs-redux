import express, { type Express } from "express";

const ITEMS = [
  { id: "1", name: "TypeScript Handbook", category: "books" },
  { id: "2", name: "Notebook", category: "office" },
  { id: "3", name: "React Patterns", category: "books" },
];

/**
 * EXERCISE express 04 — Query String
 *
 * GET /items — all items
 * GET /items?category=books — filtered
 * Run: npm run server:04
 */
export function createApp(): Express {
  const app = express();

  // TODO: GET /items with optional ?category= filter (use ITEMS)

  return app;
}
