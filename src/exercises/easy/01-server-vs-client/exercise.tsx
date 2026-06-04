/**
 * EXERCISE easy/01 — Server vs Client
 * Lesson: lessons/easy/01-server-vs-client.md
 *
 * - ServerProductCount: async function component, returns count from products array prop
 * - ClientAddButton: "use client", calls onAdd on click
 */

import type { Product } from "@/lib/db";

export async function ServerProductCount({
  products,
}: {
  products: Product[];
}): Promise<React.ReactElement> {
  throw new Error("TODO: return <p>… with product count</p>");
}

export function ClientAddButton({
  label,
  onAdd,
}: {
  label: string;
  onAdd: () => void;
}): React.ReactElement {
  throw new Error("TODO: use client + button");
}
