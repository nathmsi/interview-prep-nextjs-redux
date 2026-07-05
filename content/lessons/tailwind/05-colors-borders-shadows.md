# Tailwind CSS — colors, borders & shadows

> Backgrounds, text color, borders, rings, opacity, gradients

## Learning goals

- Use the color palette (`zinc`, `sky`, `amber`, …)
- Style borders, outlines, and focus rings
- Apply shadows and opacity for depth and hierarchy

---

## Interview answer (30 seconds)

> Tailwind colors follow **`{property}-{palette}-{shade}`** — e.g. `bg-sky-600`, `text-zinc-500`, `border-amber-200`. Shades run **50–950** (lighter to darker). For focus states I use **`ring-*`** instead of outline hacks. **`dark:`** prefix swaps colors in dark mode. Semantic tokens can be added via `@theme` (brand colors).

---

## Color utilities

| Prefix | Applies to |
|--------|------------|
| `bg-*` | background |
| `text-*` | text color |
| `border-*` | border color |
| `ring-*` | box-shadow ring (focus) |
| `fill-*` / `stroke-*` | SVG |
| `from-*` / `to-*` / `via-*` | gradients |

```tsx
<span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-800 dark:bg-sky-950 dark:text-sky-200">
  Course only
</span>
```

---

## Borders

| Utility | Effect |
|---------|--------|
| `border` | 1px all sides |
| `border-2` | 2px |
| `border-t` | top only |
| `border-zinc-200` | color |
| `rounded-lg` | border-radius |
| `rounded-full` | pill / circle |
| `divide-y` | borders **between** children |

```tsx
<ul className="divide-y divide-zinc-200 rounded-lg border dark:divide-zinc-800">
  <li className="p-3">Item 1</li>
  <li className="p-3">Item 2</li>
</ul>
```

---

## Shadows & rings

| Utility | Use |
|---------|-----|
| `shadow-sm` | subtle card |
| `shadow-lg` | elevated modal |
| `shadow-none` | remove shadow |
| `ring-2 ring-sky-500` | focus ring |
| `ring-offset-2` | gap between element and ring |

```tsx
<button className="rounded-lg bg-white shadow-sm ring-1 ring-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
  Click
</button>
```

---

## Opacity & gradients

```tsx
{/* Overlay */}
<div className="bg-black/50">50% black</div>

{/* Gradient hero */}
<div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-8">
  Hero
</div>
```

---

## Verify it — alert box (this repo pattern)

```tsx
<section className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
  <h2 className="font-semibold text-amber-900 dark:text-amber-100">Exercise</h2>
  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">…</p>
</section>
```

---

## Palette choice (interview)

- **zinc/slate/neutral** — UI chrome, text
- **sky/blue** — links, primary actions
- **amber/yellow** — warnings
- **red/rose** — errors
- **green/emerald** — success

Stick to **one neutral + one accent** per app for consistency.

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `text-white` on `bg-yellow-200` | poor contrast — check a11y |
| `border` without color | invisible on white — add `border-zinc-200` |
| `outline` + `ring` doubled | use `focus:outline-none focus-visible:ring-2` |

---

## Pratique — Q&R

**Q : Bouton primaire bleu avec hover ?**
R :

```tsx
<button className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">
  Envoyer
</button>
```

**Q : Carte avec bordure légère et ombre ?**
R :

```tsx
<div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
  …
</div>
```

**Q : Badge "warning" jaune ?**
R :

```tsx
<span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
  Attention
</span>
```

**Q : Anneau de focus accessible au clavier ?**
R :

```tsx
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
```
