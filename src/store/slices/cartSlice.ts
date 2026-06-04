import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/lib/db";

export type CartState = {
  items: CartItem[];
  productsById: Record<string, Product>;
  status: "idle" | "syncing" | "failed";
  error: string | null;
};

const initialState: CartState = {
  items: [],
  productsById: {},
  status: "idle",
  error: null,
};

export const syncCartToServer = createAsyncThunk<
  CartItem[],
  CartItem[],
  { rejectValue: string }
>("cart/sync", async (items, { rejectWithValue }) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) {
    return rejectWithValue(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as { items: CartItem[] };
  return data.items;
});

export const loadCartFromServer = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>("cart/load", async (_, { rejectWithValue }) => {
  const res = await fetch("/api/cart");
  if (!res.ok) {
    return rejectWithValue(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as { items: CartItem[] };
  return data.items;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ productId: string; quantity?: number }>) => {
      const qty = action.payload.quantity ?? 1;
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += qty;
      } else {
        state.items.push({ productId: action.payload.productId, quantity: qty });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    setQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload.productId);
        }
      }
    },
    registerProducts: (state, action: PayloadAction<Product[]>) => {
      for (const p of action.payload) {
        state.productsById[p.id] = p;
      }
    },
    /** Rollback optimistic state */
    replaceItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload.map((i) => ({ ...i }));
    },
    clearCartLocal: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartToServer.pending, (state) => {
        state.status = "syncing";
        state.error = null;
      })
      .addCase(syncCartToServer.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(syncCartToServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Sync failed";
      })
      .addCase(loadCartFromServer.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const {
  addItem,
  removeItem,
  setQuantity,
  registerProducts,
  replaceItems,
  clearCartLocal,
} = cartSlice.actions;
export default cartSlice.reducer;
