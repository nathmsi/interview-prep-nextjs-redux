import { describe, it, expect } from "vitest";
import { selectCartLineItems, selectCartTotal } from "./exercise";
import type { CartWithCatalogState } from "./exercise";

const state: CartWithCatalogState = {
  cart: { items: [{ productId: "p1", quantity: 2 }] },
  catalog: {
    byId: {
      p1: { id: "p1", name: "Book", price: 10, category: "books" },
    },
  },
};

describe("medium/04-selectors-memo", () => {
  it("calcule lignes et total", () => {
    const lines = selectCartLineItems(state);
    expect(lines[0].lineTotal).toBe(20);
    expect(selectCartTotal(state)).toBe(20);
  });
});
