# Lesson 04 (medium) — createSelector

> **Niveau:** Medium  
> **Exercice:** `src/exercises/medium/04-selectors-memo/`

## Pourquoi

Sans mémo, un selector recalculé à chaque render peut recréer des tableaux → re-renders enfants.

```ts
export const selectCartTotal = createSelector(
  [selectCartLineItems],
  (lines) => lines.reduce((sum, l) => sum + l.lineTotal, 0)
);
```

## Entretien

- Différence selector inline `(s) => s.cart.items.map(...)` vs `createSelector` ?
- Reselect recalcule seulement si les inputs changent (référence shallow).

## À faire

Implémenter `selectCartLineItems` et `selectCartTotal` dans l'exercice.
