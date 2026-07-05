import { describe, it, expect } from "vitest";
import { ListNode, mergeTwoLists } from "./exercise";

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

describe("algo/05-linked-list/02-merge-two-sorted-lists", () => {
  it("merges two non-empty lists", () => {
    expect(
      listToArray(mergeTwoLists(listFromArray([1, 2, 4]), listFromArray([1, 3, 4])))
    ).toEqual([1, 1, 2, 3, 4, 4]);
  });

  it("handles both empty", () => {
    expect(listToArray(mergeTwoLists(null, null))).toEqual([]);
  });

  it("handles one empty list", () => {
    expect(listToArray(mergeTwoLists(null, listFromArray([0])))).toEqual([0]);
  });
});
