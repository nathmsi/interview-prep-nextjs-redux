# Interview Prep — Next.js + React + Redux (TypeScript)

Practice repo for technical interviews: **Next.js App Router**, **Route Handlers** (real API server), typed **Redux Toolkit**, **easy / medium / hard** lessons with solutions.

## Structure

```
lessons/{easy|medium|hard}/*.md     ← theory (also on the web at /lessons/…)
src/exercises/{level}/*/exercise.*  ← your code (TODO)
solutions/{level}/*/solution.*      ← answers (after you try)
src/app/api/                        ← server: products, cart, health
src/store/                          ← reference store (demo + patterns)
```

Index: [lessons/README.md](./lessons/README.md).

## Commands

```bash
cd interview-prep-nextjs-redux
npm install
npm run dev          # http://localhost:3000 — UI + API
npm test             # unit + API + solution checks (Vitest)
npm run test:unit    # store, db, components
npm run test:api     # Route Handlers (integration)
npm run test:solutions # reference solutions/
npm run test:exercises # your TODOs (fail until done)
npm run test:e2e     # Playwright (UI + API)
npm run test:all     # Vitest + E2E
npm run test:watch
npm run typecheck
npm run build
```

## Tests

| Type | Folder | Command |
|------|--------|---------|
| **Unit** | `src/__tests__/unit/` | `npm run test:unit` |
| **Components** | `src/__tests__/components/` | included in `test:unit` |
| **API (integration)** | `src/__tests__/api/` | `npm run test:api` |
| **Solutions** | `solutions/**/*.verify.test.*` | `npm run test:solutions` |
| **Exercises** | `src/exercises/` | `npm run test:exercises` |
| **E2E** | `e2e/` | `npm run test:e2e` |

GitHub Actions CI: `.github/workflows/ci.yml` (typecheck, Vitest, Playwright, build).

## API (built-in server)

| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | Service health |
| `/api/products` | GET | List (`?category=books`) |
| `/api/products/[id]` | GET | Product detail |
| `/api/cart` | GET, POST, DELETE | In-memory cart |

Data: `src/lib/db.ts` (resets when the server restarts).

## Curriculum

0. **React** — 14 hook courses (theory + example, **no exercises**) → [lessons/react/README.md](./lessons/react/README.md)  
1. **Easy** — Server vs Client, Redux Provider + typed hooks  
2. **Medium** — thunks, cart slice, route handlers, selectors  
3. **Hard** — RTK Query, optimistic updates, hydration / RSC  

## Useful pages

- `/` — home + lesson links  
- `/lessons` — index  
- `/demo` — Redux catalog wired to the API  
- `/api/products` — raw JSON for manual tests (curl, Postman)

## How to work

1. Read the lesson (`lessons/…` or `/lessons/easy/…`).  
2. Implement the exercise without opening `solutions/`.  
3. Run `npm test` until green.  
4. Compare the solution and try the live demo.

## Cursor / AI (no spoilers)

This workspace disables **Cursor Tab** and inline AI suggestions (see `.vscode/settings.json`).  
`solutions/` is in `.cursorignore` so indexing skips reference answers.

To toggle Tab manually: Command Palette → **Disable Cursor Tab** / **Enable Cursor Tab**.

Good luck.
