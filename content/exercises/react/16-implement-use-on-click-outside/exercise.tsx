/**
 * EXERCISE react/16 — Implement useOnClickOutside
 *
 * Implement `useOnClickOutside(ref, handler)`:
 * - Listens for clicks on `document`.
 * - If the click happens OUTSIDE the element referenced by `ref`, calls
 *   `handler`.
 * - If the click happens inside, does nothing.
 * - Cleans up the listener on unmount.
 *
 * Hint: useEffect + document.addEventListener("mousedown", ...), and
 * `ref.current.contains(event.target)` to know if the click is inside.
 *
 * Run: npm run react:16
 */

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// ---------------------------------------------------------------------------
// To implement
// ---------------------------------------------------------------------------

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
): void {
  // TODO: your code here
}

// ---------------------------------------------------------------------------
// Demo — do not modify
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
