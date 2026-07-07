/**
 * EXERCISE react/17 — Implement useThrottle
 *
 * Implémente `useThrottle(value, limit)` qui renvoie une version "throttlée"
 * de `value` : au plus une mise à jour toutes les `limit` ms.
 * - Au montage, renvoie la valeur initiale.
 * - Si `value` change plusieurs fois pendant la fenêtre de `limit` ms, seule
 *   la DERNIÈRE valeur est appliquée, exactement `limit` ms après la
 *   dernière mise à jour effective (pas après chaque changement individuel).
 *
 * Contrairement à useDebounce, le throttle ne réinitialise pas le timer à
 * chaque changement : la fenêtre reste ancrée sur la dernière mise à jour
 * effective.
 *
 * Indice : useRef pour mémoriser le timestamp de la dernière mise à jour,
 * useEffect + setTimeout pour planifier la prochaine, et n'oublie pas de
 * nettoyer le timer dans le cleanup.
 *
 * Run: npm run react:17
 */

"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// À implémenter
// ---------------------------------------------------------------------------

export function useThrottle<T>(value: T, limit: number): T {
  // TODO: your code here
  const [throttledValue, setThrottledValue] = useState(value);

  return throttledValue;
}

// ---------------------------------------------------------------------------
// Démo — ne pas modifier
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
        placeholder="Rechercher..."
      />
      <span data-testid="throttled">{throttled}</span>
    </div>
  );
}
