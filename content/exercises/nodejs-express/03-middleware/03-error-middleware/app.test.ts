/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/03-middleware/03-error-middleware", () => {
  it("returns 404 for AppError", async () => {
    const res = await request(createApp()).get("/missing");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});
