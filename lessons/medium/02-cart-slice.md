# Lesson 02 (medium) — Slice panier + POST /api/cart

> **Niveau:** Medium  
> **Exercice:** `src/exercises/medium/02-cart-slice/`

## Actions synchrones

- `addItem({ productId, quantity? })`
- `removeItem(productId)`
- Immutabilité gérée par Immer dans RTK.

## Sync serveur

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

Le serveur persiste en mémoire (`src/lib/db.ts`) — parfait pour démo et tests d'intégration manuels.

## À faire

Implémenter `cartReducer` avec `addItem` et calcul du nombre d'articles via selector.
