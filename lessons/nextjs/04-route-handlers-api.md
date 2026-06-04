# Next.js — Route Handlers (API)

> REST in `app/api/**/route.ts` · same deployment as your UI · examples from this repo

---

## Verify it (curl)

```bash
curl -s http://localhost:3000/api/health | jq .
curl -s http://localhost:3000/api/products | jq 'length'
curl -s "http://localhost:3000/api/products?category=books" | jq '.[0].title'
```

**Real file:** `src/app/api/products/route.ts` — compare with lesson snippets.

---

## What is a Route Handler?

A **Route Handler** is a server function that responds to HTTP requests. File: `route.ts` (not `page.tsx`).

```
app/api/products/route.ts     →  GET/POST  /api/products
app/api/products/[id]/route.ts → GET/PATCH/DELETE /api/products/:id
```

**Replaces (App Router):** `pages/api/*` from Pages Router.  
**You do NOT need** Express/Fastify for many apps — Next **is** your API layer (BFF pattern).

---

## Handler signature

```ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(body, { status: 201 });
}
```

Exported names map to HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

---

## This repo: `/api/products`

```ts
// src/app/api/products/route.ts (simplified)
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  // validation...
  const items = getProducts(category);
  return NextResponse.json(items);
}
```

**Try it:**

- Dev: `http://localhost:3000/api/products`
- Filter: `/api/products?category=books`
- Prod: `https://interview-prep-nextjs-redux.vercel.app/api/products`

---

## Dynamic route: `/api/products/[id]`

```ts
// app/api/products/[id]/route.ts
type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}
```

**Note (Next 15+):** `params` is a **Promise** — `await params` in async handlers.

---

## `/api/cart` — mutations

Typical interview pattern:

- `GET` — read cart
- `POST` — add line item (body JSON)
- `PATCH` — update quantity
- `DELETE` — clear or remove item

Return proper status codes: `400` validation, `404` missing, `201` created.

---

## `/api/health` — ops / deploy checks

```ts
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: Date.now() });
}
```

Used by load balancers, CI smoke tests, and monitoring.

---

## Request & response utilities

| API | Use |
|-----|-----|
| `request.nextUrl.searchParams` | Query string |
| `request.json()` | JSON body |
| `request.headers.get("authorization")` | Auth header |
| `NextResponse.json(data, { status })` | JSON response |
| `new NextResponse(body, { headers })` | Custom body |
| `cookies()` from `next/headers` | Read/set cookies (Server) |

---

## Calling your API from the app

### Server Component (recommended for initial data)

```tsx
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/products`, {
  cache: "no-store",
});
const products = await res.json();
```

In dev, absolute URL may need `http://localhost:3000` or use internal import of `getProducts()` directly (faster, no HTTP hop).

### Client Component

```tsx
useEffect(() => {
  fetch("/api/products").then((r) => r.json()).then(setProducts);
}, []);
```

Or **Redux `createAsyncThunk`** — this repo’s medium exercises.

---

## Route Handlers vs Server Actions

| Route Handlers | Server Actions |
|----------------|----------------|
| REST URL, any HTTP client | RPC-style, tied to React/forms |
| Mobile app / webhooks | Form mutations from your UI |
| `fetch` from anywhere | `action={fn}` or `formAction` |

Use **both** in large apps: public REST + internal mutations.

---

## CORS & external clients

By default, same-origin. For external SPAs, set CORS headers on `OPTIONS` + `GET` or use a dedicated API gateway.

---

## Testing (this repo)

```bash
npm run test:api   # Vitest hits Route Handlers
```

---

## Interview checklist

- File is `route.ts`, exports `GET`/`POST`/…
- Dynamic `[id]` via `params`
- Status codes + JSON errors
- Validation before DB writes
- Prefer server `fetch` or direct DB in RSC; Route Handlers for client/Redux/mobile

Next: [Data fetching & caching →](./05-data-fetching-caching.md)
