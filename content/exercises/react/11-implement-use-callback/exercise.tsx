/**
 * EXERCISE react/11 — Implement useMyCallback
 *
 * Implement `useMyCallback(fn, deps)` that behaves like `useCallback`:
 * - Returns the same function reference as long as the deps don't change.
 * - Returns a new reference if at least one dep changes (Object.is comparison).
 *
 * Constraints: useRef only — no useEffect, no useMemo.
 *
 * Run: npm run react:11
 */

"use client";

import { memo, useRef, useState, type DependencyList } from "react";

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

function areDepsEqual(prev: DependencyList, next: DependencyList): boolean {
  if (prev.length !== next.length) return false;
  return prev.every((dep, i) => Object.is(dep, next[i]));
}
export function useMyCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  deps: DependencyList
): T {
  // TODO: your code here
  const refDeps = useRef<{ callback: T; deps: DependencyList } | null>(null);
  void areDepsEqual;
  refDeps.current = { callback, deps };
  // eslint-disable-next-line react-hooks/refs
  return refDeps.current.callback;
}

// ---------------------------------------------------------------------------
// Demo component — do not modify
// ---------------------------------------------------------------------------

let childRenderCount = 0;

export const TodoItem = memo(function TodoItem({
  id,
  label,
  onRemove,
}: {
  id: number;
  label: string;
  onRemove: (id: number) => void;
}) {
  childRenderCount++;
  return (
    <li>
      <span data-testid={`item-${id}`}>{label}</span>
      <button
        type="button"
        data-testid={`remove-${id}`}
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </li>
  );
});

export function getChildRenderCount() {
  return childRenderCount;
}

export function resetChildRenderCount() {
  childRenderCount = 0;
}

export function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, label: "Learn useCallback" },
    { id: 2, label: "Pass the interview" },
    { id: 3, label: "Celebrate" },
  ]);
  const [filter, setFilter] = useState("");

  const removeTodo = useMyCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const visible = todos.filter((t) =>
    t.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        data-testid="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <ul data-testid="list">
        {visible.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            label={todo.label}
            onRemove={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}
