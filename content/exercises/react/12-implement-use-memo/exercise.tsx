/**
 * EXERCISE react/12 — Implement useMyMemo
 *
 * Implémente `useMyMemo(factory, deps)` qui se comporte comme `useMemo` :
 * - Appelle `factory()` au premier render et met le résultat en cache.
 * - Tant que les deps ne changent pas, renvoie la valeur en cache SANS
 *   rappeler `factory`.
 * - Si au moins une dep change (comparaison Object.is), rappelle `factory`
 *   et met à jour le cache.
 *
 * Contraintes : useRef uniquement — pas de useMemo, pas de useEffect.
 *
 * Run: npm run react:12
 */

"use client";

import { useRef, useState, type DependencyList } from "react";

function areDepsEqual(prev: DependencyList, next: DependencyList): boolean {
  if (prev.length !== next.length) return false;
  return prev.every((dep, i) => Object.is(dep, next[i]));
}

// ---------------------------------------------------------------------------
// À implémenter
// ---------------------------------------------------------------------------
export function useMyMemo<T>(factory: () => T, deps: DependencyList): T {
  const refResult = useRef<T>(undefined as T);
  const refDeps = useRef<DependencyList | null>(null);
  if (refDeps.current === null || !areDepsEqual(refDeps.current, deps)) {
    refResult.current = factory();
    refDeps.current = deps;
  }
  // eslint-disable-next-line react-hooks/refs
  return refResult.current;
}

// ---------------------------------------------------------------------------
// Démo + compteur d'appels — ne pas modifier
// ---------------------------------------------------------------------------

let factoryCallCount = 0;

export function getFactoryCallCount() {
  return factoryCallCount;
}

export function resetFactoryCallCount() {
  factoryCallCount = 0;
}

export function SortedList({ items }: { items: string[] }) {
  const [count, setCount] = useState(0);

  const sorted = useMyMemo(() => {
    factoryCallCount++;
    return [...items].sort();
  }, [items]);

  return (
    <div>
      <button
        type="button"
        data-testid="inc"
        onClick={() => setCount((c) => c + 1)}
      >
        count: {count}
      </button>
      <ul data-testid="list">
        {sorted.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
