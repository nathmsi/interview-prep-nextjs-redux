/**
 * EXERCISE react/04 — Debug: Interval Cleanup
 *
 * Timer calls onTick every 100ms. After unmount, onTick must stop.
 * Find and fix the missing cleanup. Run: npm run react:04
 */

"use client";

import { useEffect } from "react";

export function Timer({ onTick }: { onTick: () => void }): null {
  useEffect(() => {
    const id = setInterval(onTick, 100);
    return () => {
      clearTimeout(id)
    }
  }, [onTick]);

  return null;
}
