/**
 * EXERCISE algo/05 — Reverse Linked List
 *
 * Reverse a singly linked list and return the new head.
 *
 * Examples
 * - [1, 2, 3, 4, 5] → [5, 4, 3, 2, 1]
 * - [1, 2]            → [2, 1]
 * - []                → []
 *
 * Hint: iterative — prev / curr / next pointers
 * Run: npm run algo:16
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

export function reverseList(head: ListNode | null): ListNode | null {
  // TODO: your code here
  return head;
}
