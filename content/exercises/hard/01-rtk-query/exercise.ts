/**
 * EXERCISE hard/01 — RTK Query endpoint
 * Lesson: content/lessons/hard/01-rtk-query.md
 *
 * Create exerciseProductsApi with getProducts query on /api/products
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/lib/db";

export const exerciseProductsApi = createApi({
  reducerPath: "exerciseProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
     query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery } = exerciseProductsApi;
