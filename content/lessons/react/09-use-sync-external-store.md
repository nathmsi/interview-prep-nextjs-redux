# useSyncExternalStore — subscribe to external data

> **React 19** · Course only

## What it does

Reads a value from an external store (outside React) and subscribes to updates in a way that is **safe for concurrent rendering and hydration**.

Signature:

```ts
useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

React uses this internally; libraries like Redux 8+ use it for `useSelector`.

## Interview questions

- **Why not useState + useEffect subscribe?** Can cause tearing (inconsistent UI) with concurrent features.
- **getServerSnapshot?** Required for SSR when snapshot differs from client initial state.

## Example

```tsx
"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

function getWidth() {
  return window.innerWidth;
}

export function WindowWidth() {
  const width = useSyncExternalStore(
    subscribe,
    getWidth,
    () => 0 // server snapshot
  );

  return <p>Width: {width}px</p>;
}
```
