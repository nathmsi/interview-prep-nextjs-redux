import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sleep } from "./exercise";

describe("algo/08-fullstack-js/28-sleep", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves after ms milliseconds", async () => {
    const promise = sleep(100);
    vi.advanceTimersByTime(99);
    let settled = false;
    promise.then(() => {
      settled = true;
    });
    await Promise.resolve();
    expect(settled).toBe(false);

    vi.advanceTimersByTime(1);
    await promise;
  });

  it("resolves immediately for 0 ms", async () => {
    const promise = sleep(0);
    await vi.runAllTimersAsync();
    await promise;
  });
});
