# AI for coding — documentation that helps AI (and humans)

> Docs are **context cache** — good docs = fewer wrong files touched.

## Learning goals

- Write README sections agents actually use
- Keep architecture and decisions findable
- Comment only non-obvious “why”, not “what”

---

## Interview answer (30 seconds)

> I document **structure**, **commands**, and **decisions**: where routes live, how to test, what not to touch. I avoid stale wiki pages — the repo README and ADRs close to code work best. For AI, short `AGENTS.md` beats a 40-page Confluence link the model can’t fetch.

---

## README structure (agent-friendly)

```markdown
# Project name
One paragraph purpose.

## Commands
npm install
npm test
npm run dev

## Structure
src/app/     — routes
src/lib/     — data / config
lessons/     — markdown courses

## Adding X
1. ...
2. ...

## What not to edit
- secrets, vendor/
```

### Verify it

New chat: ask “how do I run tests?” — answer must match README **Commands**.

---

## Architecture Decision Records (ADR) — light version

One file per big choice: `docs/adr/001-app-router.md`

```markdown
# ADR 001: App Router only
- Status: accepted
- Context: interview prep, Next 16
- Decision: app/ not pages/
- Consequences: Route Handlers in app/api/
```

AI uses this to avoid suggesting `pages/` APIs.

---

## Inline comments — when they help AI

**Good (why):**

```ts
// lessons.ts includes hidden exercise tracks — UI filters via subjects.ts
export const lessons = [...]
```

**Bad (what):**

```ts
// increment i
i++;
```

---

## Types as documentation

TypeScript interfaces for domain:

```ts
export type SubjectId = "javascript" | "typescript" | ...;
```

Agents infer valid values — fewer string typos.

### Verify it

Remove a union member → `tsc` fails — same signal for human and AI.

---

## API & contract docs

- OpenAPI / typed Route Handlers return shapes  
- Example request/response in `lessons/nextjs/04-route-handlers-api.md`  
- Link from README: “API: GET /api/products”  

---

## Changelog & PR descriptions

Teach agents via example:

```markdown
## Summary
- Add AI subject (6 lessons)
## Test plan
- [ ] npm test
- [ ] npm run test:e2e
```

Agents mimic this in future PRs if rule says “use PR template”.

---

## Docs anti-patterns

| Anti-pattern | Problem |
|--------------|---------|
| README outdated | AI confident but wrong |
| Only Notion, not in repo | No @ reference |
| Auto-generated wall of text | Noise — no signal |
| Documenting every variable | Hides real constraints |

---

## This repo map (for your agent)

| Path | Role |
|------|------|
| `lessons/<track>/` | Course markdown |
| `src/lib/lessons.ts` | Lesson registry |
| `src/lib/subjects.ts` | Nav / home subjects |
| `src/app/subjects/` | Subject hub pages |
| `src/app/lessons/` | Lesson renderer + quizzes |
| `src/exercises/` | Hidden labs (not in nav) |
| `e2e/` | Playwright |

---

## Checklist

- [ ] README has Commands + Structure  
- [ ] Non-obvious module has one “why” comment or ADR  
- [ ] Public types for main domain ids  

Next: [Review, tests & security →](./05-review-tests-security.md)
