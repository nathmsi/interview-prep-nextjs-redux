# Tailwind CSS — setup with Next.js

> **Tailwind v4** · **Next.js 16** · **React 19** · Course only

## Learning goals

- Install and wire Tailwind in a Next.js App Router project
- Understand zero-runtime CSS (build-time only)
- Know where global styles live vs component `className`

---

## Interview answer (30 seconds)

> Tailwind is a **utility-first** CSS framework. In Next.js we add the PostCSS plugin, import Tailwind in `globals.css`, and use `className` on React components. **No runtime** — classes are scanned at build time and unused utilities are dropped. It works in **Server and Client Components** because styling is plain CSS classes.

---

## Verify it (this repo)

```bash
npm run dev
# open http://localhost:3000 — cards use rounded-xl, grid, dark: variants
```

**Files to inspect:**

- `package.json` — `tailwindcss`, `@tailwindcss/postcss`
- `postcss.config.mjs` — Tailwind PostCSS plugin
- `src/app/globals.css` — `@import "tailwindcss";`
- `src/app/layout.tsx` — imports `globals.css` once at root

---

## Tailwind v4 setup (this repo)

### 1. Dependencies

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

### 2. PostCSS config

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### 3. Global CSS entry

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
}
```

### 4. Import in root layout

```tsx
// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Rule:** import `globals.css` **once** in the root `layout.tsx`, not in every page.

---

## v3 vs v4 (interview note)

| v3 | v4 |
|----|-----|
| `tailwind.config.js` + `content: []` | CSS-first: `@import "tailwindcss"` |
| `@tailwind base/components/utilities` | Single `@import` |
| `theme.extend` in JS | `@theme` in CSS |

---

## First component

```tsx
export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{children}</div>
    </article>
  );
}
```

Works in **Server Components** (no `"use client"` needed).

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Forgot `globals.css` import | No utilities apply |
| Dynamic class strings `bg-${color}-500` | Tailwind can't scan — use full class names or safelist |
| Duplicate global imports | Import only in root layout |

---

## Pratique — Q&R

**Q : Où j'installe Tailwind dans un projet Next.js ?**
R : `npm install tailwindcss @tailwindcss/postcss postcss`, puis `@import "tailwindcss"` dans `globals.css`, importé une fois dans `layout.tsx`.

**Q : Est-ce que Tailwind marche dans un Server Component ?**
R : Oui. `className` = classes CSS statiques, pas de JS runtime.

```tsx
// Pas besoin de "use client"
export function Badge() {
  return <span className="rounded-full bg-zinc-200 px-2 text-xs">New</span>;
}
```

**Q : Mes classes Tailwind ne s'appliquent pas — je vérifie quoi en premier ?**
R : 1) `globals.css` importé dans le root layout 2) PostCSS config 3) pas de faute de frappe dans `className`.

**Q : Quelle différence entre Tailwind v3 et v4 ?**
R : v4 = config en CSS (`@import "tailwindcss"`, `@theme`) au lieu d'un gros `tailwind.config.js`.
