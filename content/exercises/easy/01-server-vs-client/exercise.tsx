/**
 * EXERCISE easy/01 — Server vs Client
 * Lesson: content/lessons/easy/01-server-vs-client.md
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
  return <div data-testid="product-count">
    {products.length} products
  </div>
}

"use client"
export function ClientAddButton({
  label,
  onAdd,
}: {
  label: string;
  onAdd: () => void;
}): React.ReactElement {
  return <button data-testid="add-btn" onClick={onAdd}>{label}</button>
}
