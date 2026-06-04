# UI kits, bundlers & DX tooling

> **Libraries session (part 2)** — what interviewers expect you to recognize

---

## Accessible UI primitives

### Radix UI

Unstyled, WAI-ARIA–correct primitives (Dialog, Dropdown, Tabs).  
**Why:** you bring CSS (often Tailwind); accessibility handled.

### Headless UI

Similar from Tailwind Labs — good with Tailwind projects.

**Interview:** “We use Radix/shadcn so we don’t rebuild focus traps and keyboard nav.”

---

## Full UI frameworks

| Library | Strength | Watch out |
|---------|----------|-----------|
| **MUI** | Complete Material Design | Bundle size, customization |
| **Ant Design** | Enterprise tables/forms | Heavier aesthetic |
| **Chakra** | Simple theme tokens | Less default in new Next apps |

**Story:** “MUI for admin dashboards with dense tables; marketing site uses Tailwind + headless.”

---

## Animation

- **Framer Motion** — layout animations, gestures (client-only)  
- **CSS** `transform` / `opacity` — prefer for performance  

In RSC apps: animate client islands, not the whole page tree.

---

## Icons

- **lucide-react** — tree-shakeable, common with shadcn  
- **react-icons** — many sets, watch bundle if importing entire pack  

---

## Bundlers & meta-frameworks

| Tool | Role |
|------|------|
| **Vite** | Fast dev SPA/ library builds |
| **Next.js** | React framework + routing + SSR/RSC |
| **Turbopack** | Next dev bundler (faster HMR) |
| **Webpack** | Still under the hood in many production builds |

**Interview:** “Vite for standalone React; Next when we need SSR, API routes, and file routing.”

---

## TypeScript & lint

- **typescript** — non-negotiable on serious front teams  
- **eslint** + **eslint-config-next** — hooks rules, import hygiene  
- **prettier** — formatting debates end  
- **tsc --noEmit** in CI — this repo runs `npm run typecheck`  

---

## Testing

| Tool | Use |
|------|-----|
| **Vitest** | Unit + integration (fast, Vite-native) — **this repo** |
| **Jest** | Still common in older codebases |
| **React Testing Library** | user-centric component tests |
| **Playwright** | E2E browser — **this repo** `npm run test:e2e` |
| **MSW** | mock HTTP in tests |

**Line:** “RTL for behavior; Playwright for critical paths; MSW to stub APIs.”

---

## Docs & design handoff

- **Storybook** — isolated component development  
- **Figma** — design tokens → CSS variables / Tailwind theme  

---

## Monorepo (senior bonus)

- **Turborepo** / **Nx** — shared packages (`ui`, `config-eslint`)  
- **pnpm workspaces** — disk-efficient installs  

---

## Auth (often asked with Next)

- **Auth.js (NextAuth)** — sessions, OAuth providers  
- **Clerk** / **Supabase Auth** — hosted UX  
- **Passkeys** — emerging; know conceptually  

---

## i18n

- **next-intl** / **react-i18next** — app translations  
- Know **SSR** must ship correct locale HTML for SEO  

---

## “Why this library?” script

1. **Problem** (server cache, a11y dialog, form perf)  
2. **Options** (2–3 names)  
3. **Pick** (team skill, bundle, RSC compatibility)  
4. **Tradeoff** (learning curve, lock-in)  

---

## What to avoid saying

- “I use Redux for everything including server lists”  
- “CSS-in-JS everywhere in Server Components” without nuance  
- Can’t name **any** test runner  

---

## Tie-in to this repo

- **Lessons:** browser UI for interview content  
- **Exercises:** `src/exercises/` — Redux/Next labs (local only, not in site nav)  
- **Tests:** Vitest + Playwright in CI  

You’re ready to discuss **libraries as engineering decisions**, not trivia.
