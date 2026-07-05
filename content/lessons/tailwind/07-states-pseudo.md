# Tailwind CSS — states & pseudo-classes

> `hover:`, `focus:`, `active:`, `disabled:`, structural pseudo-classes

## Learning goals

- Style interactive states without custom CSS
- Use `focus-visible` for keyboard accessibility
- Target children order with `first:`, `last:`, `odd:`

---

## Interview answer (30 seconds)

> State variants prefix utilities: **`hover:bg-zinc-800`**, **`focus-visible:ring-2`**, **`disabled:opacity-50`**. I prefer **`focus-visible`** over `focus` so mouse clicks don't show ugly rings. For lists I use **`first:`** / **`last:`** / **`odd:`** instead of manual class names in `.map()`.

---

## Interactive states

| Variant | When |
|---------|------|
| `hover:` | pointer over element |
| `focus:` | element has focus |
| `focus-visible:` | keyboard focus (preferred) |
| `active:` | while clicking |
| `disabled:` | disabled form controls |
| `visited:` | visited links |

```tsx
<button
  type="button"
  className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
  disabled={isLoading}
>
  {isLoading ? "Saving…" : "Save"}
</button>
```

---

## Verify it — nav link

```tsx
<Link
  href="/subjects"
  className="rounded-md px-2.5 py-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
>
  Subjects
</Link>
```

---

## Group hover (parent → child)

```tsx
<article className="group rounded-lg border p-4 hover:border-sky-400">
  <h3 className="text-zinc-900 group-hover:text-sky-700">Title</h3>
  <p className="text-zinc-500 group-hover:text-zinc-700">…</p>
</article>
```

Parent has `group`, children use `group-hover:*`.

---

## Structural pseudo-classes

| Variant | Targets |
|---------|---------|
| `first:` | first child |
| `last:` | last child |
| `only:` | only child |
| `odd:` / `even:` | zebra rows |
| `empty:` | no children |

```tsx
<ul>
  {items.map((item) => (
    <li
      key={item.id}
      className="border-b border-zinc-200 px-3 py-2 last:border-b-0 odd:bg-zinc-50"
    >
      {item.label}
    </li>
  ))}
</ul>
```

---

## ARIA state variants

```tsx
<button
  aria-pressed={isOn}
  className="rounded-lg border px-3 py-1 aria-pressed:bg-sky-600 aria-pressed:text-white"
>
  Toggle
</button>
```

Also: `aria-disabled:`, `aria-checked:`, `data-[state=open]:` (Radix/shadcn pattern).

---

## Stacking variants

Order in class string doesn't matter — Tailwind generates correct specificity:

```tsx
className="bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 md:px-6"
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `focus:` on all clicks | use `focus-visible:` |
| Hover-only affordances | duplicate for keyboard (`focus-visible:`) |
| `disabled` attribute missing | `disabled:` classes won't apply |

---

## Pratique — Q&R

**Q : Lien qui change au survol ?**
R :

```tsx
<a className="text-zinc-600 hover:text-sky-700 hover:underline">Lire</a>
```

**Q : Bouton désactivé pendant le chargement ?**
R :

```tsx
<button disabled={loading} className="… disabled:cursor-not-allowed disabled:opacity-50">
  {loading ? "…" : "Valider"}
</button>
```

**Q : Pourquoi `focus-visible` plutôt que `focus` ?**
R : `focus` montre l'anneau au clic souris aussi. `focus-visible` = surtout clavier (meilleure UX).

**Q : Toute la carte réagit au hover, pas juste le titre ?**
R : `group` sur le parent + `group-hover:text-sky-700` sur l'enfant.
