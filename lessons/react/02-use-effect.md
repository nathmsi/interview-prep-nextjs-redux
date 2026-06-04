# useEffect — side effects after render

> **React 19** · Runs after paint (commit phase)

## Learning goals

- Choose correct dependency array
- Always cleanup subscriptions/timers
- Know when **not** to use an effect (derived state)

---

## Interview answer (30 seconds)

> `useEffect` runs **after** the browser paints. I use it for subscriptions, timers, and syncing with non-React systems — **not** for computing values I can derive during render. Cleanup prevents leaks and races. Missing deps cause **stale closures**; wrong deps cause **infinite loops**.

---

## Dependency array

| Deps | Behavior |
|------|----------|
| omitted | after **every** render |
| `[]` | once after mount |
| `[a, b]` | when `a` or `b` change |

---

## Verify it — cleanup runs

```tsx
"use client";
import { useEffect, useState } from "react";

export function Timer() {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{sec}</p>;
}
```

**Expected:** unmount component → interval cleared (no ghost updates). Check React DevTools or log in cleanup.

---

## Verify it — infinite loop trap

```tsx
// BAD — do not ship
useEffect(() => {
  setCount(count + 1); // runs every render → loop
});
```

**Fix:** add deps `[count]` only if needed, or use functional `setCount(c => c+1)` with correct deps, or derive without effect.

---

## Do not use effect for

```tsx
// BAD
useEffect(() => setFullName(first + " " + last), [first, last]);

// GOOD — during render
const fullName = `${first} ${last}`;
```

---

## Example — OnlineStatus

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

Next: [useRef →](./03-use-ref.md)
