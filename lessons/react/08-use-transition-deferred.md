# useTransition & useDeferredValue — keep UI responsive

> **React 19** · Course only

## useTransition

Returns `[isPending, startTransition]`. Wrap **non-urgent** state updates in `startTransition` so React can keep the current UI responsive and show pending UI.

Urgent: typing in an input. Non-urgent: filtering a huge list.

## useDeferredValue

Takes a value and returns a **deferred** version that may lag behind during rapid changes — React can render the old deferred value while preparing the new one.

Often paired with `memo` on slow child components.

## Interview questions

- **vs debounce?** Transition is React-scheduled, integrates with Suspense and concurrent rendering.
- **isPending usage?** Show spinner on secondary UI, not on the text field the user is typing in.

## Example

```tsx
"use client";

import { useDeferredValue, useState, useTransition } from "react";

const slowFilter = (text: string, query: string) =>
  text.split(" ").filter((w) => w.toLowerCase().includes(query.toLowerCase()));

export function TransitionSearch({ text }: { text: string }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const words = slowFilter(text, deferredQuery);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          const v = e.target.value;
          startTransition(() => setQuery(v));
        }}
        placeholder="Search words"
      />
      {isPending && <span> Updating…</span>}
      <ul>
        {words.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </div>
  );
}
```
