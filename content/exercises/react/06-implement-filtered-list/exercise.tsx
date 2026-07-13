/**
 * EXERCISE react/06 — Filtered Product List
 *
 * Implement ProductSearch: controlled search input filters products by name
 * (case-insensitive substring). Empty query shows all products.
 * Run: npm run react:06
 */

"use client";

import { useState } from "react";

export type Product = { id: string; name: string };

export function ProductSearch({
  products,
}: {
  products: Product[];
}): React.ReactElement {
  const [term, setTerm] = useState("");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  // TODO: your code here — filter `products` by `term` (case-insensitive)
  const visible = products;

  return (
    <div>
      <input
        data-testid="search"
        type="search"
        value={term}
        onChange={onSearchChange}
      />
      <ul data-testid="list">
        {visible.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
