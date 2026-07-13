/**
 * EXERCISE react/12 — Implement useMyMemo
 *
 * Implement `useMyMemo(factory, deps)` that behaves like `useMemo`:
 * - Calls `factory()` on the first render and caches the result.
 * - As long as the deps don't change, returns the cached value WITHOUT
 *   calling `factory` again.
 * - If at least one dep changes (Object.is comparison), calls `factory`
 *   again and updates the cache.
 *
 * Constraints: useRef only — no useMemo, no useEffect.
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
// To implement
// ---------------------------------------------------------------------------
export function useMyMemo<T>(factory: () => T, deps: DependencyList): T {
  // TODO: your code here
  void areDepsEqual;
  void deps;
  const refResult = useRef<T>(undefined as T);
  refResult.current = factory();
  // eslint-disable-next-line react-hooks/refs
  return refResult.current;
}

// ---------------------------------------------------------------------------
// Demo + call counter — do not modify
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
