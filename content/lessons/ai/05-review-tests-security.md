# AI for coding — review, tests & security

> **Trust but verify** — especially for AI-generated code.

## Learning goals

- Review diffs like a senior, not a rubber stamp
- Require tests for AI-written logic
- Know security rules for AI tools

---

## Interview answer (30 seconds)

> I review every AI diff for scope, security, and edge cases. I require **automated tests** and typecheck before merge. I never send secrets to the model, and I watch for hallucinated APIs, wrong package names, and subtle auth bugs. If I can’t explain a line, it doesn’t ship.

---

## Code review checklist (AI diff)

### Scope

- [ ] Only files related to the task changed  
- [ ] No drive-by format of whole repo  
- [ ] No deleted tests “to make green”  

### Correctness

- [ ] Edge cases: null, empty array, error path  
- [ ] Async: await, error handling, race conditions  
- [ ] React: hooks rules, missing `"use client"`  

### Security

- [ ] No secrets in code or chat  
- [ ] SQL/NoSQL injection — parameterized queries  
- [ ] XSS: no `dangerouslySetInnerHTML` without sanitize  
- [ ] Auth checks on server, not only UI hide  

### Quality

- [ ] Types strict, no silent `any`  
- [ ] Names match project conventions  
- [ ] Dependencies exist on npm — **verify package name**  

---

## Tests — make AI prove it

Ask explicitly:

```markdown
Add unit test for getSubject() when id is invalid.
Run npm test and paste summary.
```

### Verify it (this repo)

```bash
npm test
npm run test:e2e
npm run build
```

All three before push — same bar for human and AI code.

---

## Hallucination red flags

| Signal | Action |
|--------|--------|
| Import from non-existent path | Search repo / `tsc` |
| API that “sounds” right | Read official docs |
| Deprecated API (Pages Router) | Check Next version |
| Too perfect, no edge cases | Add failing test first (TDD) |

---

## Security & privacy

**Never put in chat:**

- API keys, `.env`, tokens, passwords  
- Customer PII, production DB dumps  
- Private URLs with auth tokens  

**Prefer:**

- Redacted logs  
- Synthetic fixtures  
- Local dev URLs (`localhost`)  

**Supply chain:**

- Check package before `npm install` unknown lib  
- Lockfile committed (`package-lock.json`)  

---

## When AI code is “good enough”

| Level | Bar |
|-------|-----|
| Prototype | Compiles, happy path manual test |
| Feature PR | Unit + types + review |
| Auth / money | Design review + security checklist + e2e |

---

## Interview scenarios

**Q: “Do you use Copilot?”**  
A: “Yes for boilerplate; I verify with tests and never use it for secrets or auth logic without review.”

**Q: “How do you avoid AI slop?”**  
A: “Small PRs, mandatory diff review, CI, and conventions in Rules.”

---

## Common mistakes

- Green CI on mocked wrong behavior  
- E2E that doesn’t assert real user outcome  
- Removing eslint rule instead of fixing cause  

---

## Checklist

- [ ] Last AI PR: you read full diff  
- [ ] Tests added or updated for behavior change  
- [ ] No secrets in git history from chat paste  

Next: [Interview talking points →](./06-interview-talking-points.md)
