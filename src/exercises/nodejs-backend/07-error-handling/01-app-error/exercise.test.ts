import { describe, it, expect } from "vitest";
import { AppError, isAppError } from "./exercise";

describe("nodejs/07-error-handling/01-app-error", () => {
  it("creates error", () => {
    const e = new AppError("bad", 400);
    expect(e.statusCode).toBe(400);
    expect(isAppError(e)).toBe(true);
  });
});