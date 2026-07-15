/**
 * EXERCISE zustand/01 — Basic store
 *
 * Implement `useCounterStore` with Zustand's `create`:
 * - state: `count: number` (starts at 0)
 * - actions: `increment()`, `decrement()`, `reset()`
 *
 * Hint: `create<CounterState>((set) => ({ ... }))`. Actions call
 * `set((state) => ({ count: state.count + 1 }))`.
 *
 * Run: npm run zustand:01
 */

"use client";

import { create } from "zustand";

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  // TODO: your code here
  increment: () => {},
  decrement: () => {},
  reset: () => {},
}));

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

export function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button type="button" data-testid="inc" onClick={increment}>
        +1
      </button>
      <button type="button" data-testid="dec" onClick={decrement}>
        -1
      </button>
      <button type="button" data-testid="reset" onClick={reset}>
        reset
      </button>
    </div>
  );
}
