# useMemo & useCallback — memoize values and functions

> **React 19** · Course only

## What they do

- **useMemo(fn, deps)** — cache the **return value** of `fn` until deps change.
- **useCallback(fn, deps)** — cache the **function reference** (`useMemo(() => fn, deps)`).

## When they help

- Passing callbacks to `memo()` children so they do not re-render unnecessarily.
- Expensive pure calculations (filter/sort large lists).

## When they hurt (common interview trap)

- Memoizing everything “just in case” adds complexity and memory — measure first.
- React 19 compiler (when enabled) can auto-memoize — still know the hooks.

## Interview questions

- **useCallback vs useMemo?** Callback = stable function; memo = stable computed value.
- **Deps empty `[]`?** Value computed once per mount — beware stale props if you close over them.

## Example

```tsx
"use client";

import { memo, useCallback, useMemo, useState } from "react";

const ExpensiveList = memo(function ExpensiveList({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <ul>
      {items.map((id) => (
        <li key={id}>
          <button type="button" onClick={() => onSelect(id)}>
            {id}
          </button>
        </li>
      ))}
    </ul>
  );
});

export function MemoDemo() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const ids = useMemo(
    () => ["a", "b", "c", "d"].filter((id) => id.includes(query)),
    [query]
  );
  const onSelect = useCallback((id: string) => setSelected(id), []);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="filter" />
      <ExpensiveList items={ids} onSelect={onSelect} />
      <p>Selected: {selected ?? "none"}</p>
    </div>
  );
}
```
