# Next.js — Server vs Client Components

> React Server Components (RSC) · `"use client"` · composition patterns

---

## Verify it (this repo)

- **Server:** lesson pages under `src/app/lessons/...` (no `"use client"` on `page.tsx`)
- **Client:** `src/components/quiz/*Accordion.tsx`, `src/app/demo/layout.tsx` + Provider

---

## Default: Server Components

Every component in `app/` is a **Server Component** unless the file starts with:

```tsx
"use client";
```

### Server Components CAN

- `async` / `await` directly in the component body
- `fetch()` with Next cache options
- Read environment variables (server-only secrets)
- Access DB, filesystem, internal services
- Keep large dependencies off the client bundle

### Server Components CANNOT

- `useState`, `useEffect`, `useReducer`, hooks (except `use` in React 19 rules)
- Browser APIs (`window`, `localStorage`)
- Event handlers (`onClick`, `onChange`)
- Redux, most context consumers that need client state

---

## Client Components

Mark with `"use client"` at the **top of the file** (before imports).

### Client Components CAN

- Hooks, events, browser APIs
- Redux Provider, `useAppSelector`, etc.
- Third-party libs that use hooks or `window`

### Client Components CANNOT

- Be `async` function components
- Import server-only modules that use Node APIs (unless split carefully)

---

## Composition pattern (interview favorite)

**Pass Server → Client as children or serializable props.**

```tsx
// app/products/page.tsx — SERVER
import { AddToCartButton } from "./AddToCartButton";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name}
          <AddToCartButton productId={p.id} />
        </li>
      ))}
    </ul>
  );
}
```

```tsx
// AddToCartButton.tsx — CLIENT
"use client";

export function AddToCartButton({ productId }: { productId: string }) {
  return <button type="button" onClick={() => add(productId)}>Add</button>;
}
```

**Anti-pattern:** `"use client"` on the **page** root when only a button needs interactivity — splits the whole tree to the client.

---

## Serializable props boundary

Props from Server → Client must be **JSON-serializable**:

- ✅ strings, numbers, booleans, plain objects, arrays
- ❌ functions, class instances, Symbols, Dates (unless converted to string)

**Fix for functions:** pass Server Actions or use client-side handlers only inside Client Components.

---

## Where Redux lives

| Piece | Server or Client |
|-------|------------------|
| `configureStore`, slices | Shared TS modules (no hooks) |
| `<Provider store={store}>` | **Client** layout or wrapper |
| `useAppSelector` | **Client** only |

**This repo:** `StoreProvider` is a Client Component in `layout.tsx` wrapping the app.

---

## `use` hook (React 19 + Next)

`use(promise)` and `use(context)` can run in Server Components (with Suspense). Differs from classic hooks — know it exists for streaming and reading promises in render.

---

## Interview answers

**Q: Why do Server Components exist?**  
A: Less JS to the browser, data fetched on server closer to DB/API, better first paint and SEO.

**Q: Can a Server Component import a Client Component?**  
A: Yes — as child or via props. Client cannot import Server directly (would pull server code into bundle); wrap server output as `children` instead.

**Q: Where do I put `"use client"`?**  
A: Leaf nodes that need interactivity — buttons, forms, providers — not the entire page tree.

Next: [Route Handlers (API) →](./04-route-handlers-api.md)
