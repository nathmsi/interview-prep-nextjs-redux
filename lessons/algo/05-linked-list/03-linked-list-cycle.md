# Algo 18 — Linked List Cycle

> **Category:** Linked list  
> **Function:** `hasCycle`  
> **Exercise:** `src/exercises/algo/05-linked-list/03-linked-list-cycle/`

## Problem

Return `true` if the linked list contains a cycle.

## TypeScript cheatsheet

Floyd's algorithm — slow moves 1 step, fast moves 2 steps.

```typescript
let slow = head;
let fast = head;

while (fast && fast.next) {
  slow = slow!.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}

return false;
```

## Run

```bash
npm run algo:18
```
