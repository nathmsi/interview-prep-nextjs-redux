/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/02-routing/01-query-string", () => {
  const app = createApp();

  it("lists all items", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it("filters by category", async () => {
    const res = await request(app).get("/items?category=books");
    expect(res.body).toHaveLength(2);
    expect(res.body.every((i: { category: string }) => i.category === "books")).toBe(true);
  });
});
