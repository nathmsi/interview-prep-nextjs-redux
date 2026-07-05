import { describe, it, expect, vi } from "vitest";
import { asyncHandler } from "./exercise";

describe("nodejs/02-middleware/02-async-handler", () => {
  it("forwards rejection", async () => {
    const err = new Error("fail");
    const next = vi.fn();
    asyncHandler(vi.fn().mockRejectedValue(err))({}, { json: vi.fn() }, next);
    await Promise.resolve();
    expect(next).toHaveBeenCalledWith(err);
  });
});