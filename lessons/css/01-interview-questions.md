# CSS — interview Q&A

> **Modern CSS** · Layout, specificity, responsive design, performance

Course only — answers you can give in a front-end interview (often paired with React/Next).

---

## Verify it — flexbox in DevTools

Create a `div` with `display:flex`, `justify-content:center`, `align-items:center`, fixed height 200px — child centers visually.

---

## Box model & layout

**Q: content-box vs border-box?**  
A: `content-box`: width/height apply to content only (padding/border add outside). `border-box`: width includes padding and border — easier layouts. Global reset often sets `box-sizing: border-box`.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

**Q: Flexbox — main axis vs cross axis?**  
A: `flex-direction` sets main axis. `justify-content` aligns on main; `align-items` on cross. `flex: 1` is shorthand for `flex-grow: 1`, `flex-shrink: 1`, `flex-basis: 0%` (common "fill space" pattern).

**Q: Grid vs Flexbox?**  
A: Flex: one-dimensional rows **or** columns, content-driven flow. Grid: two-dimensional tracks, explicit rows/columns. Use grid for page shells; flex for toolbars, nav items, card rows.

```css
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100dvh;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
```

---

## Specificity & cascade

**Q: How is specificity calculated?**  
A: Inline styles > IDs > classes/attributes/pseudo-classes > elements/pseudo-elements. `!important` beats normal rules in the same origin; later rules win if equal.

**Q: :where() vs :is()?**  
A: `:is()` takes the specificity of its most specific selector. `:where()` has zero specificity — good for resets that shouldn't bump specificity.

```css
:where(h1, h2, h3) {
  margin-block: 0;
}
```

---

## Positioning & stacking

**Q: position values?**  
A: `static` (default), `relative` (offset without leaving flow), `absolute` (relative to positioned ancestor), `fixed` (viewport), `sticky` (hybrid until threshold).

**Q: z-index not working?**  
A: Needs positioned/flex/grid child + stacking context. New context from `opacity < 1`, `transform`, `filter`, `isolation: isolate`, etc.

---

## Responsive design

**Q: Mobile-first?**  
A: Base styles for small screens; `min-width` media queries add complexity up. Prefer `rem`/`em` for typography; `%`/`fr`/`clamp()` for fluid layout.

```css
.hero-title {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

@media (min-width: 768px) {
  .sidebar {
    display: block;
  }
}
```

**Q: container queries?**  
A: Style by **parent** size, not viewport — `@container` + `container-type: inline-size`. Great for reusable cards in unknown layouts.

```css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}
```

---

## Modern units

**Q: dvh vs vh?**  
A: `100vh` on mobile can include browser chrome bugs. `dvh` (dynamic viewport height) adjusts when UI bars show/hide — better full-screen mobile layouts.

**Q: logical properties?**  
A: `margin-inline`, `padding-block`, `inset-inline-start` — map to physical sides based on writing mode (RTL/LTR).

---

## Typography & color

**Q: rem vs em?**  
A: `rem` = root font size (predictable). `em` = parent font size (compounds in nested components).

**Q: OKLCH / modern colors?**  
A: Perceptually uniform; easier palettes than hex alone. `color-mix()` blends in a given color space.

```css
:root {
  --brand: oklch(55% 0.2 250);
  --surface: color-mix(in oklch, var(--brand) 8%, white);
}
```

---

## Animations & performance

**Q: properties safe to animate?**  
A: Prefer `transform` and `opacity` (compositor-friendly). Animating `width`, `top`, `margin` triggers layout — jank on mobile.

**Q: will-change?**  
A: Hints upcoming animation; use sparingly on few elements — overuse wastes memory.

**Q: prefers-reduced-motion?**  
A: Respect accessibility — reduce or disable motion.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## CSS in React / Next interviews

**Q: CSS Modules?**  
A: Scoped class names at build time — default-friendly in Next.js (`*.module.css`). No runtime cost; collisions avoided by hash.

**Q: Tailwind vs CSS-in-JS?**  
A: Tailwind: utility classes, build-time purge. CSS-in-JS (styled-components): runtime or compiler — know hydration cost in RSC era. Next 13+: often Tailwind or modules on server components; client-only for dynamic runtime CSS libs.

**Q: :global in modules?**  
A: Escape hatch for third-party selectors — use rarely.

---

## Pseudo-classes & accessibility

**Q: :focus vs :focus-visible?**  
A: `:focus-visible` only when keyboard focus — avoid ugly rings on mouse clicks while keeping a11y for keyboard users.

**Q: screen reader only text?**  
A: `.sr-only` pattern — visually hidden, still in accessibility tree.

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Variables & theming

**Q: CSS custom properties?**  
A: Cascade and inherit — ideal for themes. Toggle `data-theme` on `<html>` or use `prefers-color-scheme`.

```css
:root {
  --bg: #fafafa;
  --fg: #18181b;
}

[data-theme="dark"] {
  --bg: #09090b;
  --fg: #fafafa;
}

body {
  background: var(--bg);
  color: var(--fg);
}
```

**TypeScript tie-in:** design tokens can live in TS and feed CSS-in-JS, or stay in CSS variables consumed by Tailwind config — single source of truth is a common senior topic.

---

## Quick checklist

- box-sizing, flex vs grid, gap, clamp
- specificity, :where, stacking contexts
- mobile-first, container queries, dvh
- animate transform/opacity, reduced motion
- Modules/Tailwind in Next.js context
- focus-visible and sr-only for a11y
