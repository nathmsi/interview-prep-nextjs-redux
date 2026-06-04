# Lesson 01 (hard) — RTK Query

> **Niveau:** Hard  
> **Exercice:** `src/exercises/hard/01-rtk-query/`

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

Ajouter `[productsApi.reducerPath]: productsApi.reducer` et `productsApi.middleware`.

## Hooks générés

`useGetProductsQuery()` — cache, refetch, `isLoading`, `isError`.

## Entretien

- Quand préférer RTK Query aux thunks ?
- `providesTags` / `invalidatesTags` pour cache invalidation.

## Référence complète

Voir `src/store/api/productsApi.ts` et `solutions/hard/01-rtk-query/`.
