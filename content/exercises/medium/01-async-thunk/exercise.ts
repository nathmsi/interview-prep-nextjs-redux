/**
 * EXERCISE medium/01 — createAsyncThunk
 * Lesson: content/lessons/medium/01-async-thunk.md
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/lib/db";

export type ProductsExerciseState = {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsExerciseState = {
  items: [],
  status: "idle",
  error: null,
};

export const loadProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("exercise/products/load", async (_arg, { rejectWithValue }) => {
  const res = await fetch('/api/products');
  if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
  return res.json();
});

export const productsExerciseReducer = createSlice({
  name: "productsExercise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => { state.status = "loading"; })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Error";
      });
  },
}).reducer;
