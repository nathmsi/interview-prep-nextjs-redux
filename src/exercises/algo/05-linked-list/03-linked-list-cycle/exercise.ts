/**
 * EXERCISE algo/05 — Linked List Cycle
 *
 * Return true if the linked list has a cycle.
 *
 * Examples
 * - 3 → 2 → 0 → -4 ↩ 2  → true
 * - 1 → 2 ↩ 1             → true
 * - 1                     → false
 *
 * Hint: Floyd's tortoise and hare — slow + fast pointers
 * Run: npm run algo:18
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

export function hasCycle(head: ListNode | null): boolean {
  // TODO: your code here
  return false;
}
