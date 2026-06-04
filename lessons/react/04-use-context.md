# useContext — read shared tree data

> **React 19** · Course only

## What it does

`useContext(MyContext)` returns the nearest `MyContext.Provider` value above in the tree.

Good for: theme, locale, auth session, feature flags — data many components need without prop drilling.

## Interview questions

- **Performance?** All consumers re-render when provider value changes — split contexts or memoize value object.
- **Context vs Redux?** Context = simple broadcast; Redux = middleware, devtools, complex updates, selectors.
- **Default value?** `createContext(default)` used when no Provider — useful for tests, risky in prod if forgotten.

## Example

```tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<Theme>("light");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={theme}>
      {children}
      <button type="button" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
        Toggle theme ({theme})
      </button>
    </ThemeContext.Provider>
  );
}

export function ThemedCard() {
  const theme = useContext(ThemeContext);
  return (
    <div className={theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"}>
      Current theme: {theme}
    </div>
  );
}
```
