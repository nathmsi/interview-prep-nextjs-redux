# useState — local component state

> **React 19** · Client Component only

## Learning goals

- Return `[value, setter]` and trigger re-renders via setter only
- Use functional updates when next state depends on previous
- Avoid direct mutation

---

## Interview answer (30 seconds)

> `useState` holds local UI state. Updates must go through the **setter** — mutating the value in place does not schedule a render. If the next value depends on the previous one, I use **`setState(prev => ...)`** to avoid stale closures, especially in async code.

---

## What it does

Returns a value and a setter. Calling the setter schedules a re-render with the new state.

---

## Verify it — functional updater

Mental model (run in a Client Component):

```tsx
"use client";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const bumpTwice = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1); // +2 total — uses latest each time
  };
  return (
    <div>
      <p data-testid="count">{count}</p>
      <button type="button" onClick={bumpTwice}>+2</button>
    </div>
  );
}
```

**Expected:** after one click, count shows **2** (not 1).

---

## Verify it — lazy init

```tsx
const [data] = useState(() => {
  console.log("init once");
  return expensive();
});
```

**Expected:** `"init once"` logs **once** per mount, not every render.

---

## Rules of hooks

- Top level only — not in `if`, loops, or nested functions
- Only in React function components or custom hooks

---

## Common mistakes

| Mistake | Result |
|---------|--------|
| `state.count++` | no re-render |
| `setCount(count + 1)` twice in async | may use stale `count` |
| `useState(props.x)` without sync strategy | state frozen at first render |

---

## Full example

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

Next: [useEffect →](./02-use-effect.md)
