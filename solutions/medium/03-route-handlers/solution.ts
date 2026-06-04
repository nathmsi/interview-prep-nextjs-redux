import type { CartItem } from "@/lib/db";

export type CartBodyResult =
  | { ok: true; items: CartItem[] }
  | { ok: false; error: string };

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.productId === "string" &&
    typeof o.quantity === "number" &&
    o.quantity >= 0 &&
    Number.isInteger(o.quantity)
  );
}

export function validateCartBody(body: unknown): CartBodyResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Body must be an object" };
  }
  if (!("items" in body) || !Array.isArray((body as { items: unknown }).items)) {
    return { ok: false, error: "Missing items array" };
  }
  const raw = (body as { items: unknown[] }).items;
  if (!raw.every(isCartItem)) {
    return { ok: false, error: "Invalid cart item shape" };
  }
  return { ok: true, items: raw };
}
