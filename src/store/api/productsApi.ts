import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/lib/db";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product", "Cart"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], Product["category"] | void>({
      query: (category) =>
        category ? `products?category=${category}` : "products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Product", id }],
    }),
    getCart: builder.query<{ items: { productId: string; quantity: number }[] }, void>({
      query: () => "cart",
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCart: builder.mutation<
      { items: { productId: string; quantity: number }[] },
      { items: { productId: string; quantity: number }[] }
    >({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartQuery,
  useUpdateCartMutation,
} = productsApi;
