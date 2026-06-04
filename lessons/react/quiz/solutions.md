# React interview quiz — solutions

> Attempt [questions.md](./questions.md) first.  
> Levels: **Basic** · **Intermediate** · **Advanced** · **Pro**

---

## Basic (1–5)

### 1. What is JSX?

**Answer:** JSX is a syntax extension that looks like HTML inside JavaScript. It is **not** run by the browser as-is. A compiler (Babel, TypeScript, React compiler pipeline) transforms JSX into `React.createElement` or JSX runtime calls that build a **tree of plain objects** (React elements). That tree describes what the UI should look like; React then reconciles it with the DOM.

---

### 2. Props vs state

**Answer:**

| | Props | State |
|---|--------|--------|
| **Owner** | Parent | The component itself |
| **Mutability** | Read-only for the child | Updated via `setState` / `dispatch` |
| **Purpose** | Configure / pass data down | Remember UI that changes over time |

Props flow down; state is local (unless lifted, or stored in context / external store).

---

### 3. Rules of Hooks

**Answer:**

1. **Only call hooks at the top level** — not inside loops, conditions, or nested functions.  
2. **Only call hooks from React function components or custom hooks** — not from class components or random utilities.

**Why:** React relies on **call order** to associate each hook call with the correct state/effect slot for that component instance. Conditional calls would break that mapping.

---

### 4. `useState` updater

**Answer:** Use `setState(prev => next)` when the new state **depends on the previous state**, especially:

- Inside async callbacks (timeouts, fetch) where a closure might have a stale `count`.
- When multiple updates are batched and you must not overwrite a pending update.

For a simple absolute assignment (`setName("Ada")`), the direct form is fine.

---

### 5. Controlled vs uncontrolled inputs

**Answer:**

- **Controlled:** React state is the single source of truth — `value={text}` + `onChange` updates state. React always drives what appears in the input.
- **Uncontrolled:** The DOM holds the value — typically `defaultValue` + `ref` to read on submit. Less React state, harder to validate live.

Controlled is the default in design systems and forms you validate on every keystroke.

---

## Intermediate (6–10)

### 6. `useEffect` dependency array

**Answer:**

| Deps | Behavior |
|------|----------|
| **Omitted** | Effect runs after **every** render (easy infinite loop if you set state inside). |
| **`[]`** | Runs once after **mount** (plus cleanup on unmount). |
| **`[a, b]`** | Runs after mount and whenever `a` or `b` change (by `Object.is` comparison). |

Include every reactive value from the component scope that the effect reads, unless you intentionally want a stale read (rare).

---

### 7. Stale closure

**Answer:** A function (effect or handler) captures **old** props/state from the render when it was created. Example: effect with `[]` deps that logs `count` always sees `0`.

**Fixes:**

- Add correct **dependencies** to the effect.
- Use **functional updates** `setCount(c => c + 1)`.
- Store latest value in a **ref** updated each render (`ref.current = value`) and read `ref.current` in the async callback.

---

### 8. `useContext` trade-offs

**Answer:** Good when many components need the same data (theme, auth, i18n) and prop drilling is painful.

**Pitfall:** When the provider `value` changes, **all consumers re-render**, even if they only use one field. Mitigations: split contexts, memoize children, pass stable value objects, or use a selector library / external store.

---

### 9. `useReducer` vs `useState`

**Answer:** Prefer `useReducer` when:

- State has **multiple related fields** updated together.
- Transitions are modeled as **actions** (good for tests and readability).
- Next state depends on **previous state + action type** (discriminated union).

Stick with `useState` for simple independent flags or one-off values.

---

### 10. List keys

**Answer:** Keys let React **match** items between renders (reorder, add, remove) without reusing the wrong component instance (which would break state inside list items or cause wrong DOM updates).

**Index as key is dangerous** when the list can **reorder, filter, or insert** items — indices shift, React reuses wrong rows, inputs keep wrong values. Use stable ids from data (`item.id`).

---

## Advanced (11–15)

### 11. `useMemo` / `useCallback`

**Answer:** They cache a **computed value** (`useMemo`) or **function reference** (`useCallback`) until dependencies change. That helps when:

- Passing callbacks to **`memo`** children to avoid needless re-renders.
- A pure computation is **measurably expensive**.

**Not worth it** when: cheap calculations, no memoized children, or deps change every render anyway (new object references). Profile first; over-memoization adds memory and complexity.

---

### 12. `useRef` vs `useState`

**Answer:** Updating `ref.current` does **not** schedule a re-render. Use a ref for:

- DOM node handles.
- Timer ids, `AbortController`, previous value tracking.
- Any mutable box that should not trigger UI updates.

Use state when the UI must **reflect** the new value on screen.

---

### 13. `useTransition`

**Answer:** `startTransition` marks state updates as **non-urgent**. React can keep showing the current UI and `isPending` while preparing the deferred update — good for search/filter over large lists, tab switches, or heavy renders while typing stays instant.

Different from debounce: integrated with React scheduling and concurrent features, not a fixed time delay.

---

### 14. Error boundaries

**Answer:** **No hook** for error boundaries. They are **class components** with `static getDerivedStateFromError` and/or `componentDidCatch`, or a small wrapper library.

Hooks like `useEffect` cannot catch render errors in children; only an error boundary (or framework error page) can show fallback UI.

---

### 15. Custom hooks

**Answer:** Name must start with **`use`**. You can call other hooks inside and return anything (state, callbacks, refs). They **reuse stateful logic**, not JSX.

Rules of hooks still apply: only call from top level of the custom hook, only invoke the custom hook from components or other custom hooks.

---

## Pro (16–20)

### 16. `useSyncExternalStore`

**Answer:** Subscribes to **external** stores (browser APIs, Redux, Zustand) in a way safe for **concurrent rendering** — avoids **tearing** (UI showing mixed snapshots from different store versions in one frame).

`useState` + `useEffect` subscribe can read stale external data mid-render. `getServerSnapshot` also supports consistent SSR hydration for external state.

---

### 17. `use` (React 19)

**Answer:** Unlike other hooks, `use(promise)` or `use(context)` can be called **conditionally** when rules are satisfied (e.g. inside Suspense for promises, under a provider for context). It ties into **Suspense** for loading states instead of manual `loading` booleans in many cases.

Still cannot call inside class components or non-React functions.

---

### 18. `useOptimistic` / `useActionState`

**Answer:**

- **`useOptimistic`:** Show immediate UI (e.g. message sent, item in cart) while the server request runs; roll back or reconcile when the real response arrives.
- **`useActionState`:** Wire form submissions to an async **action** with built-in `pending` state and returned form state (errors, success message) — common with Server Actions in Next.js.

---

### 19. Server vs Client Components

**Answer:** **No.** Server Components run on the server, cannot hold instance state or use hooks (`useState`, `useEffect`, etc.). Hooks require a client component (`"use client"` boundary in Next.js).

Server Components fetch data with `async/await`, pass **serializable props** to client children that use hooks.

---

### 20. Hydration mismatch

**Answer:** Server HTML does not match what the client’s first render produces, so React warns and may regenerate the subtree.

**Common causes:**

1. **Non-deterministic render** — `Date.now()`, `Math.random()`, `typeof window` branches without matching server output.
2. **Invalid HTML nesting** or different locale/formatting server vs client.
3. **Browser-only APIs** during initial client render without `useEffect`.
4. **Extension / ad blockers** mutating DOM before hydration (less common in interviews).

**Mitigation:** render stable markup on server, move client-only logic to `useEffect` or client-only components, use `suppressHydrationWarning` only for known safe cases (e.g. timestamps).

---

## Quick revision checklist

- [ ] Can explain rules of hooks in one sentence each  
- [ ] Can draw props ↓ vs state in component  
- [ ] Can fix a stale closure example on a whiteboard  
- [ ] Know when index-as-key fails  
- [ ] Can contrast RSC (no hooks) vs client component  

Good luck.
