/**
 * EXERCISE react/18 — Debug: cleanup manquant dans useEffect
 *
 * `KeyCounter` doit incrémenter `count` de 1 à chaque pression de touche.
 * En l'état, l'incrément s'emballe après quelques touches (2, puis 3
 * incréments d'un coup...). Trouve pourquoi et corrige.
 *
 * Run: npm run react:18
 */

"use client";

import { useEffect, useState } from "react";

export function KeyCounter(): React.ReactElement {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function handleKeyDown() {
      setCount((c) => c + 1);
    }
    window.addEventListener("keydown", handleKeyDown);
  });

  return <span data-testid="count">{count}</span>;
}
