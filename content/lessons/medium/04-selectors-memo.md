# Lesson 04 (medium) — createSelector

> **Level:** Medium  
> **Exercise:** `content/exercises/medium/04-selectors-memo/`

## Why

Without memoization, a selector recreated every render can return new array references → child re-renders.

```ts
export const selectCartTotal = createSelector(
  [selectCartLineItems],
  (lines) => lines.reduce((sum, l) => sum + l.lineTotal, 0)
);
```

## Interview questions

- Inline `(s) => s.cart.items.map(...)` vs `createSelector`?
- Reselect only recalculates when inputs change (shallow reference equality).

## Your task

Implement `selectCartLineItems` and `selectCartTotal` in the exercise.
