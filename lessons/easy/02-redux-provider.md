# Lesson 02 — Redux + Provider (App Router)

> **Niveau:** Easy  
> **Exercice:** `src/exercises/easy/02-redux-provider/`

## Store typé (RTK)

```ts
// store/index.ts
export function makeStore() {
  return configureStore({ reducer: { counter: counterReducer } });
}
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
```

## Hooks typés (React-Redux 9+)

```ts
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

## Provider — une instance par requête côté client

```tsx
"use client";
export function StoreProvider({ children }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();
  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

`useRef` évite de recréer le store à chaque re-render (et en dev avec Strict Mode, pattern recommandé).

## En entretien

- Pourquoi Redux reste **client-only** dans App Router ?
- Différence `useSelector` vs props du serveur ?
- `PayloadAction<T>` pour typer les actions.

## À faire

Compléter `CounterExercise` : afficher `value`, boutons `increment` / `decrement`.
