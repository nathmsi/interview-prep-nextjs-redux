/**
 * EXERCISE medium/02 — cart slice
 * Lesson: lessons/medium/02-cart-slice.md
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/lib/db";

export type CartExerciseState = { items: CartItem[] };

const initialState: CartExerciseState = { items: [] };

export const cartExerciseSlice = createSlice({
  name: "cartExercise",
  initialState,
  reducers: {
    addItem: (
      _state,
      _action: PayloadAction<{ productId: string; quantity?: number }>
    ) => {
      const { productId, quantity } = _action.payload;
      _state.items.push({
        productId,
        quantity: quantity ?? 1
      });
    },
  },
});

export const { addItem } = cartExerciseSlice.actions;
export const cartExerciseReducer = cartExerciseSlice.reducer;

export function selectItemCount(state: { cartExercise: CartExerciseState }): number {
  return state.cartExercise.items.reduce((acc,item)=>acc+=item.quantity,0);
}
