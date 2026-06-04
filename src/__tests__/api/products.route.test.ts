/**
 * @vitest-environment node
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/products/route";
import { GET as GET_BY_ID } from "@/app/api/products/[id]/route";

describe("GET /api/products", () => {
  it("lists all products", async () => {
    const res = await GET(new NextRequest("http://localhost/api/products"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.length).toBeGreaterThanOrEqual(5);
  });

  it("filters books", async () => {
    const res = await GET(
      new NextRequest("http://localhost/api/products?category=books")
    );
    const data = await res.json();
    expect(data.every((p: { category: string }) => p.category === "books")).toBe(
      true
    );
  });

  it("400 invalid category", async () => {
    const res = await GET(
      new NextRequest("http://localhost/api/products?category=invalid")
    );
    expect(res.status).toBe(400);
  });
});

describe("GET /api/products/[id]", () => {
  it("returns one product", async () => {
    const res = await GET_BY_ID(new Request("http://localhost"), {
      params: Promise.resolve({ id: "p1" }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe("p1");
  });

  it("404 when missing", async () => {
    const res = await GET_BY_ID(new Request("http://localhost"), {
      params: Promise.resolve({ id: "nope" }),
    });
    expect(res.status).toBe(404);
  });
});
