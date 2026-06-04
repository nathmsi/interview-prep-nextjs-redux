# AI for coding — mindset & workflow

> You stay the **engineer**; AI is a fast junior that never gets tired but often hallucinates.

## Learning goals

- Know when AI helps vs hurts
- Use a repeatable loop: spec → generate → **verify** → ship
- Avoid “vibe coding” without tests

---

## Interview answer (30 seconds)

> I treat AI as a **pair programmer**, not an author. I give **clear context** (files, constraints, errors), ask for **small diffs**, then **verify** with tests, types, and reading the diff. I never paste secrets, and I own every line I merge — especially security and architecture.

---

## When AI is strong

| Task | Why |
|------|-----|
| Boilerplate | Repetitive, well-known patterns |
| Refactors | Rename, extract, update imports |
| Explaining errors | Stack traces + file context |
| Tests from spec | Table-driven cases you review |
| Regex / SQL drafts | You validate edge cases |
| Docs from code | Draft README; you fix inaccuracies |

## When to slow down (human-first)

| Task | Why |
|------|-----|
| Auth, crypto, payments | High stakes — design yourself |
| Subtle concurrency | AI mixes race conditions |
| New architecture | AI averages “common” designs |
| Performance tuning | Needs profiling data |
| Legal / compliance | Not a lawyer |

---

## The VERIFY loop (use every time)

```text
V — Vocalize the goal (one sentence + constraints)
E — Explore context (@ files, docs, error output)
R — Request small change (one feature / one bug)
I — Inspect diff (every file, every line)
F — Run tests (unit, e2e, typecheck, lint)
Y — You commit (only what you understand)
```

### Verify it — checklist before merge

- [ ] `git diff` read line by line
- [ ] `npm test` / `npm run build` green
- [ ] No new `any`, no disabled eslint rules without reason
- [ ] No `.env` or API keys in chat or commits
- [ ] Behavior matches ticket, not just “compiles”

---

## Good daily workflow (Cursor / IDE agent)

1. **Plan** — 3–5 bullet spec in the chat or ticket  
2. **Scope** — one PR-sized task (“add subject page”, not “rebuild app”)  
3. **Context** — attach relevant files, not whole repo  
4. **Generate** — let agent edit; avoid 500-line paste wars  
5. **Verify** — tests + manual click path  
6. **Document** — one line in PR / README if behavior changed  

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| “Build me the whole app” | Split into steps with acceptance criteria |
| Accept code you don’t read | Treat diff review as mandatory |
| No tests | Ask AI to add tests **you** run |
| Chat without repo context | `@` files, rules, skills |
| Copy Stack Overflow + AI blend | One source of truth: your tests |

---

## Anti-patterns (say no in interviews)

- Shipping AI output on Friday without CI  
- Letting AI pick dependencies you don’t recognize  
- Removing types “to make it compile”  
- Using AI for take-home **without** disclosure when forbidden  

---

## Checklist

- [ ] Can explain VERIFY in under 60s  
- [ ] Named 3 tasks where you would **not** delegate to AI  
- [ ] Described your real verify commands (`test`, `lint`, `build`)

Next: [Prompts & context →](./02-prompts-and-context.md)
