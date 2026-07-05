# Lesson 03 (hard) — SSR & hydration with Redux

> **Level:** Hard  
> **Exercise:** `content/exercises/hard/03-hydration-redux/`

## Problem

If server HTML shows `count=0` but the client store hydrates to `5`, React reports a **mismatch**.

## Solutions

1. **Client-only** for anything that reads Redux (this repo’s pattern).
2. **Preload**: serialize `initialState` from the server in a `<script>` and `makeStore(preloadedState)` — advanced.
3. Do not read `window` / `localStorage` before `useEffect`.

## App Router rule of thumb

- `layout.tsx`: `StoreProvider` as a client boundary
- Data pages: Server Component fetch → pass serializable props
- Redux for global UI state (cart, modals, UI session)

## Your task

Classify “safe” vs “unsafe” components in the exercise (quiz-style tests).
