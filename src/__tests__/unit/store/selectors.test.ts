import { describe, it, expect, vi, beforeEach } from "vitest";
import { makeStore } from "@/store";
import {
  selectCartItemCount,
  selectCartLineItems,
  selectCartTotal,
  selectFilteredProducts,
} from "@/store/selectors";
import { addItem, registerProducts } from "@/store/slices/cartSlice";
import { fetchProducts, setFilter } from "@/store/slices/productsSlice";
import type { Product } from "@/lib/db";

const product: Product = {
  id: "p1",
  name: "Book",
  price: 10,
  category: "books",
};

describe("selectors", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("selectCartLineItems, total et count", () => {
    const store = makeStore();
    store.dispatch(registerProducts([product]));
    store.dispatch(addItem({ productId: "p1", quantity: 2 }));
    const state = store.getState();
    expect(selectCartLineItems(state)[0].lineTotal).toBe(20);
    expect(selectCartTotal(state)).toBe(20);
    expect(selectCartItemCount(state)).toBe(2);
  });

  it("selectFilteredProducts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              product,
              { id: "p2", name: "Lamp", price: 5, category: "home" },
            ]),
        })
      )
    );
    const store = makeStore();
    await store.dispatch(fetchProducts());
    expect(selectFilteredProducts(store.getState())).toHaveLength(2);
    store.dispatch(setFilter("books"));
    expect(selectFilteredProducts(store.getState())).toHaveLength(1);
  });
});
