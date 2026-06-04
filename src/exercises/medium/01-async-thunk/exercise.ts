/**
 * EXERCISE medium/01 — createAsyncThunk
 * Lesson: lessons/medium/01-async-thunk.md
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
  throw new Error("TODO: fetch /api/products");
});

export const productsExerciseReducer = createSlice({
  name: "productsExercise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    throw new Error("TODO: pending / fulfilled / rejected");
  },
}).reducer;
