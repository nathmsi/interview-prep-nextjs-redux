import { describe, it, expect } from "vitest";
import { validateFields } from "./exercise";

describe("nodejs/03-validation/02-validate-fields", () => {
  it("valid data", () => {
    expect(validateFields({ email: "a@b.com" }, { email: "string" })).toEqual({ valid: true });
  });
  it("missing field", () => {
    const r = validateFields({}, { email: "string" });
    expect(r.valid).toBe(false);
  });
});