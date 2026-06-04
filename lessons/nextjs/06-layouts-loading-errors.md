# Next.js — layouts, loading, errors & metadata

> Special files · SEO · UX boundaries

---

## Layouts (`layout.tsx`)

- Wrap **child** `page.tsx` and nested layouts
- **Preserve state** on navigation (sidebar scroll, form draft in client children)
- Can be async Server Components
- Accept `children` + optional parallel route slots

```tsx
export default function LessonsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      <aside>Lesson nav</aside>
      <div>{children}</div>
    </div>
  );
}
```

**Root layout** must include `<html>` and `<body>` — only once in `app/layout.tsx`.

---

## `loading.tsx`

- Automatic **Suspense** boundary for the segment
- Shows immediately while `page.tsx` async work runs
- Nested: parent layout stays visible, child shows skeleton

```
app/lessons/loading.tsx     → shows when navigating /lessons/*
app/lessons/[level]/loading.tsx
```

---

## `error.tsx`

Must be a **Client Component**:

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button type="button" onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

- Catches errors in **child** segments (not same-level layout errors)
- `reset()` re-renders the segment

---

## `not-found.tsx` + `notFound()`

```tsx
// not-found.tsx
export default function NotFound() {
  return <h1>404 — Lesson not found</h1>;
}
```

```tsx
import { notFound } from "next/navigation";

export default async function LessonPage({ params }) {
  const lesson = getLesson(params.level, params.slug);
  if (!lesson) notFound();
  // ...
}
```

---

## Metadata & SEO

### Static metadata

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Prep",
  description: "Next.js + Redux lessons",
  openGraph: { title: "...", images: ["/og.png"] },
};
```

### Dynamic metadata

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const lesson = getLesson(params.level, params.slug);
  return { title: lesson?.title ?? "Lesson" };
}
```

**This repo:** static `metadata` in `src/app/layout.tsx`.

---

## `generateStaticParams` + metadata

Pre-build lesson pages for fast CDN delivery:

```tsx
export async function generateStaticParams() {
  return lessons.map((l) => ({ level: l.track, slug: l.slug }));
}
```

---

## `template.tsx` vs `layout.tsx`

- **Layout:** state preserved
- **Template:** remounts children on navigation (enter/exit animations)

Rare in interviews; know layout is the default tool.

---

## Global styles & fonts

- `app/globals.css` — imported once in root layout
- `next/font` — self-hosted, CSS variables on `<body>`

---

## Interview points

**Q: Where to put site-wide nav?**  
A: Root or section `layout.tsx` — not duplicated in every `page.tsx`.

**Q: loading vs Suspense manually?**  
A: `loading.tsx` is convention; manual `<Suspense>` for granular streaming inside a page.

**Q: error.tsx vs try/catch in server component?**  
A: `error.tsx` catches render errors in subtree; try/catch for expected failures you handle inline.

Next: [Server Actions →](./07-server-actions-forms.md)
