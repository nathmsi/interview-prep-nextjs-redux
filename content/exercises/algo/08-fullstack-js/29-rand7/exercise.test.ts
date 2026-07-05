import { describe, it, expect } from "vitest";
import { rand7 } from "./exercise";

function seqRand5(values: number[]): () => number {
  let i = 0;
  return () => {
    const v = values[i % values.length];
    i++;
    return v;
  };
}

describe("algo/08-fullstack-js/29-rand7", () => {
  it("returns a value between 1 and 7", () => {
    const rand5 = () => Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < 100; i++) {
      const n = rand7(rand5);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(7);
    }
  });

  it("maps accepted rejection samples correctly", () => {
    // (1-1)*5 + 1 = 1 → index 0 → result 1
    expect(rand7(seqRand5([1, 1]))).toBe(1);
    // (1-1)*5 + 7 invalid... rand5 max is 5
    // (4-1)*5 + 1 = 16 → (16-1)%7+1 = 2
    expect(rand7(seqRand5([4, 1]))).toBe(2);
    // (5-1)*5 + 1 = 21 → (21-1)%7+1 = 7
    expect(rand7(seqRand5([5, 1]))).toBe(7);
  });

  it("rejects samples above 21 and retries", () => {
    // (5-1)*5 + 5 = 25 → reject, then (1-1)*5+1 = 1 → accept
    expect(rand7(seqRand5([5, 5, 1, 1]))).toBe(1);
  });

  it("distributes roughly uniformly over many calls", () => {
    const counts = new Array(7).fill(0);
    const n = 70_000;
    const rand5 = () => Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < n; i++) {
      counts[rand7(rand5) - 1]++;
    }

    const expected = n / 7;
    for (const c of counts) {
      expect(c).toBeGreaterThan(expected * 0.9);
      expect(c).toBeLessThan(expected * 1.1);
    }
  });
});
