import { describe, it, expect } from "vitest";
import { promiseRace } from "./exercise";

describe("algo/08-fullstack-js/14-promise-race", () => {
  it("resolves with the first fulfilled promise", async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 50));
    const fast = Promise.resolve("fast");
    await expect(promiseRace([slow, fast])).resolves.toBe("fast");
  });

  it("rejects when the first settled promise rejects", async () => {
    await expect(
      promiseRace([Promise.resolve("ok"), Promise.reject(new Error("fail"))])
    ).rejects.toThrow("fail");
  });

  it("resolves with the only promise", async () => {
    await expect(promiseRace([Promise.resolve(42)])).resolves.toBe(42);
  });
});
