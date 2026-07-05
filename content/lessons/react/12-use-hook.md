# use — read promises & context in render (React 19)

> **React 19** · Course only

## What it does

`use(promise)` or `use(context)` can be called **conditionally** (unlike other hooks) when wrapped in **Suspense** (for promises) or inside a component under a Provider (for context).

When the promise resolves, the component re-renders with the value. While pending, the nearest Suspense fallback shows.

## Interview questions

- **use vs useEffect + fetch?** `use` integrates with Suspense and streaming; less manual loading state in children.
- **Can I use in Server Components?** Yes for promises/context in RSC — big part of modern Next.js data loading.
- **Client component?** Must be in a tree with Suspense boundary above.

## Example (client + Suspense)

```tsx
"use client";

import { Suspense, use } from "react";

function fetchUser(): Promise<{ name: string }> {
  return fetch("/api/health")
    .then((r) => r.json())
    .then(() => ({ name: "Alex" }));
}

const userPromise = fetchUser();

function UserName() {
  const user = use(userPromise);
  return <p>{user.name}</p>;
}

export function UserPanel() {
  return (
    <Suspense fallback={<p>Loading user…</p>}>
      <UserName />
    </Suspense>
  );
}
```
