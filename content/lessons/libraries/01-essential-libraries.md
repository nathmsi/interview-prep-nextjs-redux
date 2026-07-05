# Essential front-end libraries — what & why

> **Interview prep** — name tools, justify choices, avoid “npm everything”

---

## Verify it

In this repo: `npm test` runs Vitest; `npm run test:e2e` runs Playwright — name them when asked "how do you test React?"

---

## Data fetching & server state

### TanStack Query (React Query)

**What:** cache, dedupe, background refetch, stale-while-revalidate for **server state**.

**Why not only Redux?** Redux excels at **client** global UI state; React Query excels at **async server data** (keys, invalidation, retries).

**When to say in interview:** “Remote data in React Query; UI flags and wizard state in useState or Zustand.”

```tsx
const { data, isPending, error } = useQuery({
  queryKey: ["products"],
  queryFn: () => fetch("/api/products").then((r) => r.json()),
});
```

### SWR

Similar niche to React Query — lighter API, also stale-while-revalidate. “Either is fine; we standardize on TanStack Query.”

### RTK Query

**What:** Redux Toolkit addon — cache + endpoints in the same store as slices.

**Why:** one mental model if team is all-in on Redux. **This repo’s hard exercises** use RTK Query patterns.

---

## Client state (lightweight)

### Zustand

**What:** minimal global store without boilerplate.

**Why:** cart panel open, filters, theme — when Redux feels heavy.

```ts
import { create } from "zustand";

const useUI = create<{ sidebar: boolean; toggle: () => void }>((set) => ({
  sidebar: false,
  toggle: () => set((s) => ({ sidebar: !s.sidebar })),
}));
```

### Redux Toolkit

**What:** slices, immer, thunks, RTK Query — enterprise standard.

**Why:** large teams, time-travel debugging, predictable updates, many existing codebases.

**Interview:** know when it’s **overkill** for a small app.

### Jotai / Recoil

Atomic state — fine-grained updates. Less common than Zustand/Redux in interviews but good to name.

---

## Forms

### React Hook Form

**What:** performant forms, minimal re-renders, great TS.

**Why:** register refs instead of controlled inputs for every keystroke.

```tsx
const { register, handleSubmit } = useForm<FormValues>();
```

### Formik

Older, still in legacy apps — mention you’d pick RHF on greenfield.

### Zod (with forms)

Schema validation — pairs with RHF resolver:

```ts
const schema = z.object({ email: z.string().email() });
```

---

## Validation & types

### Zod

Runtime validation + infer TypeScript types — API boundaries, forms, env parsing.

```ts
const User = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof User>;
```

### Yup

Similar; more Formik-era. Zod wins in modern TS stacks.

---

## Routing (SPA context)

### React Router

Standard outside Next.js. In **Next**, file-based routing replaces it — say “React Router in Vite SPA; App Router in Next.”

---

## HTTP

### axios vs fetch

**fetch:** built-in, fine in Next server + client.  
**axios:** interceptors, older browsers — less critical today.

---

## Dates & utilities

- **date-fns** / **Day.js** — immutable date math (prefer over moment for new code)  
- **lodash-es** — use sparingly; native JS covers most cases now  

---

## Interview one-liner table

| Need | Library | Why |
|------|---------|-----|
| Server data | TanStack Query | cache + sync |
| Global UI state | Zustand or Redux | team size |
| Forms | React Hook Form + Zod | perf + types |
| API body validation | Zod | one schema, TS + runtime |
| Styling | Tailwind + Radix/shadcn | RSC-friendly |

Next: [UI kits & tooling →](./02-ui-and-tooling.md)
