# useRef — mutable box & DOM access

> **React 19** · Course only

## What it does

`useRef(initial)` returns `{ current }`. Updating `current` does **not** trigger a re-render.

Two main uses:

1. **DOM reference** — pass to `ref={ref}` on an element.
2. **Instance variable** — store timer id, previous value, abort controller.

## Interview questions

- **ref vs state?** State change → re-render. Ref change → no re-render.
- **Why not `document.getElementById`?** Breaks with multiple instances; refs are per component instance.
- **forwardRef?** Parent passes ref to child — needed when child wraps a native element.

## Example

```tsx
"use client";

import { useEffect, useRef } from "react";

export function FocusOnMount() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}
```
