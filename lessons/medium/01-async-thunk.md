# Lesson 01 (medium) — createAsyncThunk + API Route

> **Niveau:** Medium  
> **Exercice:** `src/exercises/medium/01-async-thunk/`

## createAsyncThunk

```ts
export const fetchProducts = createAsyncThunk<
  Product[],
  string | undefined,
  { rejectValue: string }
>("products/fetch", async (category, { rejectWithValue }) => {
  const res = await fetch(`/api/products${category ? `?category=${category}` : ""}`);
  if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
  return res.json();
});
```

## extraReducers

```ts
builder
  .addCase(fetchProducts.pending, (state) => { state.status = "loading"; })
  .addCase(fetchProducts.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.items = action.payload;
  })
  .addCase(fetchProducts.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload ?? "Error";
  });
```

## Côté UI

Dispatcher dans `useEffect` ou au clic. Le **serveur** est `/api/products` (voir `src/app/api/products/route.ts`).

## Entretien

- Thunk vs RTK Query ?
- Gestion `rejectWithValue` vs `throw` ?
- Pourquoi `fetch` relatif fonctionne dans le browser sur le même origin ?

## À faire

Brancher `productsReducer` minimal + thunk dans l'exercice (tests Vitest).
