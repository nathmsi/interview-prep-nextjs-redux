import { createSelector } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/lib/db";

export type CartWithCatalogState = {
  cart: { items: CartItem[] };
  catalog: { byId: Record<string, Product> };
};

const selectItems = (s: CartWithCatalogState) => s.cart.items;
const selectById = (s: CartWithCatalogState) => s.catalog.byId;

export type LineItem = CartItem & {
  name: string;
  unitPrice: number;
  lineTotal: number;
};

export const selectCartLineItems = createSelector(
  [selectItems, selectById],
  (items, byId): LineItem[] =>
    items
      .map((item) => {
        const product = byId[item.productId];
        if (!product) return null;
        return {
          ...item,
          name: product.name,
          unitPrice: product.price,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((row): row is LineItem => row !== null)
);

export const selectCartTotal = createSelector([selectCartLineItems], (lines) =>
  lines.reduce((sum, line) => sum + line.lineTotal, 0)
);
