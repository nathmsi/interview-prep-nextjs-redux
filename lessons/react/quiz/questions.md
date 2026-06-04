# React interview quiz — 20 questions

> **Basic → Pro** · React 18/19 · Answer on paper or out loud first.

Do **not** open [solutions](./solutions.md) until you have attempted each question.

---

## Basic (1–5)

### 1. What is JSX?

Explain what JSX is and what happens to it before the browser runs your code.

### 2. Props vs state

What is the difference between **props** and **state**? Who owns each?

### 3. Rules of Hooks

List the two main rules of hooks and why they exist.

### 4. `useState` updater

When should you use the functional form `setState(prev => ...)` instead of `setState(newValue)`?

### 5. Controlled vs uncontrolled inputs

What is a **controlled** input in React? How does it differ from an **uncontrolled** input?

---

## Intermediate (6–10)

### 6. `useEffect` dependency array

What happens if you omit the dependency array? What about `[]` vs `[userId]`?

### 7. Stale closure

What is a **stale closure** in a `useEffect` or event handler? Give one way to fix it.

### 8. `useContext` trade-offs

When is `useContext` a good fit? Name one performance pitfall.

### 9. `useReducer` vs `useState`

In which situations do you prefer `useReducer` over `useState`?

### 10. List keys

Why does React need a **`key`** on list items? When is using the array **index** as key dangerous?

---

## Advanced (11–15)

### 11. `useMemo` / `useCallback`

What problem do they solve? When is memoization **not** worth it?

### 12. `useRef` vs `useState`

Both hold mutable values. Why update `ref.current` instead of state when you do not need a re-render?

### 13. `useTransition`

What does `startTransition` do? Give one UX example where it helps.

### 14. Error boundaries

Can you implement an error boundary with a hook? If not, what do you use instead?

### 15. Custom hooks

What makes a function a valid **custom hook**? What can you reuse inside it?

---

## Pro (16–20)

### 16. `useSyncExternalStore`

Why did React add this hook? What problem does it solve vs `useState` + `useEffect` subscription?

### 17. `use` (React 19)

How is the `use` hook different from other hooks regarding **where** you can call it?

### 18. `useOptimistic` / `useActionState`

Name one use case for **`useOptimistic`** and one for **`useActionState`** in a modern app.

### 19. Server vs Client Components (Next.js + React)

Can you use `useState` in a Server Component? Why or why not?

### 20. Hydration mismatch

What is a **hydration mismatch**? Give two common causes in a React + SSR app.

---

## Scoring (self-check after solutions)

| Range | Level |
|-------|--------|
| 0–8 | Review basics + hooks 01–05 |
| 9–14 | Solid intermediate — practice effects & state |
| 15–18 | Advanced — ready for most front-end interviews |
| 19–20 | Pro — deep React 19 + SSR awareness |

**Solutions:** [solutions.md](./solutions.md) (open only after trying).
