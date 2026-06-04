# useOptimistic — instant UI before server confirms (React 19)

> **React 19** · Course only

## What it does

Shows an **optimistic** version of state while an async update runs. When the action finishes, React reconciles with the real result.

```ts
const [optimisticItems, addOptimistic] = useOptimistic(items, reducer);
```

Typical flow: user clicks → `addOptimistic` updates UI immediately → `await` server → replace with server data or rollback.

## Interview questions

- **vs useOptimistic in Redux?** Same UX idea; this hook is built into React for local / action-driven UI.
- **Failure handling?** On error, revert to last committed state from the server or previous snapshot.

## Example

```tsx
"use client";

import { useOptimistic, useState, useTransition } from "react";

type Todo = { id: string; text: string; pending?: boolean };

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([{ id: "1", text: "Learn useOptimistic" }]);
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (current, newTodo: Todo) => [...current, { ...newTodo, pending: true }]
  );
  const [, startTransition] = useTransition();

  function add(text: string) {
    const optimistic = { id: crypto.randomUUID(), text };
    startTransition(async () => {
      addOptimistic(optimistic);
      await new Promise((r) => setTimeout(r, 600)); // fake API
      setTodos((t) => [...t, optimistic]);
    });
  }

  return (
    <div>
      <button type="button" onClick={() => add("New item")}>
        Add
      </button>
      <ul>
        {optimisticTodos.map((t) => (
          <li key={t.id} style={{ opacity: t.pending ? 0.5 : 1 }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```
