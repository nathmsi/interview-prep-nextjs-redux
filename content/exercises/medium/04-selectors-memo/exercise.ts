/**
 * EXERCISE medium/04 — createSelector
 * Lesson: content/lessons/medium/04-selectors-memo.md
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
    return _items.reduce<LineItem[]>((acc,item)=>{
      const itemsById = _byId[item.productId];
      acc.push({
        productId: itemsById.id,
        name: itemsById.name,
        unitPrice: itemsById.price,
        lineTotal: item.quantity * itemsById.price,
        quantity: item.quantity
      })
      return acc;
    },[]);
  }
);

export const selectCartTotal = createSelector([selectCartLineItems], (_lines) => {
  return _lines.reduce((acc,line) => acc += line.lineTotal ,0);
});
