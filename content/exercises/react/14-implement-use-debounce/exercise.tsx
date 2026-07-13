/**
 * EXERCISE react/14 — Implement useDebounce
 *
 * Implement `useDebounce(value, delay)` that returns a "delayed" version of
 * `value`:
 * - On mount, returns the initial value.
 * - When `value` changes, waits `delay` ms BEFORE updating the returned
 *   value. If `value` changes again before the delay ends, the previous
 *   timer is cancelled (debounce).
 *
 * Hint: useState for the debounced value, useEffect + setTimeout, and don't
 * forget to clean up the timer in the cleanup function.
 *
 * Run: npm run react:14
 */

"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------


export function useDebounce<T>(value: T, delay: number): T | null {
  // TODO: your code here
  const [debouncedValue] = useState<T | null>(null);
  void value;
  void delay;
  return debouncedValue;
}


// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

export function SearchBox() {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 300);

  return (
    <div>
      <input
        data-testid="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search..."
      />
      <span data-testid="debounced">{debounced}</span>
    </div>
  );
}
