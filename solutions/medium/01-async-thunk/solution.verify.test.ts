import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { loadProducts, productsExerciseReducer } from "./solution";

describe("solution medium/01", () => {
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

  it("loadProducts", async () => {
    const store = configureStore({ reducer: { p: productsExerciseReducer } });
    await store.dispatch(loadProducts());
    expect(store.getState().p.status).toBe("succeeded");
  });
});
