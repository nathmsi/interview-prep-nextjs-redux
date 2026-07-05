/**
 * EXERCISE hard/02 — optimistic add
 * Lesson: content/lessons/hard/02-optimistic-cart.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CartItem } from "@/lib/db";
import { addItem, replaceItems, type CartState } from "@/store/slices/cartSlice";

export const optimisticAddToCart = createAsyncThunk<
  CartItem[],
  { productId: string },
  { state: { cart: CartState } }
>("cart/optimisticAdd", async ({ productId }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { cart } = getState();
      if (cart.productsById[productId]) {
        dispatch(replaceItems([]))
      } else {
        dispatch(addItem({
          productId,
        }));
      }
    } catch (error) {
      rejectWithValue(error);
    }
});
