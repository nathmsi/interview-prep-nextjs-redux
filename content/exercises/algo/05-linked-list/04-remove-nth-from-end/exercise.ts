/**
 * EXERCISE algo/05 — Remove Nth Node From End
 *
 * Remove the nth node from the end and return the head.
 *
 * Examples
 * - head = [1, 2, 3, 4, 5], n = 2  → [1, 2, 3, 5]
 * - head = [1], n = 1               → []
 * - head = [1, 2], n = 1            → [1]
 *
 * Hint: two pointers n+1 apart, or dummy head
 * Run: npm run algo:19
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

export function removeNthFromEnd(
  head: ListNode | null,
  n: number
): ListNode | null {
  // TODO: your code here
  return head;
}
