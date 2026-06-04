# useEffect — side effects after render

> **React 19** · Course only

## What it does

Runs code **after** React commits the DOM update. Use for: subscriptions, timers, manual DOM, syncing with non-React systems, logging.

**Do not use** for deriving UI from props/state (compute during render instead).

## Dependency array

| Deps | Behavior |
|------|----------|
| omitted | runs after **every** render |
| `[]` | runs once after mount |
| `[a, b]` | runs when `a` or `b` change |

## Cleanup

Return a function from the effect to unsubscribe / clear timers — runs before re-run and on unmount.

## Interview questions

- **Stale closure in effect?** Missing deps → effect sees old values. Fix: add deps or use functional updates.
- **useEffect vs useLayoutEffect?** Layout runs synchronously after DOM paint, before browser paint — for measurements.
- **Fetching in useEffect?** Still valid on client; on server prefer async Server Components or `use` + Suspense.

## Example

```tsx
"use client";

import { useEffect, useState } from "react";

export function OnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return <span>{online ? "Online" : "Offline"}</span>;
}
```
