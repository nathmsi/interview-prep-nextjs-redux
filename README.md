# Front-end Interview Prep

Technical interview preparation for **front-end developers**: JavaScript, TypeScript, React, Next.js, CSS (including styling libraries), and essential npm libraries.

**Live site:** https://interview-prep-nextjs-redux.vercel.app

## Subjects (in the app)

| Subject | Content |
|---------|---------|
| **JavaScript** | Basic / medium / hard Q&A (+ TypeScript tie-ins) |
| **TypeScript** | 20-question interactive quiz |
| **React** | 14 hook lessons + quiz + 10 coding exercises |
| **Next.js** | 10-lesson framework course (App Router, API, RSC…) |
| **CSS** | Interview Q&A + styling libraries (Tailwind, Modules, shadcn…) |
| **Libraries** | What to use and why (React Query, Zod, RHF, testing…) |
| **AI & coding** | Prompts, Cursor Skills/Rules, docs, verify before merge |

Browse: `npm run dev` → http://localhost:3000  

Each subject has its own page: `/subjects/javascript`, `/subjects/css`, `/subjects/react`, etc.

## Repository layout

```
content/
  lessons/      ← markdown courses (theory + exercise instructions)
  exercises/    ← coding stubs + Vitest tests (your workspace)
src/
  app/          ← Next.js routes (/lessons, /algo, /nodejs, /express…)
  lib/          ← metadata registries linking lessons ↔ exercises
solutions/      ← reference answers (verify with npm run test:solutions)
```

See [content/README.md](./content/README.md) for the full curriculum map.

## Hands-on exercises

Redux + Next.js labs:

```
content/exercises/{easy|medium|hard}/
content/lessons/{easy|medium|hard}/*.md
```

```bash
npm run test:exercises   # your TODOs
npm run test:solutions   # reference answers
```

API for exercises: `/api/products`, `/api/cart` (in-memory, for local practice).

## Commands

```bash
npm install
npm run dev
npm test              # unit + API + solutions
npm run test:e2e      # Playwright
npm run test:all
npm run build
```

Index: [content/lessons/README.md](./content/lessons/README.md)
