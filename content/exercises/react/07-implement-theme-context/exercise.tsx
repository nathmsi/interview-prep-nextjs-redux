/**
 * EXERCISE react/07 — Theme Context
 *
 * Implement ThemeProvider, useTheme, and ThemeToggle.
 * - Theme is "light" | "dark", default "light"
 * - toggle() switches theme
 * - ThemeToggle shows current theme and calls toggle on click
 * Run: npm run react:07
 */

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }): React.ReactElement {
  // TODO: your code here
  return <ThemeContext.Provider value={null}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeToggle(): React.ReactElement {
  // TODO: use useTheme()
  return (
    <button data-testid="theme-toggle" type="button">
      light
    </button>
  );
}
