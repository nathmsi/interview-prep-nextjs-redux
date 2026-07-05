/**
 * EXERCISE react/03 — Debug: List Keys
 *
 * Each row has an editable input. After reordering items,
 * input values must stay attached to the correct item.
 * Find and fix the key bug. Run: npm run react:03
 */

"use client";

export type TodoItem = { id: string; label: string };

export function TodoList({ items }: { items: TodoItem[] }): React.ReactElement {

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <input
            data-testid={`input-${item.id}`}
            defaultValue={item.label}
            aria-label={item.id}
          />
        </li>
      ))}
    </ul>
  );
}
