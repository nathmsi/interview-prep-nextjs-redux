import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "@/lib/db";

export type ProductsState = {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filter: Product["category"] | "all";
};

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  filter: "all",
};

export const fetchProducts = createAsyncThunk<
  Product[],
  Product["category"] | undefined,
  { rejectValue: string }
>("products/fetchAll", async (category, { rejectWithValue }) => {
  const qs = category ? `?category=${category}` : "";
  const res = await fetch(`/api/products${qs}`);
  if (!res.ok) {
    return rejectWithValue(`HTTP ${res.status}`);
  }
  return (await res.json()) as Product[];
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<ProductsState["filter"]>) => {
      state.filter = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { setFilter, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
