import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { withTimeout } from "./exercise";

describe("algo/08-fullstack-js/16-with-timeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves when promise settles before timeout", async () => {
    const promise = withTimeout(Promise.resolve("ok"), 1000);
    await expect(promise).resolves.toBe("ok");
  });

  it("rejects with Timeout when promise is too slow", async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve("late"), 200));
    const promise = withTimeout(slow, 100);

    vi.advanceTimersByTime(100);
    await expect(promise).rejects.toThrow("Timeout");
  });

  it("propagates rejection from the input promise", async () => {
    await expect(
      withTimeout(Promise.reject(new Error("fail")), 1000)
    ).rejects.toThrow("fail");
  });
});
