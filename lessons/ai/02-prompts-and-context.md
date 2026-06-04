# AI for coding — prompts & context

> Quality of output ≈ quality of **context** + **constraints**.

## Learning goals

- Write prompts with goal, constraints, and done criteria
- Attach the right files (not everything)
- Iterate with errors and diffs, not vague “fix it”

---

## Interview answer (30 seconds)

> I write prompts like mini tickets: **goal**, **files in scope**, **constraints** (stack, style), and **definition of done** (tests pass). I paste **exact errors** and point to symbols. I ask for the **smallest change** and reject drive-by refactors.

---

## Prompt template (copy-paste)

```markdown
## Goal
One sentence: what should work after this change?

## Context
- Stack: Next.js 16, React 19, TypeScript strict
- Relevant files: @src/lib/subjects.ts @src/app/subjects/[subject]/page.tsx

## Constraints
- Minimal diff; no unrelated refactors
- Match existing naming and patterns
- English UI copy; French only if I ask

## Done when
- [ ] npm test passes
- [ ] npm run build passes
- [ ] Manual: /subjects/ai loads

## Current problem
(paste error log or describe bug)
```

---

## Context: what to attach

| Attach | When |
|--------|------|
| 1–5 related files | Implementing a feature |
| Failing test output | Fixing a bug |
| `package.json` | Dependency questions |
| API schema / types | Integration work |
| Screenshot + DOM | UI bugs |

**Do not** attach: entire `node_modules`, secrets, unrelated features.

---

## Good vs bad prompts

### Bad

> fix the bug

### Good

> `npm run test:e2e` fails on `home.spec.ts` — strict mode finds 2 links matching "CSS". We added `/subjects/css`. Update selectors to use `getByRole('navigation')` scoped links. Run e2e after.

### Bad

> make it better

### Good

> Refactor `SubjectCard` only: extract `lessonCount` display to a prop, no style changes, keep tests green.

---

## Iteration pattern

1. First response wrong → paste **diff** + “keep X, change only Y”  
2. Still wrong → paste **test failure** verbatim  
3. Third try → narrow scope: “only edit `e2e/home.spec.ts`”  

### Verify it

After each agent turn:

```bash
git diff --stat
npm test
```

If diff touches files outside scope → revert those hunks.

---

## `@` mentions (Cursor / similar tools)

- `@file` — precise symbol awareness  
- `@folder` — use sparingly (token cost, noise)  
- `@docs` — official framework docs when API changed  
- `@web` — only when docs may be outdated; still verify  

---

## Constraints that improve code

- “TypeScript strict, no `any`”  
- “Server Component unless hooks needed”  
- “Do not change public API of `lessons.ts` without updating tests”  
- “Follow pattern in `SubjectCard.tsx`”  

---

## Common mistakes

| Mistake | Result |
|---------|--------|
| Huge first prompt | Confused refactor across repo |
| No “done when” | AI stops early or over-builds |
| Ignoring agent questions | Wrong assumptions shipped |
| Mixing 3 tasks in one chat | Context pollution — start new chat |

---

## Checklist

- [ ] Used goal + constraints + done when in last prompt  
- [ ] Pasted full error, not paraphrase  
- [ ] Reviewed `git diff --stat` before accepting  

Next: [Skills, rules & docs →](./03-skills-rules-and-docs.md)
