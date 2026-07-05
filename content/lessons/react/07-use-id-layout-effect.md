# useId & useLayoutEffect

> **React 19** · Course only

## useId

Generates a **stable unique id** per component instance. Safe with SSR (matches server + client).

Use for: `htmlFor` + `id` on labels/inputs, `aria-labelledby`, list keys that must not collide.

**Do not** use for keys in lists (`key={useId()}` in a map is wrong).

## useLayoutEffect

Same signature as `useEffect`, but fires **synchronously** after DOM updates, **before** the browser paints.

Use when you must read layout (size, scroll position) and write DOM before user sees a flash.

Prefer `useEffect` by default — `useLayoutEffect` blocks painting.

## Interview questions

- **useId vs random / Math.random?** Random breaks hydration; `useId` is designed for SSR.
- **useLayoutEffect on server?** Warning in SSR — only runs on client; use `typeof window` guard or client component only.

## Example

```tsx
"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";

export function MeasuredBox({ children }: { children: React.ReactNode }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, [children]);

  return (
    <div>
      <label htmlFor={id}>Content height: {height}px</label>
      <div id={id} ref={ref}>
        {children}
      </div>
    </div>
  );
}
```
