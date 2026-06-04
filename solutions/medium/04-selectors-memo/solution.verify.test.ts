import { describe, it, expect } from "vitest";
import { selectCartLineItems, selectCartTotal } from "./solution";
import type { CartWithCatalogState } from "./solution";

const state: CartWithCatalogState = {
  cart: { items: [{ productId: "p1", quantity: 2 }] },
  catalog: {
    byId: { p1: { id: "p1", name: "B", price: 15, category: "books" } },
  },
};

describe("solution medium/04", () => {
  it("selectors", () => {
    expect(selectCartTotal(state)).toBe(30);
    expect(selectCartLineItems(state)[0].name).toBe("B");
  });
});
