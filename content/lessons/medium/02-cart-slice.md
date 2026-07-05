# Lesson 02 (medium) — Cart slice + POST /api/cart

> **Level:** Medium  
> **Exercise:** `content/exercises/medium/02-cart-slice/`

## Sync actions

- `addItem({ productId, quantity? })`
- `removeItem(productId)`
- Immutability handled by Immer in RTK.

## Server sync

```ts
export const syncCart = createAsyncThunk("cart/sync", async (items: CartItem[]) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  return (await res.json()).items;
});
```

The server persists in memory (`src/lib/db.ts`) — great for demos and manual integration tests.

## Your task

Implement `cartReducer` with `addItem` and item count via a selector.
