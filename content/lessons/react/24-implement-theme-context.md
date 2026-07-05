# React — Theme Context

> **Exercise:** `content/exercises/react/07-implement-theme-context/`  
> **Run:** `npm run react:07`

## Problem

`ThemeProvider` + `useTheme()` + `ThemeToggle` switching `light` / `dark`.

## Steps

1. State in provider: `useState<Theme>("light")`
2. `toggle` flips theme
3. Pass `{ theme, toggle }` via context
4. `useTheme` reads context (throw if missing provider)

## Interview angle

Context API without prop drilling — very common live coding.
