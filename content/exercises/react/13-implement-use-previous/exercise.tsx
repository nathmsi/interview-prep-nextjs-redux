/**
 * EXERCISE react/13 — Implement usePrevious
 *
 * Implémente `usePrevious(value)` qui renvoie la valeur du render PRÉCÉDENT.
 * - Au premier render : renvoie `undefined` (pas de valeur précédente).
 * - Aux renders suivants : renvoie la valeur telle qu'elle était au render d'avant.
 *
 * Indice : useRef pour stocker la valeur, useEffect pour la mettre à jour
 * APRÈS le render (l'effet s'exécute après le commit, donc pendant le render
 * courant la ref contient encore la valeur précédente).
 *
 * Run: npm run react:13
 */

"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// À implémenter
// ---------------------------------------------------------------------------

export function usePrevious<T>(value: T): T | undefined {
  // TODO: your code here
  const refPrevValue = useRef<T | undefined>(undefined);

  useEffect(() => {
    refPrevValue.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs
  return refPrevValue.current;
}

// ---------------------------------------------------------------------------
// Démo — ne pas modifier
// ---------------------------------------------------------------------------

export function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div>
      <span data-testid="current">{count}</span>
      <span data-testid="previous">
        {previous === undefined ? "none" : previous}
      </span>
      <button
        type="button"
        data-testid="inc"
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
    </div>
  );
}
