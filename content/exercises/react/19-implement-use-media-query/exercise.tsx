/**
 * EXERCISE react/19 — Implement useMediaQuery
 *
 * Implémente `useMediaQuery(query)` qui renvoie un booléen indiquant si la
 * media query CSS `query` matche actuellement :
 * - Utilise `window.matchMedia(query)` pour l'état initial.
 * - S'abonne à l'événement "change" du MediaQueryList pour rester à jour.
 * - Se désabonne proprement au démontage / si `query` change.
 *
 * Run: npm run react:19
 */

"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// À implémenter
// ---------------------------------------------------------------------------

export function useMediaQuery(query: string): boolean {
  // TODO: your code here
  const [matches, setMatches] = useState(false);

  return matches;
}

// ---------------------------------------------------------------------------
// Démo — ne pas modifier
// ---------------------------------------------------------------------------

export function ResponsiveLabel() {
  const isWide = useMediaQuery("(min-width: 768px)");

  return <span data-testid="label">{isWide ? "wide" : "narrow"}</span>;
}
