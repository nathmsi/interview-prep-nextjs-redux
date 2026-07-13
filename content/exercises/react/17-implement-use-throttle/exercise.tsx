/**
 * EXERCISE react/17 — Implement useThrottle
 *
 * Implement `useThrottle(value, limit)` that returns a "throttled" version
 * of `value`: at most one update every `limit` ms.
 * - On mount, returns the initial value.
 * - If `value` changes several times within the `limit` ms window, only the
 *   LAST value is applied, exactly `limit` ms after the last effective
 *   update (not after each individual change).
 *
 * Unlike useDebounce, throttle does not reset the timer on every change:
 * the window stays anchored to the last effective update.
 *
 * Hint: useRef to remember the timestamp of the last update, useEffect +
 * setTimeout to schedule the next one, and don't forget to clean up the
 * timer in the cleanup.
 *
 * Run: npm run react:17
 */

"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

export function useThrottle<T>(value: T, limit: number): T {
  // TODO: your code here
  const [throttledValue, setThrottledValue] = useState(value);

  return throttledValue;
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

export function SearchBox() {
  const [text, setText] = useState("");
  const throttled = useThrottle(text, 300);

  return (
    <div>
      <input
        data-testid="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search..."
      />
      <span data-testid="throttled">{throttled}</span>
    </div>
  );
}
