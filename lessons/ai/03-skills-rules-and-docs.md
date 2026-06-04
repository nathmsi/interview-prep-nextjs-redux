# AI for coding — Skills, Rules & project docs

> **Skills** = reusable playbooks · **Rules** = always-on constraints · **Docs** = map of the repo for humans and AI.

## Learning goals

- Difference between Cursor Rules, Skills, and AGENTS.md
- When to create a Skill vs a Rule
- Point agents at the right doc, not the whole README

---

## Interview answer (30 seconds)

> **Rules** enforce how the agent works in this repo — language, test commands, no force-push. **Skills** are procedures for repeatable tasks like “add a lesson subject”. **AGENTS.md** or a short architecture doc tells the agent where things live so I don’t re-explain the tree every chat.

---

## Cursor Rules (`.cursor/rules/` or User Rules)

**What:** Persistent instructions merged into context.

**Good for:**

- “Respond in French when user writes French”
- “Run `npm test` before claiming done”
- “Never commit unless asked”
- Stack conventions (App Router, no Pages Router)

**Bad for:**

- One-off task steps (use Skill or prompt)
- Entire API documentation (link to file)

### Example rule snippet (project)

```markdown
- Minimal diff; match existing lesson markdown style (## Verify it, Interview answer 30s).
- Interview site: course content in lessons/, UI in src/app/.
- Before push: npm test && npm run test:e2e && npm run build.
```

### Verify it

Open **Cursor Settings → Rules** — confirm your project rules appear in agent chats.

---

## Agent Skills (`SKILL.md`)

**What:** A focused playbook the agent reads when the task matches (create PR, add lesson, deploy).

**Structure (typical):**

```markdown
---
name: add-lesson-subject
description: Add a new interview subject with lessons and nav wiring.
---

# Add lesson subject
1. Create lessons/<track>/...
2. Register in src/lib/lessons.ts
3. Add to src/lib/subjects.ts
4. Update lessons.test.ts counts
5. Run npm test && npm run test:e2e
```

**When to create a Skill:**

- You do the same multi-file workflow monthly  
- New contributors (or future you) must not miss step 4  
- CI steps are always the same  

**When NOT:**

- Single-file typo fix  
- Experimental one-time spike  

### Verify it

Pick a task you repeat → write a 10-line Skill → next time invoke “use the X skill” and check all files get touched.

---

## AGENTS.md / CONTRIBUTING.md

**AGENTS.md** (repo root or subfolders): “how an agent should navigate this codebase”.

```markdown
# Agent guide
- Lessons: lessons/<track>/*.md → registered in src/lib/lessons.ts
- Subject pages: src/app/subjects/[subject]/page.tsx
- Tests: npm test (vitest), npm run test:e2e (playwright)
- Do not edit src/exercises in UI tasks unless asked
```

**CONTRIBUTING.md:** humans + agents — branch, commit style, PR checklist.

### Verify it

Ask agent: “Where do I register a new lesson?” — correct answer should cite `lessons.ts` without guessing.

---

## User vs Project vs Team rules

| Layer | Scope |
|-------|--------|
| User | Your preferences all projects |
| Project | This repo only — commit in git |
| Team | Org standards (Cursor Team) |

Project rules win for **code conventions**; user rules for **language / tone**.

---

## `.cursorignore`

Exclude from AI indexing (spoilers, huge artifacts):

```text
solutions/
**/quiz/solutions.md
```

**Why:** quiz answers and solutions shouldn’t leak into Tab completion while you practice.

### Verify it

Confirm ignored paths don’t appear in `@` search results.

---

## Skills vs docs vs prompts

| Tool | Lifetime | Use |
|------|----------|-----|
| Prompt | One chat | This bug now |
| Skill | Repeatable workflow | Add subject, ship PR |
| Rule | Always | Conventions, safety |
| Doc | Reference | Architecture map |

---

## Common mistakes

- 50 rules that contradict each other → trim and prioritize  
- Skill that duplicates entire README → link one doc  
- Rules that say “be perfect” without commands → add `npm test`  
- Committing API keys into rules “for convenience”  

---

## Checklist

- [ ] Project has at least one rule with test command  
- [ ] You know one Skill you’d author for your job  
- [ ] AGENTS.md or README “Structure” section exists  

Next: [Documentation for AI →](./04-documentation-for-ai.md)
