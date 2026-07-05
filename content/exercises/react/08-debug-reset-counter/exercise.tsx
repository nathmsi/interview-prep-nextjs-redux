/**
 * EXERCISE react/08 — Debug: Reset Counter
 *
 * Counter should reset to 0 whenever `resetKey` prop changes.
 * User can increment with the button. Find what's missing.
 * Run: npm run react:08
 */

"use client";

import { useState } from "react";

export function ResettableCounter({
  resetKey,
}: {
  resetKey: number;
}): React.ReactElement {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button
        data-testid="increment"
        type="button"
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  );
}
