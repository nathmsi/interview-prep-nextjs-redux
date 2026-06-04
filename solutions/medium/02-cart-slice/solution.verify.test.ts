import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { addItem, cartExerciseReducer, selectItemCount } from "./solution";

describe("solution medium/02", () => {
  it("cart slice", () => {
    const store = configureStore({ reducer: { cartExercise: cartExerciseReducer } });
    store.dispatch(addItem({ productId: "a", quantity: 3 }));
    expect(selectItemCount(store.getState())).toBe(3);
  });
});
