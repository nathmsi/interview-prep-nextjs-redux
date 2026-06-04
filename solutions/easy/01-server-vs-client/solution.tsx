"use client";

import type { Product } from "@/lib/db";

/** Server Component — pas de "use client" sur ce fichier si importé depuis une page serveur uniquement pour cette fonction async. */
export async function ServerProductCount({
  products,
}: {
  products: Product[];
}) {
  return (
    <p data-testid="product-count">
      {products.length} produit{products.length !== 1 ? "s" : ""}
    </p>
  );
}

export function ClientAddButton({
  label,
  onAdd,
}: {
  label: string;
  onAdd: () => void;
}) {
  return (
    <button type="button" data-testid="add-btn" onClick={onAdd}>
      {label}
    </button>
  );
}
