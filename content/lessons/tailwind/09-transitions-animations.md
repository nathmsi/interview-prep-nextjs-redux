# Tailwind CSS — transitions & animations

> `transition`, `duration`, `ease`, `animate-*`, reduced motion

## Learning goals

- Add smooth hover/focus transitions
- Use built-in animations (`spin`, `pulse`, `bounce`)
- Respect `prefers-reduced-motion`

---

## Interview answer (30 seconds)

> I use **`transition-colors`** or **`transition-all`** with **`duration-200`** and **`ease-in-out`** for micro-interactions. Built-in **`animate-spin`** is standard for loading spinners. For accessibility I add **`motion-reduce:transition-none`** or **`motion-reduce:animate-none`** so users with vestibular disorders aren't affected.

---

## Transition basics

| Utility | Effect |
|---------|--------|
| `transition` | transition common properties |
| `transition-colors` | color, background, border |
| `transition-opacity` | opacity only |
| `transition-transform` | transform only |
| `duration-150` / `duration-300` | timing |
| `ease-in` / `ease-out` / `ease-in-out` | easing |
| `delay-150` | delay before start |

```tsx
<button
  type="button"
  className="rounded-lg bg-sky-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-sky-700"
>
  Hover me
</button>
```

---

## Transform + transition

```tsx
<div className="transition-transform duration-200 hover:scale-105 active:scale-95">
  Card lifts on hover
</div>
```

| Utility | Effect |
|---------|--------|
| `scale-95` / `scale-105` | zoom |
| `rotate-45` | rotation |
| `translate-x-2` | shift |
| `opacity-0` → `opacity-100` | fade (pair with transition) |

---

## Built-in animations

| Class | Effect |
|-------|--------|
| `animate-spin` | continuous rotation (loaders) |
| `animate-ping` | radar ping |
| `animate-pulse` | skeleton shimmer |
| `animate-bounce` | bounce |

```tsx
function Spinner() {
  return (
    <span
      className="inline-block size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900"
      aria-hidden
    />
  );
}
```

---

## Verify it — link underline

```tsx
<Link
  href="/subjects"
  className="text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
>
  Browse subjects
</Link>
```

---

## Reduced motion

```tsx
<div className="transition-transform duration-500 motion-reduce:transition-none hover:translate-y-[-2px]">
  Respects user OS setting
</div>
```

---

## Custom keyframes (v4 CSS)

```css
@import "tailwindcss";

@theme {
  --animate-fade-in: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

```tsx
<div className="animate-fade-in">Enter</div>
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `transition-all` everywhere | prefer specific `transition-colors` |
| Long `duration-1000` on buttons | 150–300ms feels snappy |
| Animating `width`/`height` | prefer `transform` / `opacity` for performance |

---

## Pratique — Q&R

**Q : Hover fluide sur la couleur de fond ?**
R :

```tsx
className="bg-sky-600 transition-colors duration-200 hover:bg-sky-700"
```

**Q : Spinner de chargement ?**
R :

```tsx
<span className="inline-block size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
```

**Q : Carte qui grossit légèrement au survol ?**
R :

```tsx
className="transition-transform duration-200 hover:scale-105"
```

**Q : Respecter "réduire les animations" de l'OS ?**
R : `motion-reduce:transition-none` ou `motion-reduce:animate-none`.
