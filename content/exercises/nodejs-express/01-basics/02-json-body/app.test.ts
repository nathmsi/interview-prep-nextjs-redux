/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/01-basics/02-json-body", () => {
  const app = createApp();

  it("POST /echo returns body", async () => {
    const res = await request(app)
      .post("/echo")
      .send({ name: "Ada" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ received: { name: "Ada" } });
  });
});
