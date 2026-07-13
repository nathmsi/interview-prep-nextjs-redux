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
  // TODO: your code here — use addItem/replaceItems + dispatch/getState
  void productId;
  void dispatch;
  void getState;
  void rejectWithValue;
  void addItem;
  void replaceItems;
  return [];
});
