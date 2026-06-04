import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const selectCartItems = (state: RootState) => state.cart.items;
const selectProductsById = (state: RootState) => state.cart.productsById;

export const selectCartLineItems = createSelector(
  [selectCartItems, selectProductsById],
  (items, byId) =>
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
      .filter((row): row is NonNullable<typeof row> => row !== null)
);

export const selectCartTotal = createSelector(selectCartLineItems, (lines) =>
  lines.reduce((sum, line) => sum + line.lineTotal, 0)
);

export const selectCartItemCount = createSelector(selectCartItems, (items) =>
  items.reduce((n, i) => n + i.quantity, 0)
);

export const selectFilteredProducts = createSelector(
  [(state: RootState) => state.products.items, (state: RootState) => state.products.filter],
  (items, filter) =>
    filter === "all" ? items : items.filter((p) => p.category === filter)
);
