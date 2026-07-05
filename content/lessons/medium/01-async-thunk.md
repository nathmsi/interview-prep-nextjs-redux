# Lesson 01 (medium) — createAsyncThunk + API Route

> **Level:** Medium  
> **Exercise:** `content/exercises/medium/01-async-thunk/`

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

## UI

Dispatch in `useEffect` or on click. The **server** is `/api/products` (see `src/app/api/products/route.ts`).

## Interview questions

- Thunk vs RTK Query?
- `rejectWithValue` vs `throw`?
- Why does relative `fetch` work in the browser on the same origin?

## Your task

Wire a minimal `productsReducer` + thunk in the exercise (Vitest tests).
