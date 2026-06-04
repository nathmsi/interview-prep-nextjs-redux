# Lesson 02 (hard) — Optimistic updates

> **Level:** Hard  
> **Exercise:** `src/exercises/hard/02-optimistic-cart/`

## Pattern

1. Save previous state
2. Apply local update immediately
3. `await` the mutation
4. On failure → `replaceItems(previous)`

```ts
const previous = getState().cart.items;
dispatch(addItem({ productId }));
try {
  await dispatch(syncCartToServer(getState().cart.items)).unwrap();
} catch {
  dispatch(replaceItems(previous));
}
```

## Interview questions

- UX vs server consistency
- Idempotent POSTs
- Alternative: `onQueryStarted` in RTK Query

## Your task

Implement the `optimisticAddToCart` thunk in the exercise.
