# Algo 19 — Remove Nth Node From End

> **Category:** Linked list  
> **Function:** `removeNthFromEnd`  
> **Exercise:** `src/exercises/algo/05-linked-list/04-remove-nth-from-end/`

## Problem

Remove the nth node from the end in one pass.

## TypeScript cheatsheet

Dummy head + two pointers `n + 1` apart.

```typescript
const dummy = new ListNode(0, head);
let fast = dummy;
let slow = dummy;

for (let i = 0; i <= n; i++) fast = fast.next!;

while (fast) {
  slow = slow.next!;
  fast = fast.next;
}

slow.next = slow.next!.next;
return dummy.next;
```

## Run

```bash
npm run algo:19
```
