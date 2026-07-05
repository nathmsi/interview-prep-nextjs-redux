/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/02-routing/03-not-found", () => {
  const app = createApp();

  it("known route works", async () => {
    const res = await request(app).get("/exists");
    expect(res.status).toBe(200);
  });

  it("unknown route returns 404", async () => {
    const res = await request(app).get("/nope");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });
});
