import { describe, it, expect } from "vitest";
import { buildHealthReport } from "./exercise";

describe("nodejs/08-production-patterns/03-health-check", () => {
  it("aggregates checks", async () => {
    const r = await buildHealthReport([
      async () => ({ name: "db", status: "up" }),
      async () => ({ name: "cache", status: "up" }),
    ]);
    expect(r.status).toBe("up");
    expect(r.checks).toHaveLength(2);
  });
  it("marks down when one fails", async () => {
    const r = await buildHealthReport([
      async () => ({ name: "db", status: "up" }),
      async () => ({ name: "api", status: "down" }),
    ]);
    expect(r.status).toBe("down");
  });
});