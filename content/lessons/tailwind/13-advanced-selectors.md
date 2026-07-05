# Tailwind CSS — advanced selectors & arbitrary values

> `group`, `peer`, `has:`, arbitrary properties, container queries

## Learning goals

- Style siblings and parents with `peer` and `has:`
- Use arbitrary values when the scale isn't enough
- Apply container queries for component-level responsiveness

---

## Interview answer (30 seconds)

> **`group`** lets children react to parent hover. **`peer`** styles a sibling based on input state (e.g. checkbox → label). **`has:`** is parent-aware — `has-[:checked]:` styles container when child is checked. **Arbitrary values** like `w-[327px]` or `grid-cols-[1fr_2fr]` escape the default scale — I promote repeats to `@theme`.

---

## group (parent state)

```tsx
<a href="/lesson" className="group block rounded-lg border p-4 hover:border-sky-400">
  <h3 className="font-medium group-hover:text-sky-700">Title</h3>
  <span className="text-zinc-500 group-hover:translate-x-1 transition-transform">
    →
  </span>
</a>
```

Named groups: `group/name` + `group-hover/name:` for nested groups.

---

## peer (sibling state)

```tsx
<input id="terms" type="checkbox" className="peer sr-only" />
<label
  htmlFor="terms"
  className="rounded-lg border p-3 peer-checked:border-sky-500 peer-checked:bg-sky-50 peer-focus-visible:ring-2"
>
  I agree
</label>
```

`peer` must be **before** the element using `peer-*` in DOM order.

---

## has: (parent selector)

```tsx
<div className="rounded-lg border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky-500">
  <input className="w-full bg-transparent outline-none" />
</div>

<article className="has-[img]:grid-cols-2 grid">
  {/* layout changes when article contains img */}
</article>
```

---

## Arbitrary values

| Syntax | Example |
|--------|---------|
| `[value]` | `w-[327px]`, `top-[117px]` |
| `[prop:value]` | `[mask-image:linear-gradient(#000,transparent)]` |
| `calc` | `w-[calc(100%-2rem)]` |
| CSS variable | `bg-[var(--hero-bg)]` |

```tsx
<div className="grid grid-cols-[240px_1fr] gap-6">Sidebar layout</div>
```

**Caution:** dynamic `w-[${width}px]` in JS won't be in CSS output unless safelisted.

---

## Arbitrary variants

```tsx
<div className="[&>p]:text-sm [&>p]:text-zinc-600">
  <p>Child styled from parent</p>
</div>
```

Useful for markdown/HTML you don't control (prose wrappers).

---

## Container queries

```css
@theme {
  --container-card: 20rem;
}
```

```tsx
<div className="@container">
  <div className="flex flex-col @sm:flex-row @md:gap-6">
    {/* responds to container width, not viewport */}
  </div>
</div>
```

**Interview:** container queries fix **card in narrow sidebar** problems where `md:` is too coarse.

---

## @layer utilities — one-off

```css
@layer utilities {
  .scrollbar-thin {
    scrollbar-width: thin;
  }
}
```

---

## Verify it — accordion header

```tsx
<button
  type="button"
  className="flex w-full items-center justify-between rounded-lg border p-4 text-left [&[aria-expanded=true]]:border-sky-400"
  aria-expanded={open}
>
  Section
</button>
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `peer` after label | put `peer` element first |
| Overusing arbitrary values | add theme token |
| `group-hover` without `group` on parent | add `group` class |

---

## Pratique — Q&R

**Q : Styliser le label quand la checkbox est cochée ?**
R : `peer` sur l'input, `peer-checked:bg-sky-50` sur le label (input **avant** le label dans le DOM).

**Q : Flèche qui bouge quand on survole la carte ?**
R : `group` sur `<a>`, `group-hover:translate-x-1 transition-transform` sur la flèche.

**Q : Grille sidebar 240px + contenu flexible ?**
R : `grid grid-cols-[240px_1fr] gap-6`

**Q : Largeur exacte une seule fois ?**
R : `w-[327px]`. Si répété → token dans `@theme`.
