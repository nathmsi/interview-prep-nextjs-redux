# Algo 16 — Reverse Linked List

> **Category:** Linked list  
> **Function:** `reverseList`  
> **Exercise:** `content/exercises/algo/05-linked-list/01-reverse-linked-list/`

## Problem

Reverse a singly linked list in-place. Return the new head.

## TypeScript cheatsheet

```typescript
let prev: ListNode | null = null;
let curr = head;

while (curr) {
  const next = curr.next;
  curr.next = prev;
  prev = curr;
  curr = next;
}

return prev;
```

## Run

```bash
npm run algo:16
```
