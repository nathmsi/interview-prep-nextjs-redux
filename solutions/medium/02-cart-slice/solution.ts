import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/lib/db";

export type CartExerciseState = { items: CartItem[] };

const initialState: CartExerciseState = { items: [] };

export const cartExerciseSlice = createSlice({
  name: "cartExercise",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ productId: string; quantity?: number }>
    ) => {
      const qty = action.payload.quantity ?? 1;
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) existing.quantity += qty;
      else state.items.push({ productId: action.payload.productId, quantity: qty });
    },
  },
});

export const { addItem } = cartExerciseSlice.actions;
export const cartExerciseReducer = cartExerciseSlice.reducer;

export function selectItemCount(state: { cartExercise: CartExerciseState }): number {
  return state.cartExercise.items.reduce((n, i) => n + i.quantity, 0);
}
