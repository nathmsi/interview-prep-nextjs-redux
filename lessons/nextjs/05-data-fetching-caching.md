# Next.js — data fetching & caching

> Extended `fetch` · revalidation · static vs dynamic rendering

---

## Verify it

In a Server Component, `fetch(url, { cache: 'no-store' })` forces dynamic data. Check Network tab: document request includes fresh data each navigation when dynamic.

---

## `fetch` in Server Components

Next **extends** the Web `fetch` API with caching semantics:

```tsx
export default async function Page() {
  // Default: cached (static) where possible
  const a = await fetch("https://api.example.com/a");

  // Always fresh — like getServerSideProps every request
  const b = await fetch("https://api.example.com/b", { cache: "no-store" });

  // ISR: revalidate every 60 seconds
  const c = await fetch("https://api.example.com/c", { next: { revalidate: 60 } });

  return <div>...</div>;
}
```

---

## Cache options cheat sheet

| Option | Behavior |
|--------|----------|
| Default (force-cache) | Dedupe + cache across requests (static) |
| `cache: "no-store"` | Dynamic — no data cache |
| `next: { revalidate: N }` | **ISR** — stale-while-revalidate every N seconds |
| `next: { tags: ["products"] }` | Tag for **on-demand** revalidation |

---

## On-demand revalidation

```ts
import { revalidatePath, revalidateTag } from "next/cache";

// After admin updates product:
revalidateTag("products");
revalidatePath("/shop");
```

Use in **Server Actions** or Route Handlers after mutations.

---

## Route segment config

Force dynamic or static at file level:

```tsx
export const dynamic = "force-dynamic"; // no static caching for this page
export const dynamic = "force-static";
export const revalidate = 3600; // page-level ISR seconds
```

**Interview:** `dynamic = "force-dynamic"` when you need cookies/headers per request or real-time data.

---

## Reading headers / cookies → dynamic

```tsx
import { cookies, headers } from "next/headers";

export default async function Dashboard() {
  const token = (await cookies()).get("session");
  // Using cookies() opts route into dynamic rendering
}
```

---

## Parallel data fetching

```tsx
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);
```

Avoid waterfall: start independent fetches together.

---

## Streaming & Suspense

Wrap slow server UI in `<Suspense fallback={<Skeleton />}>`:

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments />
    </Suspense>
  );
}

async function Comments() {
  const data = await fetchComments(); // streams when ready
  return <ul>...</ul>;
}
```

`loading.tsx` is automatic Suspense for the **page** segment.

---

## Client-side fetching still valid

- User-specific UI after mount
- Polling, websockets
- Redux thunks hitting `/api/*`

Server-first for **SEO** and **initial HTML**; client for **interaction**.

---

## Direct DB vs HTTP in server code

**Best practice:** Server Components call **DB/service layer** directly (`import { getProducts } from "@/lib/db"`).

Route Handlers for **external** consumers or client/Redux.

This repo uses `getProducts()` in API routes; lessons could import the same in RSC without HTTP.

---

## Interview Q&A

**Q: Difference between SSR, SSG, ISR?**  
A: **SSG** = build time HTML. **SSR** = per-request render (`no-store` / dynamic). **ISR** = static + periodic `revalidate`.

**Q: How does Next 13+ differ from `getServerSideProps`?**  
A: Data colocated in Server Components via `fetch` + segment config, not only `getServerSideProps` in `pages/`.

**Q: Stale data after mutation?**  
A: `revalidatePath` / `revalidateTag` or `router.refresh()` on client.

Next: [Layouts, loading, errors →](./06-layouts-loading-errors.md)
