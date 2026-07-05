# Tailwind CSS — responsive design

> Mobile-first breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

## Learning goals

- Apply **mobile-first** responsive utilities
- Show/hide elements per breakpoint
- Build responsive grids and typography

---

## Interview answer (30 seconds)

> Tailwind is **mobile-first**: unprefixed classes apply to **all** sizes; `md:flex` applies from **768px up**. Breakpoints are **`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536**. I design the mobile layout first, then add `sm:` / `lg:` overrides — never the reverse.

---

## Default breakpoints

| Prefix | Min width |
|--------|-----------|
| (none) | 0px — all screens |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

`md:hidden` = hidden from 768px and up. Below 768px the element is visible (unless other classes hide it).

---

## Verify it — responsive heading

```tsx
<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
  Front-end interview preparation
</h1>
```

**Expected:** `text-3xl` on phone, `text-4xl` from 640px+.

---

## Responsive layout

```tsx
<div className="flex flex-col gap-4 md:flex-row md:items-center">
  <aside className="w-full md:w-64 shrink-0">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

---

## Show / hide

| Utility | Effect |
|---------|--------|
| `hidden` | `display: none` |
| `block` / `flex` | show as block/flex |
| `sm:hidden` | hide from 640px up |
| `hidden md:block` | hidden mobile, block desktop |

```tsx
<nav className="flex md:hidden">Mobile menu button</nav>
<nav className="hidden md:flex">Desktop links</nav>
```

---

## Container

```tsx
<div className="container mx-auto px-4">
  {/* max-width follows breakpoint automatically */}
</div>
```

Or explicit: `max-w-6xl mx-auto px-4` (common in App Router layouts).

---

## Responsive grid pattern

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} />
  ))}
</div>
```

**Pattern:** start `grid-cols-1`, increase columns at larger breakpoints.

---

## max-* responsive (v4)

```tsx
<div className="w-full max-w-sm md:max-w-md lg:max-w-xl">
  Form width grows with viewport
</div>
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Desktop-first mental model | base = mobile, add `lg:` for desktop |
| `lg:hidden` without base visibility | think through all breakpoints |
| Horizontal scroll on mobile | add `px-4`, avoid fixed `w-[900px]` |

---

## Pratique — Q&R

**Q : C'est quoi `sm`, `md`, `lg` concrètement ?**
R : Des préfixes = media queries. `md:flex` = `display:flex` **à partir de 768px**. Sans préfixe = mobile d'abord.

**Q : 1 colonne mobile, 2 à partir de tablette, 3 sur grand écran ?**
R :

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
```

**Q : Menu burger visible seulement sur mobile ?**
R :

```tsx
<button className="flex md:hidden">☰</button>
<nav className="hidden md:flex gap-4">Liens desktop</nav>
```

**Q : Texte plus gros seulement sur grand écran ?**
R : `text-base lg:text-xl` — pas l'inverse (`text-xl lg:text-base` = desktop-first, à éviter).

**Q : Comment personnaliser `md` en Tailwind v4 ?**
R : Dans `globals.css` :

```css
@theme {
  --breakpoint-md: 48rem; /* 768px */
}
```

**Q : Breakpoint unique sans toucher au thème ?**
R : `min-[900px]:grid-cols-3` ou `max-[600px]:hidden`.

**Q : Sur un écran de 500px, quelles classes s'appliquent sur `hidden sm:block md:flex` ?**
R : `hidden` partout (l'élément reste caché). Pour afficher entre 640 et 767px : `hidden sm:block md:hidden`.
