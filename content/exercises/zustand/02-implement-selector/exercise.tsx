/**
 * EXERCISE zustand/02 — Selectors and render optimization
 *
 * The store below holds both `count` and `text`. `CountDisplay` should only
 * re-render when `count` changes — not when `text` changes.
 *
 * Implement `useCount()` using a Zustand selector so `CountDisplay`
 * subscribes only to the `count` slice of the store, instead of the whole
 * store object.
 *
 * Hint: `useAppStore((state) => state.count)` — passing a selector function
 * makes the component re-render only when the selected value changes.
 *
 * Run: npm run zustand:02
 */

"use client";

import { create } from "zustand";
import { memo, useState } from "react";

type AppState = {
  count: number;
  text: string;
  setCount: (n: number) => void;
  setText: (s: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  text: "",
  setCount: (n) => set({ count: n }),
  setText: (s) => set({ text: s }),
}));

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

function useCount(): number {
  // TODO: your code here
  const state = useAppStore();
  return state.count;
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

let countDisplayRenderCount = 0;

export function getCountDisplayRenderCount() {
  return countDisplayRenderCount;
}

export function resetCountDisplayRenderCount() {
  countDisplayRenderCount = 0;
}

const CountDisplay = memo(function CountDisplay() {
  countDisplayRenderCount++;
  const count = useCount();
  return <span data-testid="count">{count}</span>;
});

export function AppPanel() {
  const setCount = useAppStore((s) => s.setCount);
  const setText = useAppStore((s) => s.setText);
  const [textInput, setTextInput] = useState("");

  return (
    <div>
      <CountDisplay />
      <button
        type="button"
        data-testid="inc"
        onClick={() => setCount(useAppStore.getState().count + 1)}
      >
        +1
      </button>
      <input
        data-testid="text-input"
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
          setText(e.target.value);
        }}
      />
    </div>
  );
}
