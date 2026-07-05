# Tailwind CSS — theme & customization

> `@theme`, CSS variables, design tokens, extending the default scale

## Learning goals

- Customize colors, fonts, spacing via `@theme` (v4)
- Bridge CSS variables with Tailwind utilities
- Know when to extend theme vs use arbitrary values

---

## Interview answer (30 seconds)

> In Tailwind v4, theme lives in **CSS** with **`@theme`**. I define brand colors as CSS variables and map them to utilities like `bg-brand` or `text-foreground`. This keeps **one source of truth** for design tokens. For one-offs I use **arbitrary values** `w-[327px]` sparingly — repeated arbitrary values should become theme tokens.

---

## @theme inline (this repo)

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Usage:

```tsx
<body className="bg-background text-foreground font-sans" />
```

---

## Adding brand colors

```css
@theme {
  --color-brand-50: oklch(97% 0.02 250);
  --color-brand-600: oklch(55% 0.2 250);
  --color-brand-700: oklch(45% 0.2 250);
}
```

```tsx
<button className="bg-brand-600 hover:bg-brand-700 text-white">CTA</button>
```

---

## Spacing / radius extensions

```css
@theme {
  --spacing-18: 4.5rem;
  --radius-xl: 1rem;
}
```

```tsx
<div className="p-18 rounded-xl">Custom tokens</div>
```

---

## Verify it

Open `src/app/globals.css` — confirm `@theme inline` maps `--background` / `--foreground`. Change `--foreground` and reload; text color should update where `text-foreground` is used.

---

## @layer for custom CSS

```css
@layer base {
  h1 { @apply text-2xl font-bold tracking-tight; }
}

@layer components {
  .prose-zinc a { @apply text-sky-700 underline; }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
}
```

**Interview:** light `@apply` in `@layer base` OK; don't `@apply` entire components.

---

## Plugins (v4 overview)

v4 favors CSS-first; JS plugins still exist for complex extensions. Mention familiarity with:

- `@tailwindcss/forms` — better default form styles
- `@tailwindcss/typography` — `prose` class for markdown content

---

## Design system integration

| Approach | When |
|----------|------|
| `@theme` tokens | company brand colors, spacing |
| CSS variables from Figma | sync with design tool |
| shadcn/ui | copies components using CSS variables + Tailwind |

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Hardcoded hex in 50 components | promote to `@theme` |
| Duplicating `:root` and `@theme` | single chain of variables |
| Arbitrary value for `text-[#1a1a1a]` everywhere | add `--color-muted` token |

---

## Pratique — Q&R

**Q : Ajouter une couleur `brand` utilisable en `bg-brand` ?**
R :

```css
@theme {
  --color-brand: oklch(55% 0.2 250);
  --color-brand-dark: oklch(45% 0.2 250);
}
```

```tsx
<button className="bg-brand hover:bg-brand-dark text-white">CTA</button>
```

**Q : Où mettre les tokens dans ce repo ?**
R : `src/app/globals.css` — bloc `@theme inline { … }`.

**Q : `@apply` — oui ou non ?**
R : OK pour des resets globaux (`@layer base`). Évite d'`@apply` tout un composant — extrais un composant React.

**Q : J'utilise `w-[327px]` partout — problème ?**
R : Oui, répétition. Crée un token `--spacing-sidebar: 327px` ou une classe `@layer utilities`.
