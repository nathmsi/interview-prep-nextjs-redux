# React hooks — interview Q&A recap

> **Verifiable talking points** · pair with hook lessons 01–13

## Learning goals

- Answer rules of hooks, stale closure, keys in under 60s each
- Connect React 19 APIs (useActionState, useOptimistic, `use`) to one sentence each

---

## Rules & mental model

**Q: Rules of hooks?**  
A: Top level only; only in React functions (components/custom hooks).

**Verify:** ESLint `react-hooks/rules-of-hooks` fails on conditional hooks.

---

**Q: Render vs commit?**  
A: Render = compute UI (pure). Commit = apply DOM. Effects run **after** commit.

---

**Q: Infinite loop in useEffect?**  
A: `setState` in effect with missing/wrong deps.

**Verify pattern:** effect without `[]` that sets state → loop; fix deps or remove effect.

---

## State & closures

**Q: Stale closure?**  
A: Handler/effect captures old state → functional update `setS(s => ...)` or fix deps.

**Verify:**

```tsx
// stale risk
useEffect(() => { setTimeout(() => setCount(count + 1), 1000); }, []);
// better
useEffect(() => { setTimeout(() => setCount((c) => c + 1), 1000); }, []);
```

---

## Lists & keys

**Q: Why keys?**  
A: Identity across renders — wrong keys break state/focus.

**Q: Index as key?**  
A: Only if list is static, never reordered/filtered.

---

## Performance

**Q: React.memo?**  
A: Skip re-render if props shallow-equal — measure first.

**Q: When NOT to optimize?**  
A: Premature `useMemo` everywhere.

---

## React 19

| API | One line |
|-----|----------|
| `useActionState` | Form action + pending + returned state |
| `useOptimistic` | Temporary UI until mutation settles |
| `use` | Read promise/context in render (Suspense) |

---

## Next.js tie-in

**Q: Hooks in Server Components?**  
A: **No** — server uses async/await; client boundary `"use client"`.

**Q: Redux?**  
A: Client Provider + hooks only.

---

## Custom hooks

```tsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return { on, toggle: () => setOn((v) => !v) };
}
```

**Verify:** same rules as hooks — name starts with `use`.

---

## Study path

1. Lessons [01](./01-use-state.md)–[13](./13-use-imperative-handle.md)  
2. [Quiz (interactive)](/lessons/react/quiz-questions)
