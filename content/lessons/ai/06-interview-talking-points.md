# AI for coding — interview talking points

> Honest, professional answers — companies want **judgment**, not tool worship.

## Learning goals

- Answer ethically about take-homes and interviews
- Show structured workflow (not “I let ChatGPT code”)
- Balance speed with quality

---

## Interview answer (30 seconds) — core

> I use AI daily to **accelerate** implementation and exploration, not to replace thinking. I provide context, ask for small changes, review diffs, and run CI. I’m strongest when combining AI speed with solid fundamentals — tests, types, security, and clear docs.

---

## “How do you use AI in your workflow?”

Structured answer (STAR-friendly):

1. **Plan** — ticket / bullets, acceptance criteria  
2. **Context** — relevant files, rules, skills  
3. **Implement** — agent or inline completion  
4. **Verify** — tests, manual path, security scan  
5. **Document** — PR description, update README if needed  

---

## “What tools?”

Name what you actually use — no need to list everything:

| Tool | You might say |
|------|----------------|
| Cursor | Agent + rules + skills in repo |
| Copilot | Inline completions in VS Code |
| ChatGPT / Claude | Spikes, explanations, regex drafts |
| CI | Truth — tests don’t lie |

---

## Ethics & take-home tests

**If AI allowed:**  
“I use AI like I use Stack Overflow — I disclose it if asked, cite understanding in the debrief, and submit code I can explain line by line.”

**If AI forbidden:**  
“I don’t use generative AI on the assignment; I rely on docs and fundamentals.”

**Never:** Submit code you cannot explain or debug live.

---

## “Risks of AI?”

- Hallucinated APIs and packages  
- Security bugs in auth/data handling  
- Uniform “average” architecture  
- Skill atrophy if you never code without it  

**Mitigation:** VERIFY loop, tests, review, fundamentals practice (like this site’s exercises without AI).

---

## “How do you keep quality?”

- Small PRs  
- Mandatory review (human or self with checklist)  
- TypeScript strict  
- E2E on critical paths  
- Project **Rules** + **Skills** for consistency  

---

## “Skills and documentation?”

> I keep **Rules** for conventions, **Skills** for repeatable multi-step tasks, and a short **AGENTS.md** so the tool knows our folder layout. Good README **Commands** and **Structure** sections save everyone time.

---

## Red flags interviewers watch for

- Cannot explain own PR  
- No tests  
- “AI wrote it” as excuse for bugs  
- Unfamiliar with git diff  

---

## Green flags

- Mentions verification explicitly  
- Knows when **not** to use AI  
- Documents decisions  
- Uses types and automated checks  

---

## Quick drill (60s each)

1. Explain VERIFY without reading notes  
2. When would you refuse AI for a task?  
3. How do Rules differ from Skills?  
4. What never goes in the chat?  

---

## Study path in this repo

1. [Mindset](./01-mindset-and-workflow.md)  
2. [Prompts](./02-prompts-and-context.md)  
3. [Skills & rules](./03-skills-rules-and-docs.md)  
4. [Docs](./04-documentation-for-ai.md)  
5. [Review & security](./05-review-tests-security.md)  

Back to [AI subject](/subjects/ai)
