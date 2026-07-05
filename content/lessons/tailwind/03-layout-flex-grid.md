# Tailwind CSS — Flexbox & Grid

> Layout utilities for React components

## Learning goals

- Build nav bars, cards, and dashboards with `flex` and `grid`
- Control alignment, wrapping, and gaps
- Combine layout with responsive prefixes

---

## Interview answer (30 seconds)

> For **1D layouts** (row or column) I use **flex** — `flex`, `items-center`, `justify-between`, `gap-4`. For **2D layouts** (rows and columns together) I use **grid** — `grid`, `grid-cols-3`, `gap-6`. Tailwind mirrors CSS property names, so if you know Flexbox/Grid in CSS, you know Tailwind layout.

---

## Flexbox cheat sheet

| Utility | Effect |
|---------|--------|
| `flex` | flex container |
| `flex-col` | column direction |
| `flex-row` | row (default) |
| `flex-wrap` | wrap items |
| `flex-1` | `flex: 1 1 0%` — grow to fill |
| `shrink-0` | don't shrink (icons, avatars) |
| `items-center` | cross-axis center |
| `items-start` / `items-end` | cross-axis align |
| `justify-center` | main-axis center |
| `justify-between` | space between |
| `gap-2` / `gap-4` | gap between children |

---

## Verify it — header nav (this repo pattern)

```tsx
<nav className="border-b border-zinc-200 dark:border-zinc-800">
  <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
    <Link href="/" className="font-semibold">Home</Link>
    <ul className="flex flex-1 flex-wrap gap-1 text-sm">
      <li><Link href="/subjects">Subjects</Link></li>
    </ul>
  </div>
</nav>
```

---

## Grid cheat sheet

| Utility | Effect |
|---------|--------|
| `grid` | grid container |
| `grid-cols-1` | 1 column |
| `grid-cols-2` | 2 equal columns |
| `grid-cols-3` | 3 equal columns |
| `col-span-2` | span 2 columns |
| `row-span-2` | span 2 rows |
| `gap-4` | grid gap |

---

## Verify it — subject cards grid

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {subjects.map((s) => (
    <SubjectCard key={s.id} subject={s} />
  ))}
</div>
```

**Expected:** 1 column on mobile, 2 on `sm`, 3 on `lg`.

---

## Flex vs Grid — when to pick

| Use flex | Use grid |
|----------|----------|
| Toolbar, nav, button groups | Card galleries, dashboards |
| Single row/column with uneven items | Equal columns, complex areas |
| `justify-between` for header | `grid-cols-12` for page shells |

---

## Centering patterns

```tsx
{/* Flex center — modal overlay */}
<div className="flex min-h-screen items-center justify-center">
  <dialog className="rounded-xl p-6">…</dialog>
</div>

{/* Grid center — single child */}
<div className="grid min-h-40 place-items-center">
  <span>Centered</span>
</div>
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `flex` on parent forgotten | Children won't flex |
| `w-full` missing on grid child | column may not stretch |
| Only `grid-cols-3` on mobile | add `grid-cols-1` default, responsive up |

---

## Pratique — Q&R

**Q : Navbar : logo à gauche, liens à droite — quelles classes ?**
R :

```tsx
<header className="flex items-center justify-between px-4 py-3">
  <Logo />
  <nav className="flex gap-4">…</nav>
</header>
```

**Q : 3 cartes côte à côte sur desktop, 1 colonne sur mobile ?**
R :

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  <Card /><Card /><Card />
</div>
```

**Q : Flex ou Grid pour un formulaire label + input ?**
R : Flex en colonne (`flex flex-col gap-1`) — c'est du layout 1D.

**Q : L'icône se compresse quand le texte est long — fix ?**
R : `shrink-0` sur l'icône, `flex-1 min-w-0` sur le texte si truncate.
