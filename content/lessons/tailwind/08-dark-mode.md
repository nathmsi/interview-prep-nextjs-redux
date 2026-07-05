# Tailwind CSS — dark mode

> `dark:` variant · system preference · class strategy

## Learning goals

- Style light and dark themes with `dark:` utilities
- Understand `media` vs `class` dark mode strategies
- Integrate with Next.js and `prefers-color-scheme`

---

## Interview answer (30 seconds)

> I add **`dark:`** prefixes alongside base classes: `bg-white dark:bg-zinc-900`. Tailwind v4 defaults to **`prefers-color-scheme`** (system setting). For a **manual toggle**, switch strategy to **`class`** on `<html>` and persist choice in `localStorage`. Always pair **background + text + border** in both modes for contrast.

---

## Basic pattern

```tsx
<div className="border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
  <p className="text-zinc-600 dark:text-zinc-400">Muted text</p>
</div>
```

**Rule:** every `bg-*` should have a `dark:bg-*` partner; same for borders and body text.

---

## Verify it (this repo)

This project uses **system dark mode** via CSS in `globals.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

Plus `dark:` utilities on components (nav, cards, prose). Toggle OS dark mode and reload.

---

## Strategies

| Strategy | How it works |
|----------|--------------|
| **media** (default) | `dark:` when OS prefers dark |
| **class** | `dark:` when ancestor has `.dark` class |
| **selector** | custom selector in CSS config |

### Class strategy (user toggle)

```tsx
"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button type="button" onClick={() => setDark((d) => !d)}>
      {dark ? "Light" : "Dark"}
    </button>
  );
}
```

Enable in CSS (v4):

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

---

## Common dark mode pairs

| Light | Dark |
|-------|------|
| `bg-white` | `dark:bg-zinc-900` |
| `bg-zinc-50` | `dark:bg-zinc-900/50` |
| `text-zinc-900` | `dark:text-zinc-100` |
| `text-zinc-600` | `dark:text-zinc-400` |
| `border-zinc-200` | `dark:border-zinc-800` |
| `hover:bg-zinc-100` | `dark:hover:bg-zinc-800` |

---

## Images & logos

```tsx
<img src="/logo-light.svg" alt="" className="block dark:hidden" />
<img src="/logo-dark.svg" alt="" className="hidden dark:block" />
```

Or single SVG with `currentColor` + `text-zinc-900 dark:text-white`.

---

## Flash of wrong theme (FOUC)

**Interview topic:** with `class` strategy, inline script in `<head>` reads `localStorage` before paint to set `.dark` on `<html>`. Next.js: small script in root `layout.tsx` or `next-themes` library.

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Only `dark:bg-*`, forgot text | unreadable contrast |
| Pure `#000` / `#fff` | use zinc/slate scale for softer UI |
| `dark:` on wrong element | `dark:` applies when **media/selector** matches — test nested components |

---

## Pratique — Q&R

**Q : Carte claire en light, sombre en dark — minimum vital ?**
R :

```tsx
<div className="border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
```

**Q : Texte secondaire lisible dans les deux modes ?**
R : `text-zinc-600 dark:text-zinc-400`

**Q : Le dark mode suit l'OS — comment tester ?**
R : Réglages système (macOS/Windows) → mode sombre → recharge la page. Ce repo utilise `prefers-color-scheme`.

**Q : Toggle manuel jour/nuit — idée générale ?**
R : Classe `.dark` sur `<html>` + variante `dark:` + petit script ou lib `next-themes`.
