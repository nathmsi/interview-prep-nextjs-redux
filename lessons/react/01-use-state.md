# useState — local component state

> **React 19** · Course only (no exercise)

## What it does

`useState` returns a value and a setter. When you call the setter, React schedules a re-render with the new state.

## Interview questions

- **Why not mutate state directly?** (`state.count++`) — React would not detect the change; always use the setter.
- **Functional updater?** `setCount(c => c + 1)` — use when the next state depends on the previous one (avoids stale closures in async code).
- **Lazy init?** `useState(() => expensive())` — runs only on first mount.

## Rules of hooks (always mention in interviews)

- Only call hooks at the top level of a function component or custom hook.
- Only call hooks from React function components or custom hooks.

## Example

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}
```
