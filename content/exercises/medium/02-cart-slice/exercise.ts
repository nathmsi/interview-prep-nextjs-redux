/**
 * EXERCISE medium/02 — cart slice
 * Lesson: content/lessons/medium/02-cart-slice.md
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
      // TODO: your code here
    },
  },
});

export const { addItem } = cartExerciseSlice.actions;
export const cartExerciseReducer = cartExerciseSlice.reducer;

export function selectItemCount(state: { cartExercise: CartExerciseState }): number {
  // TODO: your code here
  void state;
  return 0;
}
