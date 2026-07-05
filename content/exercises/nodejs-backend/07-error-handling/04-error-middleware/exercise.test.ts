import { describe, it, expect, vi } from "vitest";
import { errorMiddleware } from "./exercise";

describe("nodejs/07-error-handling/04-error-middleware", () => {
  it("handles status errors", () => {
    const res = {
      statusCode: 0,
      body: undefined as unknown,
      status(code: number) { this.statusCode = code; return this; },
      json(b: unknown) { this.body = b; },
    };
    const err = Object.assign(new Error("missing"), { status: 404 });
    errorMiddleware(err, {}, res, () => {});
    expect(res.statusCode).toBe(404);
  });
});