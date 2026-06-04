import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { loadProducts, productsExerciseReducer } from "./exercise";

describe("medium/01-async-thunk", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { id: "p1", name: "X", price: 10, category: "books" },
            ]),
        })
      )
    );
  });

  it("loadProducts remplit items", async () => {
    const store = configureStore({ reducer: { p: productsExerciseReducer } });
    await store.dispatch(loadProducts());
    const state = store.getState().p;
    expect(state.status).toBe("succeeded");
    expect(state.items).toHaveLength(1);
  });
});
