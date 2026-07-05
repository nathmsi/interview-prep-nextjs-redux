# Tailwind CSS — React component patterns

> Variants, conditional classes, composition, reusable UI

## Learning goals

- Build variant APIs (`primary` / `secondary` buttons)
- Merge `className` from props
- Extract components without losing Tailwind benefits

---

## Interview answer (30 seconds)

> I wrap repeated utility strings in **small React components** with a **`variant`** prop. **`className` from props** is merged last so callers can override. For conflicting utilities I use **`tailwind-merge`** with **`clsx`**. I avoid prop-drilling 20 classes — the component owns its default look; props control semantic variants only.

---

## Base + variant pattern

```tsx
type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900",
  secondary: "border border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900",
  ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
```

---

## cn helper (production pattern)

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// twMerge("p-4", "p-2") → "p-2" (last wins correctly)
```

---

## Verify it — composable Card

```tsx
type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      {children}
    </div>
  );
}

// Override border only
<Card className="border-amber-300">Warning</Card>
```

---

## Conditional classes

```tsx
<button
  className={cn(
    "rounded-lg px-4 py-2",
    isActive && "bg-sky-600 text-white",
    !isActive && "bg-zinc-100 text-zinc-700"
  )}
>
  Tab
</button>
```

Or object form with `clsx({ "bg-sky-600": isActive })`.

---

## Polymorphic / `asChild` (advanced)

Libraries like Radix use `Slot` to merge props onto child — shadcn pattern:

```tsx
<Button asChild>
  <Link href="/demo">Go to demo</Link>
</Button>
```

**Interview:** shows you know Tailwind works with **composition**, not just `<button>`.

---

## Server vs Client

Tailwind classes work in **Server Components**. Only extract to `"use client"` when you need state/events — styling alone doesn't require client.

```tsx
// Server Component — fine
export function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs dark:bg-zinc-800">
      {label}
    </span>
  );
}
```

---

## Anti-patterns

| Anti-pattern | Better |
|--------------|--------|
| 40 props for colors | `variant` enum |
| String template `bg-${color}-500` | full class map or safelist |
| Copy-paste utilities across 10 files | shared component |

---

## Pratique — Q&R

**Q : Bouton avec variantes `primary` / `ghost` ?**
R : Objet de classes + prop `variant` (voir exemple `Button` dans la leçon).

**Q : Le parent passe `className="mt-4"` — comment fusionner ?**
R :

```tsx
<div className={cn("rounded-lg border p-4", className)} />
```

**Q : Classes conditionnelles selon `isActive` ?**
R :

```tsx
className={cn("px-4 py-2 rounded-lg", isActive ? "bg-sky-600 text-white" : "bg-zinc-100")}
```

**Q : `bg-${color}-500` ne marche pas — pourquoi ?**
R : Tailwind scanne les fichiers à la build. Chaînes dynamiques ne génèrent pas les classes. Utilise une map :

```tsx
const colors = { red: "bg-red-500", green: "bg-green-500" } as const;
```
