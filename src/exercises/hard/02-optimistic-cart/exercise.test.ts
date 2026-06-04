import { describe, it, expect } from "vitest";
import { optimisticAddToCart } from "./exercise";

describe("hard/02-optimistic-cart", () => {
  it("thunk exporté", () => {
    expect(optimisticAddToCart.typePrefix).toBe("cart/optimisticAdd");
  });
});
