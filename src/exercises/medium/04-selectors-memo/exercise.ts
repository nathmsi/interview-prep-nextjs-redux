/**
 * EXERCISE medium/04 — createSelector
 * Lesson: lessons/medium/04-selectors-memo.md
 */

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
  (_items, _byId): LineItem[] => {
    throw new Error("TODO");
  }
);

export const selectCartTotal = createSelector([selectCartLineItems], (_lines) => {
  throw new Error("TODO");
});
