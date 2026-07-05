/**
 * EXERCISE react/01 — Debug: Auto Counter
 *
 * Expected behaviour:
 * - Count auto-increments every 100ms
 * - Clicking "+1" adds one immediately (including rapid clicks)
 *
 * The code has bugs — find and fix them so tests pass.
 * Do not change the test file.
 *
 * Hint: stale closure in useEffect / setState
 * Run: npm run react:01
 */

"use client";

import { useEffect, useState } from "react";

export function AutoCounter(): React.ReactElement {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(old => old + 1)
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <span data-testid="count">{count}</span>
      <button
        data-testid="increment"
        type="button"
        onClick={() => setCount(old => old + 1)}
      >
        +1
      </button>
    </div>
  );
}
