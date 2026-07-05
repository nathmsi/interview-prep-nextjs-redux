import { describe, it, expect, vi } from "vitest";
import { createShutdownHandler } from "./exercise";

describe("nodejs/08-production-patterns/01-graceful-shutdown", () => {
  it("runs cleanups", async () => {
    const order: number[] = [];
    const shutdown = createShutdownHandler([
      () => { order.push(1); },
      async () => { order.push(2); },
    ]);
    await shutdown();
    expect(order).toEqual([1, 2]);
  });
});