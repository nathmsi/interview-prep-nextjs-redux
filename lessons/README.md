# Curriculum — Next.js + Redux + TypeScript

## React hooks (course only)

14 lessons in [react/](./react/) — interview Q&A + one code example each. **No exercises.**

## Next.js + Redux (hands-on)

| Level | # | Topic | Exercise |
|-------|---|--------|----------|
| **Easy** | 01 | Server vs Client Components | `src/exercises/easy/01-server-vs-client/` |
| **Easy** | 02 | Redux Provider + typed hooks | `src/exercises/easy/02-redux-provider/` |
| **Medium** | 01 | `createAsyncThunk` + API | `src/exercises/medium/01-async-thunk/` |
| **Medium** | 02 | Cart slice + API sync | `src/exercises/medium/02-cart-slice/` |
| **Medium** | 03 | Route Handlers REST | `src/exercises/medium/03-route-handlers/` |
| **Medium** | 04 | Memoized selectors | `src/exercises/medium/04-selectors-memo/` |
| **Hard** | 01 | RTK Query | `src/exercises/hard/01-rtk-query/` |
| **Hard** | 02 | Optimistic updates | `src/exercises/hard/02-optimistic-cart/` |
| **Hard** | 03 | SSR / Redux hydration | `src/exercises/hard/03-hydration-redux/` |

## Workflow

1. Read `lessons/<level>/XX-*.md` (or the web page `/lessons/...`)
2. Code in `src/exercises/.../exercise.tsx`
3. `npm test` until green
4. Compare `solutions/<level>/.../solution.tsx`

The API server is built into Next: `npm run dev` exposes `/api/products`, `/api/cart`, etc.
