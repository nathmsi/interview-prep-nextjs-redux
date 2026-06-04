# Curriculum — Next.js + Redux + TypeScript

| Niveau | # | Sujet | Exercice |
|--------|---|--------|----------|
| **Easy** | 01 | Server vs Client Components | `src/exercises/easy/01-server-vs-client/` |
| **Easy** | 02 | Redux Provider + hooks typés | `src/exercises/easy/02-redux-provider/` |
| **Medium** | 01 | `createAsyncThunk` + API | `src/exercises/medium/01-async-thunk/` |
| **Medium** | 02 | Slice panier + sync API | `src/exercises/medium/02-cart-slice/` |
| **Medium** | 03 | Route Handlers REST | `src/exercises/medium/03-route-handlers/` |
| **Medium** | 04 | Selectors mémorisés | `src/exercises/medium/04-selectors-memo/` |
| **Hard** | 01 | RTK Query | `src/exercises/hard/01-rtk-query/` |
| **Hard** | 02 | Mises à jour optimistes | `src/exercises/hard/02-optimistic-cart/` |
| **Hard** | 03 | SSR / hydration Redux | `src/exercises/hard/03-hydration-redux/` |

## Workflow

1. Lire `lessons/<level>/XX-*.md` (ou la page web `/lessons/...`)
2. Coder dans `src/exercises/.../exercise.tsx`
3. `npm test` jusqu'au vert
4. Comparer `solutions/<level>/.../solution.tsx`

Le serveur API est intégré à Next : `npm run dev` expose `/api/products`, `/api/cart`, etc.
