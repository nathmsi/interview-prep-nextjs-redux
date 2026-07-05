# Tailwind CSS — Next.js & RSC integration

> App Router, Server Components, fonts, layouts, production CSS

## Learning goals

- Use Tailwind in Server and Client Components
- Wire `next/font` with Tailwind theme
- Understand content scanning and production bundle size

---

## Interview answer (30 seconds)

> Tailwind is **build-time CSS** — it works in **Server Components** because there's no JS runtime. I import **`globals.css` once** in root `layout.tsx`. **`next/font`** loads fonts optimally; I expose them as CSS variables in **`@theme`**. Production builds **purge** unused classes by scanning source files. Tailwind pairs well with RSC because there's no styled-components hydration issue.

---

## Server Components (default)

```tsx
// src/app/subjects/page.tsx — no "use client"
export default function SubjectsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
      <div className="grid gap-4 sm:grid-cols-2">…</div>
    </div>
  );
}
```

No special setup — `className` is just an HTML attribute on the server.

---

## Client Components

```tsx
"use client";

export function CounterPanel() {
  return (
    <section className="rounded-lg border p-4 dark:border-zinc-800">
      …
    </section>
  );
}
```

Interactivity needs client; Tailwind classes are identical.

---

## Root layout pattern

```tsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppNav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
```

---

## Per-route layouts

```tsx
// src/app/demo/layout.tsx
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 rounded-xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
      <p className="text-sm text-zinc-500">Demo sandbox</p>
      {children}
    </div>
  );
}
```

Layouts **nest** — child pages inherit parent layout chrome.

---

## Metadata + Tailwind (no conflict)

```tsx
export const metadata = {
  title: "Subjects",
  description: "Interview prep courses",
};
```

`metadata` is server-only export; page JSX still uses Tailwind.

---

## Content scanning (purge)

Tailwind scans your project for class strings:

- `src/**/*.{tsx,ts,jsx,js}`
- `app/**/*` if present

**Broken purge symptoms:** missing styles in production only.

**Fix dynamic classes:**

```tsx
// ❌ won't generate bg-red-500, bg-green-500
const color = "red";
<div className={`bg-${color}-500`} />

// ✅ explicit map
const bg = { red: "bg-red-500", green: "bg-green-500" } as const;
<div className={bg[color]} />
```

---

## CSS Modules + Tailwind together

```tsx
import styles from "./Chart.module.css";

<div className={`rounded-lg border p-4 ${styles.chartCanvas}`}>
  Tailwind for layout, module for complex canvas CSS
</div>
```

Valid hybrid — common for charts, maps, legacy.

---

## Third-party components

Wrap and style with Tailwind on outer shell; override inner with `[&_svg]:size-4` arbitrary selectors if needed.

---

## Verify it (this repo)

| Path | What to see |
|------|-------------|
| `src/app/layout.tsx` | fonts + globals |
| `src/components/layout/AppNav.tsx` | flex, dark:, responsive |
| `src/app/page.tsx` | grid `sm:grid-cols-2 lg:grid-cols-3` |
| `npm run build` | CSS chunk small (purged utilities) |

---

## vs CSS-in-JS in Next.js

| Tailwind | CSS-in-JS (Emotion…) |
|----------|----------------------|
| Zero runtime | runtime or compiler |
| Works in RSC | usually client-only |
| Class strings in JSX | styled components |

**Interview line:** "We picked Tailwind for RSC compatibility and fast iteration."

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Import globals in every page | root layout only |
| Client boundary for styling only | keep as Server Component |
| Prod-only missing classes | fix dynamic class strings |

---

## Pratique — Q&R

**Q : Où importer `globals.css` ?**
R : Une seule fois dans `src/app/layout.tsx` (root layout).

**Q : Redux / `useState` oblige `"use client"` — Tailwind aussi ?**
R : Non. Seul le hook/interactivité impose le client. Les classes passent en Server Component.

**Q : Styles OK en dev mais manquants en prod — cause fréquente ?**
R : Classes construites dynamiquement (`\`bg-${x}-500\``) non détectées au build.

**Q : Layout différent par section (`/demo`) ?**
R : `demo/layout.tsx` avec ses propres classes — les layouts s'empilent.
