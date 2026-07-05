# Next.js — App Router & routing

> File-based routing in `app/` · dynamic segments · navigation

---

## Verify it (this repo)

| URL | File |
|-----|------|
| `/` | `src/app/page.tsx` |
| `/subjects/css` | `src/app/subjects/[subject]/page.tsx` |
| `/lessons/react/01-use-state` | `src/app/lessons/[level]/[slug]/page.tsx` |

---

## File conventions (the “special files”)

| File | Purpose |
|------|---------|
| `page.tsx` | **Route UI** — makes the URL publicly accessible |
| `layout.tsx` | **Shared shell** — persists across child navigations |
| `route.ts` | **API endpoint** — no UI, HTTP handlers only |
| `loading.tsx` | Instant loading UI (Suspense boundary) |
| `error.tsx` | Error boundary for the segment |
| `not-found.tsx` | 404 for this segment |
| `template.tsx` | Like layout but re-mounts on navigation (rare) |
| `default.tsx` | Parallel routes fallback |

**Rule:** Only folders with a `page.tsx` (or `route.ts`) create a URL segment.

---

## URL → folder mapping

```
app/page.tsx                    →  /
app/demo/page.tsx               →  /demo
app/lessons/page.tsx            →  /lessons
app/lessons/[level]/[slug]/page.tsx  →  /lessons/react/01-use-state
app/api/products/route.ts       →  /api/products  (no page.tsx needed)
app/api/products/[id]/route.ts  →  /api/products/abc-123
```

**Dynamic segments:** `[param]` — one segment.  
**Catch-all:** `[...slug]` — rest of path.  
**Optional catch-all:** `[[...slug]]`.

---

## Layouts nest automatically

```tsx
// app/layout.tsx — wraps entire app
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Child `page.tsx` renders **inside** `children`. Layouts **do not remount** on sibling navigation — good for nav bars, providers, fonts.

**This repo:** `RootLayout` wraps `AppNav` + `StoreProvider` + `main` around every page.

---

## Navigation

### `<Link>` (preferred)

```tsx
import Link from "next/link";

<Link href="/lessons/nextjs/04-route-handlers-api">API lesson</Link>
```

- Client-side transition (no full reload)
- **Prefetch** visible links in production

### Imperative (Client Component only)

```tsx
"use client";
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/demo");
router.refresh(); // re-fetch server data for current route
```

### Server redirects

```tsx
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/login");
  // ...
}
```

---

## Route groups & private folders

- `(marketing)/about/page.tsx` — **group** `(marketing)` not in URL → `/about`
- `_components/Button.tsx` — folder starting with `_` is **not** a route (convention for colocation)

Use groups to organize layouts (e.g. auth vs dashboard) without changing URLs.

---

## `generateStaticParams` (SSG paths)

For dynamic routes, tell Next which paths to pre-render at build time:

```tsx
export async function generateStaticParams() {
  return [{ level: "nextjs", slug: "01-overview-and-tooling" }];
}
```

Without it, dynamic routes may be **generated on first request** (ISR) or fully dynamic depending on `fetch` / `dynamic` config.

---

## Interview questions

**Q: Difference between `pages/` and `app/`?**  
A: `pages/` = Pages Router (legacy). `app/` = App Router, React Server Components, nested layouts, colocated `loading`/`error`.

**Q: How do you define a 404?**  
A: `not-found.tsx` in a segment + `notFound()` from `next/navigation` in server code.

**Q: Can two `page.tsx` map to the same URL?**  
A: No — one winning file per segment. Parallel routes use `@folder` slots (advanced).

Next: [Server vs Client Components →](./03-server-client-components.md)
