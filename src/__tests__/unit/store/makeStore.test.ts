import { describe, it, expect } from "vitest";
import { makeStore } from "@/store";

describe("makeStore", () => {
  it("configures all reducers", () => {
    const store = makeStore();
    const state = store.getState();
    expect(state.counter).toBeDefined();
    expect(state.products).toBeDefined();
    expect(state.cart).toBeDefined();
    expect(state.productsApi).toBeDefined();
  });
});
