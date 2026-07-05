import { describe, it, expect } from "vitest";
import { ListNode, hasCycle } from "./exercise";

function listWithCycle(vals: number[], pos: number): ListNode | null {
  if (vals.length === 0) return null;
  const nodes = vals.map((val) => new ListNode(val));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i]!.next = nodes[i + 1]!;
  }
  if (pos >= 0) nodes[nodes.length - 1]!.next = nodes[pos]!;
  return nodes[0]!;
}

describe("algo/05-linked-list/03-linked-list-cycle", () => {
  it("detects cycle in middle", () => {
    expect(hasCycle(listWithCycle([3, 2, 0, -4], 1))).toBe(true);
  });

  it("detects cycle at head", () => {
    expect(hasCycle(listWithCycle([1, 2], 0))).toBe(true);
  });

  it("returns false for acyclic list", () => {
    const head = new ListNode(1);
    head.next = new ListNode(2);
    expect(hasCycle(head)).toBe(false);
  });

  it("returns false for single node", () => {
    expect(hasCycle(new ListNode(1))).toBe(false);
  });
});
