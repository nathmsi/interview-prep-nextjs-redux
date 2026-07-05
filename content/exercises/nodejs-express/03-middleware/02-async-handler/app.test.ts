/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/03-middleware/02-async-handler", () => {
  it("handles async errors", async () => {
    const res = await request(createApp()).get("/fail");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "boom" });
  });
});
