import { describe, it, expect, beforeEach } from "vitest";
import {
  addToCart,
  clearCart,
  getCart,
  getProductById,
  getProducts,
  resetCartForTests,
  setCart,
} from "@/lib/db";

describe("db", () => {
  beforeEach(() => {
    resetCartForTests();
  });

  it("getProducts returns all products", () => {
    expect(getProducts()).toHaveLength(5);
  });

  it("filters by category", () => {
    const books = getProducts("books");
    expect(books.every((p) => p.category === "books")).toBe(true);
    expect(books).toHaveLength(2);
  });

  it("getProductById", () => {
    expect(getProductById("p1")?.name).toBe("TypeScript Handbook");
    expect(getProductById("missing")).toBeUndefined();
  });

  it("cart: add, set, clear", () => {
    addToCart("p1", 2);
    expect(getCart()).toEqual([{ productId: "p1", quantity: 2 }]);
    addToCart("p1", 1);
    expect(getCart()[0].quantity).toBe(3);
    setCart([{ productId: "p2", quantity: 1 }]);
    expect(getCart()).toHaveLength(1);
    clearCart();
    expect(getCart()).toEqual([]);
  });
});
