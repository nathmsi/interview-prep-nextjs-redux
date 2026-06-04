# Lesson 01 — Server vs Client Components

> **Niveau:** Easy  
> **Exercice:** `src/exercises/easy/01-server-vs-client/`

## Objectif entretien

Expliquer la différence entre **Server Component** (défaut App Router) et **Client Component** (`"use client"`).

## Règles clés

- Les Server Components peuvent `await fetch()` directement, accéder au filesystem, et ne envoient pas de JS inutile au client.
- Les Client Components peuvent utiliser `useState`, `useEffect`, event handlers, **Redux**.
- On ne peut pas importer un Client Component dans un Server Component *sans* que le parent client enveloppe l'enfant — le boundary est le fichier avec `"use client"`.

## Pattern typique Next.js

```tsx
// app/products/page.tsx — SERVER
import { ProductList } from "./ProductList";

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();
  return <ProductList initialProducts={products} />;
}
```

```tsx
// ProductList.tsx — CLIENT
"use client";
export function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  // state, Redux, clicks...
}
```

## Pièges classiques

- Passer une **fonction** ou un **objet non sérialisable** du serveur au client → erreur.
- Mettre `"use client"` sur tout l'arbre → perd les bénéfices RSC.
- Utiliser Redux dans un Server Component → impossible.

## À faire

Implémenter `ServerProductCount` (async, fetch serveur) et `ClientAddButton` (click handler) dans l'exercice.
