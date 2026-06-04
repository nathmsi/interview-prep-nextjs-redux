# Next.js — interview Q&A recap

> Quick answers · App Router · API · caching · deploy

---

## Fundamentals

**Q: What does Next.js add to React?**  
A: File routing, server rendering (RSC), built-in API (Route Handlers), image/font optimization, production build, and deployment integrations.

**Q: App Router vs Pages Router?**  
A: App Router (`app/`) — layouts, RSC, colocated loading/error. Pages Router (`pages/`) — legacy `getServerSideProps` / `getStaticProps`. New projects use App Router.

**Q: What is a Server Component?**  
A: Renders on server, no client JS for that component, can async fetch. Default in `app/`.

**Q: When `"use client"`?**  
A: Hooks, events, browser APIs, Redux, most interactive UI.

---

## Routing & files

**Q: How is a URL defined?**  
A: Folder structure under `app/` + `page.tsx` per segment. Dynamic: `[id]`. API: `route.ts`.

**Q: Difference layout vs template?**  
A: Layout persists state; template remounts on navigation.

**Q: How to 404?**  
A: `notFound()` + `not-found.tsx`.

---

## Data & caching

**Q: `cache: "no-store"` vs `revalidate: 60`?**  
A: `no-store` = always dynamic per request. `revalidate` = ISR, serve stale then refresh in background.

**Q: How to refresh after mutation?**  
A: `revalidatePath`, `revalidateTag`, or `router.refresh()`.

**Q: fetch in Server Component vs Route Handler?**  
A: Server Component for page data; Route Handler for HTTP API consumed by client, mobile, or webhooks.

---

## API (Route Handlers)

**Q: Where do API routes live?**  
A: `app/api/**/route.ts` — export `GET`, `POST`, etc.

**Q: How to read query/body?**  
A: `request.nextUrl.searchParams`, `await request.json()`.

**Q: This repo’s API?**  
A: `/api/health`, `/api/products`, `/api/products/[id]`, `/api/cart` — in-memory DB for interview practice.

---

## Server Actions

**Q: What are they?**  
A: Server functions called from forms/client with `"use server"` — mutations without writing REST manually.

**Q: vs Route Handlers?**  
A: Actions = app-internal RPC + forms. Handlers = public HTTP API.

---

## Auth & middleware

**Q: Where to protect routes?**  
A: `middleware.ts` for early redirect; also check session in Server Components / actions.

**Q: `NEXT_PUBLIC_` env vars?**  
A: Exposed to browser — only non-secrets.

---

## Build & deploy

**Q: `next build` output?**  
A: Static pages, server bundles, optimized client chunks.

**Q: Deploy options?**  
A: Vercel (native), Docker `standalone`, Node `next start`, static export only if fully static.

---

## With Redux (common combo question)

**Q: Can Redux run in Server Components?**  
A: No — Provider and hooks are client-only. Fetch on server, pass serializable props, or hydrate client store.

**Q: Where to fetch for Redux?**  
A: `createAsyncThunk` calling `/api/*` from Client Components, or pass `initialState` from server layout.

---

## Pitfalls to mention

- `"use client"` too high in tree
- Non-serializable props server → client
- Forgetting `await params` in dynamic routes (Next 15+)
- Secrets in `NEXT_PUBLIC_`
- No validation in Route Handlers / Server Actions

---

## Study path in this repo

1. **Next.js course** — `/lessons/nextjs/01-overview-and-tooling` … `10-interview-questions`
2. **Labs** — easy / medium / hard (Redux + API)
3. **React hooks** — `/lessons/react/...`
4. **Live API** — `npm run dev` → `/api/products`
