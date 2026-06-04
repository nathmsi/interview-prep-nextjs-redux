import { describe, it, expect } from "vitest";
import { exerciseProductsApi } from "./solution";

describe("solution hard/01", () => {
  it("api endpoint", () => {
    expect(exerciseProductsApi.endpoints.getProducts).toBeDefined();
  });
});
