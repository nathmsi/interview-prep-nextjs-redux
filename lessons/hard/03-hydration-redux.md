# Lesson 03 (hard) — SSR & hydration avec Redux

> **Niveau:** Hard  
> **Exercice:** `src/exercises/hard/03-hydration-redux/`

## Problème

Si le HTML serveur affiche `count=0` mais le store client hydrate à `5`, React signale un **mismatch**.

## Solutions

1. **Client-only** pour tout ce qui lit Redux (pattern de ce repo).
2. **Preload** : sérialiser `initialState` depuis le serveur dans un `<script>` et `makeStore(preloadedState)` — avancé.
3. Ne pas lire `window` / `localStorage` avant `useEffect`.

## Règle pratique App Router

- `layout.tsx` : `StoreProvider` en client boundary
- Pages données : Server Component fetch → passer props sérialisables
- Redux pour état UI global (panier, modales, session UI)

## À faire

Identifier les composants « safe » vs « unsafe » dans l'exercice (quiz typé en tests).
