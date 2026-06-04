# Lesson 02 (hard) — Mises à jour optimistes

> **Niveau:** Hard  
> **Exercice:** `src/exercises/hard/02-optimistic-cart/`

## Pattern

1. Sauvegarder l'état précédent
2. Appliquer la mise à jour locale immédiatement
3. `await` la mutation
4. Si échec → `replaceItems(previous)`

```ts
const previous = getState().cart.items;
dispatch(addItem({ productId }));
try {
  await dispatch(syncCartToServer(getState().cart.items)).unwrap();
} catch {
  dispatch(replaceItems(previous));
}
```

## Entretien

- UX vs cohérence serveur
- Idempotence des POST
- Alternative : `onQueryStarted` dans RTK Query

## À faire

Implémenter `optimisticAddToCart` thunk dans l'exercice.
