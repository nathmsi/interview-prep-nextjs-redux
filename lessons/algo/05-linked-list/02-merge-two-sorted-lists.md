# Algo 17 — Merge Two Sorted Lists

> **Category:** Linked list  
> **Function:** `mergeTwoLists`  
> **Exercise:** `src/exercises/algo/05-linked-list/02-merge-two-sorted-lists/`

## Problem

Merge two sorted linked lists into one sorted list.

## TypeScript cheatsheet

```typescript
const dummy = new ListNode();
let tail = dummy;

while (list1 && list2) {
  if (list1.val <= list2.val) {
    tail.next = list1;
    list1 = list1.next;
  } else {
    tail.next = list2;
    list2 = list2.next;
  }
  tail = tail.next;
}

tail.next = list1 ?? list2;
return dummy.next;
```

## Run

```bash
npm run algo:17
```
