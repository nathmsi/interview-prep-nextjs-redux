import { describe, it, expect } from "vitest";
import { ListNode, reverseList } from "./exercise";

function listFromArray(vals: number[]): ListNode | null {
  const dummy = new ListNode();
  let current = dummy;
  for (const val of vals) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

describe("algo/05-linked-list/01-reverse-linked-list", () => {
  it("reverses a multi-node list", () => {
    expect(listToArray(reverseList(listFromArray([1, 2, 3, 4, 5])))).toEqual([
      5, 4, 3, 2, 1,
    ]);
  });

  it("reverses two nodes", () => {
    expect(listToArray(reverseList(listFromArray([1, 2])))).toEqual([2, 1]);
  });

  it("handles empty list", () => {
    expect(listToArray(reverseList(null))).toEqual([]);
  });

  it("handles single node", () => {
    expect(listToArray(reverseList(listFromArray([7])))).toEqual([7]);
  });
});
