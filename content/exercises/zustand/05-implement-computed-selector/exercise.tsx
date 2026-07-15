/**
 * EXERCISE zustand/05 — Derived state with a selector
 *
 * The store holds cart `items` (`{ id, price, quantity }[]`). Implement
 * `useCartTotal()`, a hook that returns the total price
 * (sum of `price * quantity`), computed on the fly from the store —
 * it should NOT be stored as separate state.
 *
 * Hint: `useCartStore((state) => state.items.reduce(...))`.
 *
 * Run: npm run zustand:05
 */

"use client";

import { create } from "zustand";

type CartItem = { id: string; price: number; quantity: number };

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

export function useCartTotal(): number {
  // TODO: your code here
  return 0;
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

let nextItemId = 1;

export function CartSummary() {
  const total = useCartTotal();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div>
      <span data-testid="total">{total}</span>
      <button
        type="button"
        data-testid="add"
        onClick={() =>
          addItem({ id: String(nextItemId++), price: 10, quantity: 2 })
        }
      >
        Add item ($10 x2)
      </button>
    </div>
  );
}
