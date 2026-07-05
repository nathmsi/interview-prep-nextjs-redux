# Tailwind CSS — interview Q&A recap

> Cheat sheet for technical interviews — React & Next.js context

---

## What is Tailwind and why use it?

**Answer:** Utility-first CSS framework. Compose small classes in JSX instead of writing custom CSS files. **Pros:** speed, consistent design scale, small production CSS (purge), great DX with React. **Cons:** verbose markup, learning curve, needs discipline for readability.

---

## How does Tailwind work with Next.js?

**Answer:** PostCSS plugin scans source at **build time**, generates CSS, no runtime. Import in `globals.css`, use `className` on components. Works in **Server Components** — no hydration styling bugs unlike many CSS-in-JS libs.

---

## Tailwind v3 vs v4?

**Answer:** v4 is **CSS-first**: `@import "tailwindcss"`, `@theme` in CSS instead of heavy `tailwind.config.js`. PostCSS plugin `@tailwindcss/postcss`. Smaller config surface, faster builds.

---

## Utility-first vs CSS Modules vs CSS-in-JS?

| Approach | Best for |
|----------|----------|
| Tailwind | fast UI, design system via tokens, startups/teams |
| CSS Modules | scoped component CSS, no utility noise |
| CSS-in-JS | dynamic styles from props (less popular post-RSC) |

**Strong answer:** "I'd pick Tailwind for app UI velocity; Modules for isolated complex widgets; avoid runtime CSS-in-JS in RSC-heavy apps."

---

## How do you keep JSX readable with long class strings?

**Answer:** Extract **React components** with variant props; use `cn()` / `clsx` + `tailwind-merge`; group classes logically; avoid massive `@apply` blocks.

---

## What is mobile-first in Tailwind?

**Answer:** Unprefixed = all sizes. `md:` applies from 768px **up**. Design mobile base, add breakpoints for larger screens.

---

## How do you implement dark mode?

**Answer:** `dark:` variant on utilities. **Media strategy** follows OS `prefers-color-scheme`. **Class strategy** puts `.dark` on `<html>` for user toggle — needs anti-FOUC script or `next-themes`.

---

## Dynamic class names pitfall?

**Answer:** `bg-${color}-500` won't be purged/generated. Use explicit maps, full class strings, or safelist in config.

---

## What are group and peer?

**Answer:** `group` — style children based on parent state (`group-hover:`). `peer` — style sibling based on prior sibling state (`peer-checked:` on label after checkbox).

---

## Performance concerns?

**Answer:** Production CSS is small (only used utilities). Prefer `transition-colors`/`transform` over layout-thrashing properties. No JS runtime cost. Build scan time grows with monorepo — configure content paths.

---

## Accessibility with Tailwind?

**Answer:** `focus-visible:ring-2`, don't remove focus without replacement, `sr-only` for screen readers, check contrast on `text-zinc-*` pairs, min touch targets `min-h-11`.

---

## When would you NOT use Tailwind?

**Answer:** Heavy email templates (inline CSS), environment with zero build step, team strongly opposed, content sites where `@tailwindcss/typography` prose isn't enough and custom editorial CSS is huge.

---

## shadcn/ui connection?

**Answer:** Copy-paste components built on **Radix + Tailwind + CSS variables**. Full ownership in repo — not an npm black box. Common interview stack with Next.js.

---

## Quick fire — complete the utility

| I want… | Utility |
|---------|---------|
| Flex row, centered | `flex items-center` |
| 2-col grid, gap 1rem | `grid grid-cols-2 gap-4` |
| Hide on mobile, show desktop | `hidden md:block` |
| Keyboard focus ring | `focus-visible:ring-2 focus-visible:ring-sky-500` |
| Truncate long text | `truncate` or `line-clamp-2` |
| Full viewport height | `min-h-screen` |
| Centered max-width page | `mx-auto max-w-6xl px-4` |

---

## Pratique — Q&R (auto-évaluation)

**Q : Pourquoi Tailwind plutôt que CSS-in-JS avec Next.js RSC ?**
R : Zéro runtime, pas de problème d'hydratation styles, classes OK en Server Components.

**Q : Comment tu gardes le JSX lisible ?**
R : Composants réutilisables, prop `variant`, `cn()` — pas 40 classes inline partout.

**Q : Mobile-first en une phrase ?**
R : Style la base sans préfixe, ajoute `sm:` / `md:` / `lg:` pour les écrans plus larges.

**Q : shadcn/ui c'est quoi ?**
R : Composants copiés dans ton repo (Radix + Tailwind + variables CSS), pas une lib npm fermée.

**Q : Défi — écris les classes pour :** carte centrée, max 1152px, padding horizontal, grille 1→2→3 colonnes, dark mode.
R :

```tsx
<main className="mx-auto max-w-6xl px-4 py-8">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <article className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      …
    </article>
  </div>
</main>
```

---

## Practice in this repo

1. Read [01 — Setup](./01-setup-nextjs.md) and inspect `globals.css`
2. Open `/subjects/tailwind` in the browser
3. Pick a component in `src/components/` and name every Tailwind utility you see
4. Compare with [CSS styling libraries](../css/02-styling-libraries.md)

---

## Related subjects

- [CSS interview Q&A](../css/01-interview-questions.md)
- [Next.js layouts & metadata](../nextjs/06-layouts-loading-errors.md)
- [React Server vs Client](../nextjs/03-server-client-components.md)
