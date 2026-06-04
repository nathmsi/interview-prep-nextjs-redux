# CSS — styling libraries & approaches

> **Interview angle** — compare tools, tradeoffs, React/Next integration

---

## Native CSS + design tokens

**What:** plain CSS, CSS variables, layers (`@layer`).

**When:** maximum control, design system owned in-house, no build step for styles.

**Interview line:** “We use CSS variables for theming and keep components small; Tailwind optional for speed.”

```css
:root {
  --color-brand: oklch(55% 0.2 250);
}
.button {
  background: var(--color-brand);
}
```

---

## Tailwind CSS

**What:** utility-first classes (`flex`, `p-4`, `dark:bg-zinc-900`).

**Why teams pick it:** fast UI, consistent spacing scale, purge unused classes in production, great with Next.js.

**Tradeoffs:** verbose JSX/HTML; learning curve; need discipline for readability.

```tsx
<button
  type="button"
  className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
>
  Submit
</button>
```

**Next.js:** PostCSS plugin; no runtime cost. **This repo** uses Tailwind v4.

**Interview:** “Utilities colocate style with markup; design tokens via `theme` config.”

---

## CSS Modules

**What:** `Button.module.css` — scoped class names at build time.

**Why:** avoid global collisions without CSS-in-JS runtime.

```tsx
import styles from "./Button.module.css";

export function Button() {
  return <button className={styles.primary}>OK</button>;
}
```

**Next.js:** built-in support for `*.module.css`. Default choice for component libraries in App Router.

---

## Sass / SCSS

**What:** variables, nesting, mixins (mostly replaced by modern CSS).

**When:** legacy codebases; new projects often skip for CSS variables + PostCSS.

---

## CSS-in-JS (styled-components, Emotion, Stitches)

**What:** styles in JS/TS, often tied to props.

**Why:** dynamic theming, co-location with React.

**Tradeoffs (2024+):** runtime or compiler cost; **RSC** complicates — styles must run on client or via compiler. Many teams moved to Tailwind or Modules.

**Interview:** “Know why SSR/RSC pushed teams toward zero-runtime CSS.”

---

## Component libraries with CSS built-in

| Library | Style model | Interview note |
|---------|-------------|----------------|
| **shadcn/ui** | Tailwind + Radix primitives — copy into repo | Full control, accessible |
| **MUI** | Emotion / own system | Fast enterprise UI |
| **Chakra** | style props | DX-friendly |
| **Radix** | unstyled a11y primitives | Pair with Tailwind |

**shadcn pattern (very common in Next interviews):**

```tsx
// components/ui/button.tsx — you own the file
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium",
        className
      )}
      {...props}
    />
  );
}
```

---

## Utility: `clsx` / `classnames` / `cn` (tailwind-merge)

Merge class names safely — avoid conflicting Tailwind utilities.

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## How to answer “which would you use?”

1. **Team & design system** — existing MUI vs greenfield Tailwind  
2. **Performance** — prefer zero-runtime on server-heavy apps  
3. **A11y** — Radix/shadcn for primitives  
4. **Next App Router** — CSS Modules + Tailwind are the safest default story  

---

## Quick checklist

- Tailwind = utilities, build-time purge  
- CSS Modules = scoped files, no runtime  
- CSS-in-JS = powerful but watch RSC/hydration  
- shadcn = Radix + Tailwind you own  
- Always mention **a11y** (`focus-visible`, Radix) with UI libraries
