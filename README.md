# Front-end Interview Prep

Technical interview preparation for **front-end developers**: JavaScript, TypeScript, React, Next.js, CSS (including styling libraries), and essential npm libraries.

**Live site:** https://interview-prep-nextjs-redux.vercel.app

## Subjects (in the app)

| Subject | Content |
|---------|---------|
| **JavaScript** | Basic / medium / hard Q&A (+ TypeScript tie-ins) |
| **TypeScript** | 20-question interactive quiz |
| **React** | 14 hook lessons + quiz |
| **Next.js** | 10-lesson framework course (App Router, API, RSC…) |
| **CSS** | Interview Q&A + styling libraries (Tailwind, Modules, shadcn…) |
| **Libraries** | What to use and why (React Query, Zod, RHF, testing…) |
| **AI & coding** | Prompts, Cursor Skills/Rules, docs, verify before merge |

Browse: `npm run dev` → http://localhost:3000  

Each subject has its own page: `/subjects/javascript`, `/subjects/css`, `/subjects/react`, etc.

## Hands-on exercises (repo only, not in site UI)

Redux + Next.js labs remain under:

```
src/exercises/{easy|medium|hard}/
solutions/{easy|medium|hard}/
lessons/{easy|medium|hard}/*.md
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

## Structure

```
lessons/{javascript|typescript|react|nextjs|css|libraries}/  ← courses (web UI)
src/app/lessons/          ← lesson pages
src/exercises/            ← coding labs (local)
src/app/api/              ← Route Handlers for exercises
```

Index: [lessons/README.md](./lessons/README.md)
