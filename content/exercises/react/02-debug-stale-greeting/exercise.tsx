/**
 * EXERCISE react/02 — Debug: Stale Greeting
 *
 * Greeting should update when the `name` prop changes.
 * Find and fix the bug. Run: npm run react:02
 */

"use client";

import { useEffect, useState } from "react";

export function Greeting({ name }: { name: string }): React.ReactElement {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(`Hello, ${name}!`);
  }, [name]);

  return <p data-testid="message">{message}</p>;
}
