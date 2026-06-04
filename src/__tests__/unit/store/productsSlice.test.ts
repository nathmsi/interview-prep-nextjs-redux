import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, {
  fetchProducts,
  setFilter,
} from "@/store/slices/productsSlice";

function makeStore() {
  return configureStore({ reducer: { products: productsReducer } });
}

describe("productsSlice", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetchProducts fulfilled", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { id: "p1", name: "X", price: 1, category: "books" },
            ]),
        })
      )
    );
    const store = makeStore();
    await store.dispatch(fetchProducts());
    expect(store.getState().products.status).toBe("succeeded");
    expect(store.getState().products.items).toHaveLength(1);
  });

  it("fetchProducts rejected", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false, status: 500 }))
    );
    const store = makeStore();
    await store.dispatch(fetchProducts());
    expect(store.getState().products.status).toBe("failed");
    expect(store.getState().products.error).toBeTruthy();
  });

  it("setFilter", () => {
    const store = makeStore();
    store.dispatch(setFilter("electronics"));
    expect(store.getState().products.filter).toBe("electronics");
  });
});
