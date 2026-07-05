# Tailwind CSS — spacing, sizing & typography

> Padding, margin, width, height, text utilities

## Learning goals

- Use the spacing scale (`p-*`, `m-*`, `gap-*`)
- Control width/height and max-width containers
- Style text with `text-*`, `font-*`, `leading-*`, `tracking-*`

---

## Interview answer (30 seconds)

> Tailwind uses a **4px-based scale**: `1` = 0.25rem, `4` = 1rem, `8` = 2rem. I use **padding** for inner space, **margin** for outer space, **gap** inside flex/grid. For typography, `text-sm` / `text-lg` set size, `font-semibold` weight, `text-zinc-600` color. **`max-w-*` + `mx-auto`** is the classic centered content column.

---

## Spacing

| Pattern | Meaning |
|---------|---------|
| `p-4` | padding all sides |
| `px-4` | padding left + right |
| `py-2` | padding top + bottom |
| `pt-6` | padding top only |
| `m-4` / `mx-auto` | margin / horizontal auto center |
| `space-y-4` | vertical margin between **children** |
| `space-x-2` | horizontal margin between children |
| `-mt-2` | negative margin (overlap tricks) |

---

## Verify it — article spacing

```tsx
<article className="space-y-6">
  <header className="space-y-3">
    <h1 className="text-3xl font-bold tracking-tight">Title</h1>
    <p className="text-lg text-zinc-600">Subtitle</p>
  </header>
  <section className="rounded-lg border p-4">Content</section>
</article>
```

---

## Sizing

| Utility | Typical use |
|---------|-------------|
| `w-full` | 100% width |
| `w-1/2` | 50% |
| `h-screen` | 100vh |
| `min-h-screen` | full viewport min height |
| `max-w-6xl` | cap content width (72rem) |
| `max-w-prose` | readable line length (~65ch) |
| `size-10` | width + height 2.5rem (square) |

```tsx
<main className="mx-auto max-w-6xl px-4 py-8">
  {children}
</main>
```

---

## Typography

| Utility | Effect |
|---------|--------|
| `text-xs` … `text-9xl` | font size scale |
| `font-normal` / `font-medium` / `font-bold` | weight |
| `leading-tight` / `leading-relaxed` | line height |
| `tracking-tight` / `tracking-wide` | letter spacing |
| `text-center` / `text-right` | alignment |
| `uppercase` / `capitalize` | transform |
| `truncate` | ellipsis overflow |
| `line-clamp-3` | max 3 lines + ellipsis |

---

## Verify it — lesson list item

```tsx
<Link className="block rounded-lg border p-4 transition hover:border-zinc-400">
  <span className="font-medium">01 — Setup with Next.js</span>
  <span className="mt-1 block text-sm text-zinc-500">
    Tailwind v4, PostCSS, globals.css
  </span>
</Link>
```

---

## Font families (Next.js + Tailwind)

```tsx
// layout.tsx — next/font
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

// globals.css
@theme inline {
  --font-sans: var(--font-geist-sans);
}

// usage
<p className="font-sans">Body text</p>
<code className="font-mono text-sm">npm run dev</code>
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `margin` on flex child instead of `gap` | prefer `gap-*` in flex/grid |
| `text-4xl` without `tracking-tight` on headings | pair for polish |
| No `px-4` on mobile full-width | content touches screen edges |

---

## Pratique — Q&R

**Q : Contenu centré avec marges sur les côtés (comme ce site) ?**
R :

```tsx
<main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
```

**Q : Espacer verticalement 4 blocs sans `margin` sur chaque enfant ?**
R : `space-y-4` sur le parent.

```tsx
<article className="space-y-6">
  <header>…</header>
  <section>…</section>
  <footer>…</footer>
</article>
```

**Q : Titre hero + sous-titre plus petit et gris ?**
R :

```tsx
<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Titre</h1>
<p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">Sous-titre</p>
```

**Q : Texte trop long qui déborde ?**
R : `truncate` (1 ligne) ou `line-clamp-2` (2 lignes max).
