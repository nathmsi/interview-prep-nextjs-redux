import { describe, it, expect } from "vitest";
import { exerciseProductsApi } from "./exercise";

describe("hard/01-rtk-query", () => {
  it("getProducts endpoint is defined", () => {
    const def = exerciseProductsApi.endpoints.getProducts;
    expect(def).toBeDefined();
    expect(def.name).toBe("getProducts");
  });
});
