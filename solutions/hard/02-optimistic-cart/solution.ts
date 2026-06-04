import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CartItem } from "@/lib/db";
import {
  addItem,
  replaceItems,
  syncCartToServer,
  type CartState,
} from "@/store/slices/cartSlice";

export const optimisticAddToCart = createAsyncThunk<
  CartItem[],
  { productId: string },
  { state: { cart: CartState } }
>("cart/optimisticAdd", async ({ productId }, { dispatch, getState, rejectWithValue }) => {
  const previous = getState().cart.items.map((i) => ({ ...i }));
  dispatch(addItem({ productId }));
  try {
    const result = await dispatch(syncCartToServer(getState().cart.items)).unwrap();
    return result;
  } catch {
    dispatch(replaceItems(previous));
    return rejectWithValue("sync failed");
  }
});
