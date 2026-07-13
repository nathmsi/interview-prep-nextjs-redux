/**
 * EXERCISE react/19 — Implement useMediaQuery
 *
 * Implement `useMediaQuery(query)` that returns a boolean indicating
 * whether the CSS media query `query` currently matches:
 * - Uses `window.matchMedia(query)` for the initial state.
 * - Subscribes to the MediaQueryList "change" event to stay up to date.
 * - Unsubscribes cleanly on unmount / when `query` changes.
 *
 * Run: npm run react:19
 */

"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

export function useMediaQuery(query: string): boolean {
  // TODO: your code here
  const [matches, setMatches] = useState(false);

  return matches;
}

// ---------------------------------------------------------------------------
// Demo — do not modify
// ---------------------------------------------------------------------------

export function ResponsiveLabel() {
  const isWide = useMediaQuery("(min-width: 768px)");

  return <span data-testid="label">{isWide ? "wide" : "narrow"}</span>;
}
