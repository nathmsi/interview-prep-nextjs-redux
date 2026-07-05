# Curriculum — front-end interview prep

## Site subjects (navbar + home)

| Subject | Folder | Lessons |
|---------|--------|---------|
| JavaScript | [javascript/](./javascript/) | 3 levels Q&A |
| TypeScript | [typescript/](./typescript/) | Interactive quiz |
| React | [react/](./react/) | Hooks + quiz + coding exercises |
| Next.js | [nextjs/](./nextjs/) | 10 chapters |
| CSS | [css/](./css/) | Q&A + styling libraries |
| Tailwind CSS | [tailwind/](./tailwind/) | 15 chapters — React & Next.js |
| Libraries | [libraries/](./libraries/) | Essential libs + UI/tooling |
| AI & coding | [ai/](./ai/) | Prompts, Skills, Rules, docs, review |

## Coding tracks (dedicated app sections)

| Track | Lessons | Exercises | App route |
|-------|---------|-----------|-----------|
| Algorithms | `algo/` | `../exercises/algo/` | `/algo` |
| Node.js backend | `nodejs-backend/` | `../exercises/nodejs-backend/` | `/nodejs` |
| Express | `nodejs-express/` | `../exercises/nodejs-express/` | `/express` |

## Hidden from UI (Redux / Next.js labs)

| Level | Labs |
|-------|------|
| **easy** | Server/Client, Redux Provider |
| **medium** | Async thunk, cart, route handlers, selectors |
| **hard** | RTK Query, optimistic UI, hydration |

Theory markdown: `content/lessons/easy|medium|hard/*.md` — URLs still work (`/lessons/easy/...`) for direct links.

Workflow for labs:

1. Read `content/lessons/<level>/XX-*.md`
2. Code in `content/exercises/<level>/.../exercise.tsx`
3. `npm run test:exercises`
4. Compare `solutions/`
