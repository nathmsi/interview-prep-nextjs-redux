import { describe, it, expect, vi } from "vitest";
import { composeMiddleware, type Req, type Res } from "./exercise";

describe("nodejs/02-middleware/01-compose-middleware", () => {
  it("runs in order", () => {
    const order: number[] = [];
    const m1 = (_r: Req, _s: Res, n: () => void) => { order.push(1); n(); };
    const m2 = (_r: Req, _s: Res, n: () => void) => { order.push(2); n(); };
    composeMiddleware([m1, m2])({}, { status: 200, headers: {}, body: "" }, () => order.push(3));
    expect(order).toEqual([1, 2, 3]);
  });
  it("stops on error", () => {
    const m2 = vi.fn();
    const m1 = (_r: Req, _s: Res, n: (e?: unknown) => void) => n(new Error("x"));
    composeMiddleware([m1, m2])({}, { status: 200, headers: {}, body: "" }, () => {});
    expect(m2).not.toHaveBeenCalled();
  });
});