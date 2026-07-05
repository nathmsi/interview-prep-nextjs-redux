/**
 * EXERCISE algo/05 — Merge Two Sorted Lists
 *
 * Merge two sorted linked lists into one sorted list.
 *
 * Examples
 * - [1, 2, 4] + [1, 3, 4] → [1, 1, 2, 3, 4, 4]
 * - [] + []                 → []
 * - [] + [0]                → [0]
 *
 * Hint: dummy head + compare heads of both lists
 * Run: npm run algo:17
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

export function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // TODO: your code here
  return list1 ?? list2;
}
