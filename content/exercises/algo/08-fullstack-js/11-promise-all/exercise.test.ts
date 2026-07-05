import { describe, it, expect } from "vitest";
import { promiseAll } from "./exercise";

describe("algo/08-fullstack-js/11-promise-all", () => {
  it("resolves with all results in order", async () => {
    await expect(
      promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
    ).resolves.toEqual([1, 2, 3]);
  });

  it("resolves empty array for no promises", async () => {
    await expect(promiseAll([])).resolves.toEqual([]);
  });

  it("preserves order even when promises resolve at different times", async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 50));
    const fast = Promise.resolve("fast");
    await expect(promiseAll([slow, fast])).resolves.toEqual(["slow", "fast"]);
  });

  it("rejects when any promise rejects", async () => {
    await expect(
      promiseAll([Promise.resolve(1), Promise.reject(new Error("fail"))])
    ).rejects.toThrow("fail");
  });
});
