/**
 * EXERCISE react/15 — Implement useLocalStorage
 *
 * Implement `useLocalStorage(key, initialValue)` that behaves like
 * `useState`, but persists the value to `localStorage`:
 * - On mount, reads `localStorage.getItem(key)`: if it exists, uses it
 *   (parsed as JSON) as the initial value, otherwise uses `initialValue`.
 * - The returned setter accepts a value or an updater function (like
 *   `setState`), updates the state AND writes the new value to
 *   `localStorage` (serialized as JSON) under `key`.
 *
 * Hint: useState with a lazy initializer function to read localStorage
 * only once.
 *
 * Run: npm run react:15
 */

"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // TODO: your code here
  const [value, setValue] = useState<T>(initialValue);

  const setStoredValue = (next: T | ((prev: T) => T)) => {
    setValue(next);
  };

  return [value, setStoredValue];
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

export function PersistedCounter() {
  const [count, setCount] = useLocalStorage("count", 0);

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button
        type="button"
        data-testid="inc"
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
}
