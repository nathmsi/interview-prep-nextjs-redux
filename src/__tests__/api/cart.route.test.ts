/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST, DELETE } from "@/app/api/cart/route";
import { resetCartForTests } from "@/lib/db";

describe("/api/cart", () => {
  beforeEach(() => {
    resetCartForTests();
  });

  it("GET empty cart", async () => {
    const res = await GET();
    const body = await res.json();
    expect(body.items).toEqual([]);
  });

  it("POST puis GET", async () => {
    const post = await POST(
      new NextRequest("http://localhost/api/cart", {
        method: "POST",
        body: JSON.stringify({ items: [{ productId: "p1", quantity: 2 }] }),
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(post.status).toBe(200);
    const get = await GET();
    const body = await get.json();
    expect(body.items).toEqual([{ productId: "p1", quantity: 2 }]);
  });

  it("POST invalid JSON → 400", async () => {
    const res = await POST(
      new NextRequest("http://localhost/api/cart", {
        method: "POST",
        body: "not-json",
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(res.status).toBe(400);
  });

  it("POST invalid items → 400", async () => {
    const res = await POST(
      new NextRequest("http://localhost/api/cart", {
        method: "POST",
        body: JSON.stringify({ items: [{ productId: 1, quantity: -1 }] }),
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(res.status).toBe(400);
  });

  it("DELETE clears cart", async () => {
    await POST(
      new NextRequest("http://localhost/api/cart", {
        method: "POST",
        body: JSON.stringify({ items: [{ productId: "p1", quantity: 1 }] }),
        headers: { "Content-Type": "application/json" },
      })
    );
    const del = await DELETE();
    const body = await del.json();
    expect(body.items).toEqual([]);
  });
});
