import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { addItem, cartExerciseReducer, selectItemCount } from "./exercise";

describe("medium/02-cart-slice", () => {
  it("addItem et selectItemCount", () => {
    const store = configureStore({ reducer: { cartExercise: cartExerciseReducer } });
    store.dispatch(addItem({ productId: "a", quantity: 2 }));
    store.dispatch(addItem({ productId: "a", quantity: 1 }));
    store.dispatch(addItem({ productId: "b" }));
    expect(selectItemCount(store.getState())).toBe(4);
  });
});
