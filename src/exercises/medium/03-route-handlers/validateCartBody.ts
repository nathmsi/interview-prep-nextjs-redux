/**
 * EXERCISE medium/03 — validation body POST /api/cart
 * Lesson: lessons/medium/03-route-handlers.md
 */

import type { CartItem } from "@/lib/db";

export type CartBodyResult =
  | { ok: true; items: CartItem[] }
  | { ok: false; error: string };

export function validateCartBody(body: unknown): CartBodyResult {
  throw new Error("TODO");
}
