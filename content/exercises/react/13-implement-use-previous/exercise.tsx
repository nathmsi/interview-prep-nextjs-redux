/**
 * EXERCISE react/13 — Implement usePrevious
 *
 * Implement `usePrevious(value)` that returns the value from the PREVIOUS
 * render.
 * - On the first render: returns `undefined` (no previous value).
 * - On subsequent renders: returns the value as it was on the previous render.
 *
 * Hint: useRef to store the value, useEffect to update it AFTER the render
 * (the effect runs after commit, so during the current render the ref still
 * holds the previous value).
 *
 * Run: npm run react:13
 */

"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// To implement
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
// Demo — do not modify
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
