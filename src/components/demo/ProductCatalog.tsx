"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, setFilter } from "@/store/slices/productsSlice";
import { addItem, registerProducts, syncCartToServer } from "@/store/slices/cartSlice";
import {
  selectCartItemCount,
  selectCartTotal,
  selectFilteredProducts,
} from "@/store/selectors";
import type { Product } from "@/lib/db";

const categories: Array<Product["category"] | "all"> = [
  "all",
  "books",
  "electronics",
  "home",
];

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const { status, error, filter } = useAppSelector((s) => s.products);
  const products = useAppSelector(selectFilteredProducts);
  const cartCount = useAppSelector(selectCartItemCount);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartStatus = useAppSelector((s) => s.cart.status);

  useEffect(() => {
    const cat = filter === "all" ? undefined : filter;
    void dispatch(fetchProducts(cat));
  }, [dispatch, filter]);

  useEffect(() => {
    if (products.length > 0) {
      dispatch(registerProducts(products));
    }
  }, [dispatch, products]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Catalogue (Redux + /api/products)</h2>
          <p className="text-sm text-zinc-500">
            Panier: {cartCount} article(s) — {cartTotal.toFixed(2)} €
            {cartStatus === "syncing" && " (sync…)"}
          </p>
        </div>
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => dispatch(setFilter(c))}
              className={`rounded-full px-3 py-1 text-sm ${
                filter === c
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      {status === "loading" && <p className="text-sm text-zinc-500">Chargement…</p>}
      {status === "failed" && (
        <p className="text-sm text-red-600">Erreur: {error}</p>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-zinc-500">
              {p.category} — {p.price} €
            </div>
            <button
              type="button"
              className="mt-2 rounded bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
              onClick={() => dispatch(addItem({ productId: p.id }))}
            >
              Ajouter
            </button>
          </li>
        ))}
      </ul>

      <SyncCartButton />
    </div>
  );
}

function SyncCartButton() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const cartStatus = useAppSelector((s) => s.cart.status);

  return (
    <button
      type="button"
      disabled={cartStatus === "syncing"}
      className="rounded bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
      onClick={() => void dispatch(syncCartToServer(items))}
    >
      Persister le panier (POST /api/cart)
    </button>
  );
}
