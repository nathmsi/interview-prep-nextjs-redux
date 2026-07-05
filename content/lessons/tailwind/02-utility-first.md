# Tailwind CSS — utility-first fundamentals

> **Tailwind v4** · React `className`

## Learning goals

- Read utility classes as design tokens (`p-4` = padding 1rem)
- Prefer utilities over one-off custom CSS
- Merge classes safely in React components

---

## Interview answer (30 seconds)

> Utility-first means **small, single-purpose classes** map to CSS properties. Instead of writing `.card { padding: 1rem; border-radius: … }`, I compose `rounded-xl p-4 border`. Benefits: consistent spacing scale, fast iteration, purge unused CSS. Tradeoff: verbose JSX — I extract repeated patterns into React components, not giant `@apply` blocks.

---

## How utilities map to CSS

| Utility | CSS equivalent |
|---------|----------------|
| `flex` | `display: flex` |
| `items-center` | `align-items: center` |
| `gap-4` | `gap: 1rem` (4 × 0.25rem) |
| `text-sm` | `font-size: 0.875rem` |
| `font-medium` | `font-weight: 500` |
| `rounded-lg` | `border-radius: 0.5rem` |

**Spacing scale:** number × `0.25rem` → `p-4` = `1rem`, `mt-6` = `1.5rem`.

---

## Verify it — compose a button

```tsx
<button
  type="button"
  className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
>
  Save
</button>
```

**Expected in DevTools:** each class resolves to one CSS rule; no separate `.btn` stylesheet.

---

## React: always `className`, not `class`

```tsx
// ✅ React / Next.js
<div className="flex gap-2" />

// ❌ HTML attribute — wrong in JSX
<div class="flex gap-2" />
```

---

## Merging classes (variants, props)

Tailwind has **no native merge** — last duplicate utility wins only if both exist in CSS order. Use a helper:

```tsx
type Props = { className?: string; children: React.ReactNode };

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Panel({ className, children }: Props) {
  return (
    <section className={cn("rounded-lg border p-4", className)}>
      {children}
    </section>
  );
}

// Usage
<Panel className="border-amber-300 bg-amber-50">…</Panel>
```

**Interview:** mention `clsx` + `tailwind-merge` in production for conflict resolution (`p-2` vs `p-4`).

---

## When NOT to use utilities

- Complex animations tied to many keyframes → small CSS file or `@keyframes` in CSS
- Third-party widget you can't edit → wrap + scope
- **Don't** `@apply` entire component styles — loses purge benefits

---

## Readability tips

1. **Group mentally:** layout → spacing → typography → color → states
2. **Extract components** when the same 8+ classes repeat
3. **Line breaks** in JSX for long `className` strings

```tsx
className={[
  "flex items-center gap-2",
  "rounded-lg px-4 py-2",
  "bg-sky-600 text-white",
  "hover:bg-sky-700",
].join(" ")}
```

---

## Pratique — Q&R

**Q : Comment centrer un bouton horizontalement et verticalement ?**
R :

```tsx
<div className="flex items-center justify-center min-h-40">
  <button className="rounded-lg bg-sky-600 px-4 py-2 text-white">OK</button>
</div>
```

**Q : `class` ou `className` en React ?**
R : Toujours `className`. `class` est réservé au mot-clé JS.

**Q : J'ai `p-2` et `p-4` sur le même élément — lequel gagne ?**
R : Celui qui apparaît **en dernier** dans le CSS généré, pas forcément dans ta chaîne JSX. En prod, utilise `cn()` + `tailwind-merge`.

**Q : Quand extraire un composant au lieu d'empiler des classes ?**
R : Quand le même bloc de 8+ classes se répète 3 fois (Button, Card, Badge…).
