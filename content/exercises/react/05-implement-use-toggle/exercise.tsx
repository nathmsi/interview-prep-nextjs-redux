/**
 * EXERCISE react/05 — Implement useToggle
 *
 * Implement `useToggle(initial?)` returning `[value, toggle]`.
 * `toggle` flips the boolean. Used by ToggleButton below.
 * Run: npm run react:05
 */

"use client";

import { useState } from "react";

export function useToggle(initial = false): [boolean, () => void] {
  // TODO: your code here
  const [value] = useState(initial);
  return [value, () => {}];
}

export function ToggleButton(): React.ReactElement {
  const [on, toggle] = useToggle(false);

  return (
    <button data-testid="toggle" type="button" onClick={toggle}>
      {on ? "ON" : "OFF"}
    </button>
  );
}
