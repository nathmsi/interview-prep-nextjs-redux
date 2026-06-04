# Next.js — overview & what the framework gives you

> **Next.js 16** · App Router · React 19 · Course only

## What is Next.js?

**Next.js** is a **full-stack React framework**. You still write React components, but Next adds:

| Capability | Without Next (CRA/Vite SPA) | With Next.js |
|------------|----------------------------|--------------|
| Routing | React Router / manual | **File-based** `app/` router |
| Rendering | Client-only (CSR) | **Server**, **Client**, static, hybrid |
| API | Separate Express server | **Route Handlers** in the same repo |
| Build / deploy | Configure Webpack/Vite yourself | **`next build`** + Vercel-optimized output |
| Images, fonts, metadata | Third-party libs | **Built-in** (`next/image`, `next/font`, `metadata`) |
| Data on first paint | Client fetch + loading spinners | **Server fetch** before HTML is sent |

In interviews: Next = **React + opinions** for production web apps (especially SaaS, marketing, dashboards, e-commerce).

---

## Verify it (this repo)

```bash
npm run dev
# open http://localhost:3000
# open http://localhost:3000/api/health → {"status":"ok",...}
```

**Files to open:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/api/health/route.ts`.

---

## Core tools Next ships

### CLI & scripts

```bash
npx create-next-app@latest   # scaffold (TypeScript, Tailwind, App Router)
npm run dev                  # dev server + Fast Refresh
npm run build                # production build
npm run start                # serve production build
npm run lint                 # ESLint (eslint-config-next)
```

### `app/` directory (App Router — default since Next 13+)

- **Pages** = `page.tsx` files
- **Layouts** = shared UI wrappers (`layout.tsx`)
- **API** = `route.ts` under `app/api/...`
- **Loading / error UI** = `loading.tsx`, `error.tsx`, `not-found.tsx`

### Built-in modules (no extra install)

- `next/link` — client navigation, prefetch
- `next/navigation` — `useRouter`, `usePathname`, `redirect`, `notFound` (client)
- `next/server` — `NextRequest`, `NextResponse` (Route Handlers)
- `next/image` — responsive images, lazy load, formats
- `next/font` — self-hosted fonts, no layout shift

**This repo** uses `next/font` in `src/app/layout.tsx` and Route Handlers in `src/app/api/`.

---

## Mental model: request → response

1. User hits a URL (`/lessons/nextjs/01-overview-and-tooling`)
2. Next matches **route segment** in `app/lessons/[level]/[slug]/page.tsx`
3. **Server Components** run on the server (can `await fetch`, read files)
4. HTML + minimal client JS sent to browser
5. **Client Components** hydrate where `"use client"` is used (state, Redux, clicks)

---

## What you can build with Next alone (no separate backend)

- Marketing site + blog (MDX, CMS)
- Dashboard with **Route Handlers** as BFF (backend-for-frontend)
- Full REST API under `/api/*` (this repo: products, cart, health)
- Forms with **Server Actions** (mutations without writing `fetch` in the client)
- Auth with middleware + cookies + session provider

---

## Next vs “just React”

**Q: When would you still use Vite + React only?**  
A: Embedded widgets, highly custom bundling, or when you already have a separate API team and only need a SPA. Next wins when you want **one codebase**, **SEO**, **fast first load**, and **server logic** colocated with UI.

**Q: Pages Router vs App Router?**  
A: **App Router** is current default (`app/`). Pages Router (`pages/`) still works in legacy apps; new projects and interviews focus on **App Router + RSC**.

---

## This repo map

```
src/app/
  layout.tsx          ← root layout, metadata, providers
  page.tsx            ← home
  lessons/            ← dynamic lesson pages
  demo/               ← Redux demo
  api/
    health/route.ts
    products/route.ts
    products/[id]/route.ts
    cart/route.ts
```

Next lesson: [App Router & routing →](./02-app-router-routing.md)
