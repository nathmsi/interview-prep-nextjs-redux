# Lesson 02 — Redux + Provider (App Router)

> **Level:** Easy  
> **Exercise:** `src/exercises/easy/02-redux-provider/`

## Typed store (RTK)

```ts
// store/index.ts
export function makeStore() {
  return configureStore({ reducer: { counter: counterReducer } });
}
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
```

## Typed hooks (React-Redux 9+)

```ts
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

## Provider — one store instance per client tree

```tsx
"use client";
export function StoreProvider({ children }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();
  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

`useRef` avoids recreating the store on every re-render (recommended with Strict Mode).

## In interviews

- Why is Redux **client-only** in the App Router?
- `useSelector` vs server-fetched props?
- `PayloadAction<T>` for typed actions.

## Your task

Complete `CounterExercise`: show `value`, wire `increment` / `decrement` buttons.
