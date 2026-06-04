import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addItem,
  registerProducts,
  removeItem,
  setQuantity,
  syncCartToServer,
} from "@/store/slices/cartSlice";
import type { Product } from "@/lib/db";

const product: Product = {
  id: "p1",
  name: "Book",
  price: 10,
  category: "books",
};

function makeStore() {
  return configureStore({ reducer: { cart: cartReducer } });
}

describe("cartSlice", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("addItem merges quantities", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p1", quantity: 2 }));
    store.dispatch(addItem({ productId: "p1", quantity: 1 }));
    expect(store.getState().cart.items[0].quantity).toBe(3);
  });

  it("removeItem and setQuantity to zero", () => {
    const store = makeStore();
    store.dispatch(addItem({ productId: "p1" }));
    store.dispatch(setQuantity({ productId: "p1", quantity: 0 }));
    expect(store.getState().cart.items).toHaveLength(0);
    store.dispatch(addItem({ productId: "p2" }));
    store.dispatch(removeItem("p2"));
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("registerProducts fills productsById", () => {
    const store = makeStore();
    store.dispatch(registerProducts([product]));
    expect(store.getState().cart.productsById.p1.name).toBe("Book");
  });

  it("syncCartToServer fulfilled", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ items: [{ productId: "p1", quantity: 1 }] }),
        })
      )
    );
    const store = makeStore();
    store.dispatch(addItem({ productId: "p1" }));
    await store.dispatch(syncCartToServer(store.getState().cart.items));
    expect(store.getState().cart.items).toEqual([{ productId: "p1", quantity: 1 }]);
    expect(store.getState().cart.status).toBe("idle");
  });
});
