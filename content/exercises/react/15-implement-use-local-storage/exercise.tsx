/**
 * EXERCISE react/15 — Implement useLocalStorage
 *
 * Implémente `useLocalStorage(key, initialValue)` qui se comporte comme
 * `useState`, mais persiste la valeur dans `localStorage` :
 * - Au montage, lit `localStorage.getItem(key)` : s'il existe, l'utilise
 *   (parsé en JSON) comme valeur initiale, sinon utilise `initialValue`.
 * - Le setter retourné accepte une valeur ou une fonction updater (comme
 *   `setState`), met à jour l'état ET écrit la nouvelle valeur dans
 *   `localStorage` (sérialisée en JSON) sous `key`.
 *
 * Indice : useState avec une fonction d'initialisation paresseuse pour lire
 * localStorage une seule fois.
 *
 * Run: npm run react:15
 */

"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// À implémenter
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
// Démo — ne pas modifier
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
