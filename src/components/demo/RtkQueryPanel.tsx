"use client";

import { useGetProductsQuery, useUpdateCartMutation } from "@/store/api/productsApi";

export function RtkQueryPanel() {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const [updateCart, { isLoading: saving }] = useUpdateCartMutation();

  return (
    <div className="rounded-lg border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-900 dark:bg-violet-950/30">
      <h2 className="font-semibold text-violet-900 dark:text-violet-200">
        RTK Query (hard/01)
      </h2>
      {isLoading && <p className="mt-2 text-sm">Cache + fetch…</p>}
      {isError && (
        <p className="mt-2 text-sm text-red-600">
          {JSON.stringify(error)}
        </p>
      )}
      {data && (
        <ul className="mt-2 max-h-40 overflow-auto text-sm">
          {data.map((p) => (
            <li key={p.id}>
              {p.name} — {p.price}€
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        disabled={saving}
        className="mt-3 rounded bg-violet-700 px-3 py-1 text-sm text-white disabled:opacity-50"
        onClick={() =>
          updateCart({
            items: data?.[0]
              ? [{ productId: data[0].id, quantity: 1 }]
              : [],
          })
        }
      >
        Test mutation POST /api/cart
      </button>
    </div>
  );
}
