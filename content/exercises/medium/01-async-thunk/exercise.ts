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
  // TODO: your code here
  void rejectWithValue;
  return [];
});

export const productsExerciseReducer = createSlice({
  name: "productsExercise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // TODO: your code here — handle loadProducts.pending/fulfilled/rejected
    void builder;
  },
}).reducer;
