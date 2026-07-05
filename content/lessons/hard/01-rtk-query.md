# Lesson 01 (hard) — RTK Query

> **Level:** Hard  
> **Exercise:** `content/exercises/hard/01-rtk-query/`

## createApi

```ts
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
  }),
});
```

## Store

Add `[productsApi.reducerPath]: productsApi.reducer` and `productsApi.middleware`.

## Generated hooks

`useGetProductsQuery()` — cache, refetch, `isLoading`, `isError`.

## Interview questions

- When to prefer RTK Query over thunks?
- `providesTags` / `invalidatesTags` for cache invalidation.

## Full reference

See `src/store/api/productsApi.ts` and `solutions/hard/01-rtk-query/`.
