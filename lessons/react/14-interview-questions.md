# React hooks — interview Q&A recap

> **React 19** · Course only

Quick answers you can say out loud in a technical interview.

---

## Rules & mental model

**Q: What are the rules of hooks?**  
A: Only call at the top level; only from React functions (components or custom hooks). No hooks in loops, conditions, or nested functions.

**Q: What is the render phase vs commit phase?**  
A: Render = call component, compute JSX (must be pure). Commit = apply DOM updates. Effects run after commit.

**Q: Why did my infinite loop happen?**  
A: `useEffect(() => { setX(1) })` without deps, or deps that change every render (new object/array identity).

---

## State & closures

**Q: Stale closure?**  
A: Event handler or effect captures old state. Fix: correct deps, functional updates `setS(s => ...)`, or ref for latest value.

**Q: When lift state up?**  
A: When two siblings must share the same data — move state to common parent (or context / external store).

---

## Lists & keys

**Q: Why keys?**  
A: Help React match items across renders. Wrong keys → bugs, lost input focus, wrong animation.

**Q: Index as key?**  
A: OK only if list is static, never reordered/filtered. Otherwise use stable ids.

---

## Performance

**Q: React.memo?**  
A: Skips re-render if props shallow-equal. Use when profiling shows wasted renders on heavy children.

**Q: When NOT to optimize?**  
A: Premature `useMemo` everywhere; measure first.

---

## React 19 specifics

**Q: What's new for forms?**  
A: `useActionState`, form `action` prop, better pending states; often paired with Server Actions in Next.js.

**Q: useOptimistic vs manual optimistic UI?**  
A: Built-in hook keeps optimistic state in sync with transitions and committed state.

**Q: What is the `use` hook?**  
A: Read promise (Suspense) or context in render; can be conditional unlike other hooks.

---

## Next.js tie-in (often asked with React)

**Q: Hooks in Server Components?**  
A: No — hooks are client-only. Server Components use async/await, `use` on server, or fetch directly.

**Q: Where does Redux live?**  
A: Client Components + Provider in layout — same as any hook-based library.

---

## Custom hooks (bonus)

**Q: Why extract a custom hook?**  
A: Reuse stateful logic (name must start with `use`). Share behavior, not JSX.

```tsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return { on, toggle: () => setOn((v) => !v), setOn };
}
```
