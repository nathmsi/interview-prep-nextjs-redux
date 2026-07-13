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
  // TODO: your code here
  void products;
  return <div data-testid="product-count"></div>;
}

"use client"
export function ClientAddButton({
  label,
  onAdd,
}: {
  label: string;
  onAdd: () => void;
}): React.ReactElement {
  // TODO: your code here
  void onAdd;
  return <button data-testid="add-btn">{label}</button>;
}
