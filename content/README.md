# Curriculum content

All learning material lives here, separate from the Next.js app in `src/`.

```
content/
├── lessons/     # Markdown courses and exercise write-ups (read in the browser)
└── exercises/   # Coding stubs + Vitest tests (run locally)
```

## Workflow

1. Read the lesson: `content/lessons/<track>/<slug>.md` (or browse `/lessons/...` in the app)
2. Code in: `content/exercises/<track>/...`
3. Run tests: `npm run test:exercises` or per-exercise scripts (`algo:01`, `react:01`, `node:01`, `server:01`)
4. Compare with `solutions/` when stuck

## Tracks

| Folder | App route | Test command prefix |
|--------|-----------|---------------------|
| `lessons/algo/` + `exercises/algo/` | `/algo` | `npm run algo:XX` |
| `lessons/nodejs-backend/` + `exercises/nodejs-backend/` | `/nodejs` | `npm run node:XX` |
| `lessons/nodejs-express/` + `exercises/nodejs-express/` | `/express` | `npm run server:XX` |
| `lessons/react/` + `exercises/react/` | `/lessons/react/...` | `npm run react:XX` |
| `lessons/easy|medium|hard/` + `exercises/easy|medium|hard/` | `/lessons/<level>/...` | `npm run test:exercises` |

Path helpers for the app: `src/lib/content-paths.ts`.

Index of theory courses: [lessons/README.md](./lessons/README.md).
