import { describe, it, expect } from "vitest";
import { exerciseProductsApi } from "./exercise";

describe("hard/01-rtk-query", () => {
  it("endpoint getProducts est défini", () => {
    const def = exerciseProductsApi.endpoints.getProducts;
    expect(def).toBeDefined();
    expect(def.name).toBe("getProducts");
  });
});
