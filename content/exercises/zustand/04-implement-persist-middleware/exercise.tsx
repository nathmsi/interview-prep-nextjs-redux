/**
 * EXERCISE zustand/04 — persist middleware
 *
 * Wrap the counter store with Zustand's `persist` middleware so `count`
 * survives across store creations (e.g. a page reload):
 * - name: "zustand-counter" (the localStorage key)
 * - storage: `createJSONStorage(() => localStorage)`
 *
 * Hint: `create<CounterState>()(persist((set) => ({ ... }), { name: "...", storage: ... }))`.
 *
 * Run: npm run zustand:04
 */

"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CounterState = {
  count: number;
  increment: () => void;
};

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

// TODO: your code here — wrap this store creator with `persist(...)`
void persist;
void createJSONStorage;

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

export function Counter() {
  const { count, increment } = useCounterStore();

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button type="button" data-testid="inc" onClick={increment}>
        +1
      </button>
    </div>
  );
}
