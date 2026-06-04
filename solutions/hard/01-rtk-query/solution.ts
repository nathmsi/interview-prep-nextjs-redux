import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/lib/db";

export const exerciseProductsApi = createApi({
  reducerPath: "exerciseProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
  }),
});

export const { useGetProductsQuery } = exerciseProductsApi;
