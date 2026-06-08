# Tailwind CSS — forms & accessibility

> Inputs, labels, focus rings, screen readers, contrast

## Learning goals

- Style form controls with Tailwind
- Build accessible focus states (`focus-visible`, `ring`)
- Use `sr-only` and semantic HTML

---

## Interview answer (30 seconds)

> Accessible forms need **visible labels**, **`focus-visible` rings** for keyboard users, and sufficient **color contrast**. I style inputs with `border`, `rounded-lg`, `px-3 py-2`, and `focus-visible:ring-2`. Screen-reader-only text uses **`sr-only`**. I never rely on color alone — pair with text/icons for errors.

---

## Input baseline

```tsx
<label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
  Email
</label>
<input
  id="email"
  name="email"
  type="email"
  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
    Invalid email
  </p>
)}
```

---

## Form plugin note

`@tailwindcss/forms` resets inputs to a consistent base — optional add-on. Manual classes above work without plugin.

---

## Focus management

```tsx
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
```

| Utility | Purpose |
|---------|---------|
| `focus:outline-none` | remove default outline |
| `focus-visible:ring-*` | keyboard-only ring |
| `ring-offset-2` | space between element and ring |

---

## sr-only (screen reader only)

```tsx
<button type="button">
  <span className="sr-only">Close dialog</span>
  <XIcon aria-hidden className="size-5" />
</button>
```

Visually hidden but announced by assistive tech.

---

## Verify it — disabled state

```tsx
<button
  type="submit"
  disabled={pending}
  className="rounded-lg bg-sky-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {pending ? "Sending…" : "Send"}
</button>
```

---

## Checkbox / radio

```tsx
<input
  type="checkbox"
  className="size-4 rounded border-zinc-300 text-sky-600 focus:ring-sky-500"
/>
```

---

## Touch targets

Minimum **44×44px** touch targets on mobile:

```tsx
<button className="min-h-11 min-w-11 inline-flex items-center justify-center p-2">
  …
</button>
```

---

## Contrast checklist

- Body text: **4.5:1** against background
- Large text: **3:1**
- Don't use `text-zinc-400` on `bg-zinc-200` without checking

---

## React 19 forms (Next.js)

```tsx
"use client";
import { useActionState } from "react";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, null);
  return (
    <form action={action} className="space-y-4">
      {/* same Tailwind input classes */}
      <button disabled={pending} className="…">Send</button>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `placeholder` instead of `<label>` | always label |
| `focus:` ring on mouse click | `focus-visible:` |
| Error only red border | add text message + `aria-invalid` |

---

## Pratique — Q&R

**Q : Input texte stylé de base ?**
R :

```tsx
<input
  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900"
/>
```

**Q : Label obligatoire pour l'accessibilité ?**
R : Oui. `htmlFor` + `id` sur l'input, pas seulement `placeholder`.

**Q : Icône "fermer" lue par les lecteurs d'écran ?**
R :

```tsx
<button><span className="sr-only">Fermer</span><XIcon aria-hidden /></button>
```

**Q : Erreur de validation visible ?**
R : Bordure rouge + message texte + `aria-invalid` + `aria-describedby` pointant vers le message.
