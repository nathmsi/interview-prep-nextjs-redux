/**
 * EXERCISE react/16 — Implement useOnClickOutside
 *
 * Implémente `useOnClickOutside(ref, handler)` :
 * - Écoute les clics sur `document`.
 * - Si le clic a lieu EN DEHORS de l'élément référencé par `ref`, appelle
 *   `handler`.
 * - Si le clic a lieu à l'intérieur, ne fait rien.
 * - Nettoie le listener au démontage.
 *
 * Indice : useEffect + document.addEventListener("mousedown", ...), et
 * `ref.current.contains(event.target)` pour savoir si le clic est à
 * l'intérieur.
 *
 * Run: npm run react:16
 */

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// ---------------------------------------------------------------------------
// À implémenter
// ---------------------------------------------------------------------------

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
): void {
  // TODO: your code here
}

// ---------------------------------------------------------------------------
// Démo — ne pas modifier
// ---------------------------------------------------------------------------

export function Dropdown() {
  const [open, setOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(panelRef, () => setOpen(false));

  return (
    <div>
      <div ref={panelRef} data-testid="panel">
        {open ? "open" : "closed"}
      </div>
      <button type="button" data-testid="outside">
        outside
      </button>
    </div>
  );
}
