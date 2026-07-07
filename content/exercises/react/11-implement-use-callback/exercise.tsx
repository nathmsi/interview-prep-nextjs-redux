/**
 * EXERCISE react/11 — Implement useMyCallback
 *
 * Implémente `useMyCallback(fn, deps)` qui se comporte comme `useCallback` :
 * - Retourne la même référence de fonction tant que les deps ne changent pas.
 * - Retourne une nouvelle référence si au moins une dep change (comparaison Object.is).
 *
 * Contraintes : useRef uniquement — pas de useEffect, pas de useMemo.
 *
 * Run: npm run react:11
 */

"use client";

import { memo, useRef, useState, type DependencyList } from "react";

// ---------------------------------------------------------------------------
// À implémenter
// ---------------------------------------------------------------------------

function areDepsEqual(prev: DependencyList, next: DependencyList): boolean {
  if (prev.length !== next.length) return false;
  return prev.every((dep, i) => Object.is(dep, next[i]));
}
export function useMyCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  deps: DependencyList
): T {
  const refDeps = useRef<{ callback: T, deps: DependencyList} | null>(null);
  // eslint-disable-next-line react-hooks/refs
  if (refDeps.current === null || !areDepsEqual(refDeps?.current?.deps,deps)) {
    // eslint-disable-next-line react-hooks/refs
    refDeps.current = { callback, deps };
  }
  // eslint-disable-next-line react-hooks/refs
  return refDeps?.current?.callback;
}

// ---------------------------------------------------------------------------
// Composant de démo — ne pas modifier
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
        Supprimer
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
    { id: 1, label: "Apprendre useCallback" },
    { id: 2, label: "Passer l'entretien" },
    { id: 3, label: "Fêter ça" },
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
        placeholder="Filtrer..."
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
