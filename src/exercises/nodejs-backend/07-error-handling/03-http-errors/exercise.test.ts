import { describe, it, expect } from "vitest";
import { badRequest, notFound } from "./exercise";

describe("nodejs/07-error-handling/03-http-errors", () => {
  it("bad request", () => {
    const e = badRequest("invalid") as Error & { status: number };
    expect(e.status).toBe(400);
  });
  it("not found", () => {
    const e = notFound() as Error & { status: number };
    expect(e.status).toBe(404);
  });
});