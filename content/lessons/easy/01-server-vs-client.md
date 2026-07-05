# Lesson 01 — Server vs Client Components

> **Level:** Easy  
> **Exercise:** `content/exercises/easy/01-server-vs-client/`

## Interview goal

Explain the difference between **Server Components** (App Router default) and **Client Components** (`"use client"`).

## Key rules

- Server Components can `await fetch()` directly, access the filesystem, and send less JS to the client.
- Client Components can use `useState`, `useEffect`, event handlers, and **Redux**.
- You cannot use Redux in a Server Component — the boundary is the file with `"use client"`.

## Typical Next.js pattern

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

## Common pitfalls

- Passing a **function** or **non-serializable object** from server to client → error.
- Putting `"use client"` on the whole tree → loses RSC benefits.
- Using Redux in a Server Component → impossible.

## Your task

Implement `ServerProductCount` (async, server fetch) and `ClientAddButton` (click handler) in the exercise.
