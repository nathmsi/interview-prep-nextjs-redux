import { describe, it, expect } from "vitest";
import { ListNode, removeNthFromEnd } from "./exercise";

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

describe("algo/05-linked-list/04-remove-nth-from-end", () => {
  it("removes second from end", () => {
    expect(
      listToArray(removeNthFromEnd(listFromArray([1, 2, 3, 4, 5]), 2))
    ).toEqual([1, 2, 3, 5]);
  });

  it("removes the only node", () => {
    expect(listToArray(removeNthFromEnd(listFromArray([1]), 1))).toEqual([]);
  });

  it("removes last node", () => {
    expect(listToArray(removeNthFromEnd(listFromArray([1, 2]), 1))).toEqual([1]);
  });
});
