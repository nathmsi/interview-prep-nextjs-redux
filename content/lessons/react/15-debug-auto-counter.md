# React — Debug: Auto Counter

> **Kind:** Exercise (find the bugs)  
> **Component:** `AutoCounter`  
> **File:** `content/exercises/react/01-debug-auto-counter/exercise.tsx`

## Context (typical Israeli interview)

Many companies run a **live debugging** round:

1. React theory (hooks, lifecycle, reconciliation)
2. **Read buggy code and fix it** ← this exercise
3. LeetCode-style algo (`rand7`, anagrams, etc.)

## Expected behaviour

- Counter starts at `0`
- Auto-increments every **100ms**
- Button `+1` adds one immediately, even on **rapid clicks**

## How to approach

1. Run tests: `npm run react:01`
2. Read the failing assertions — what behaviour is wrong?
3. Check `useEffect` deps and `setState` updaters
4. Fix **only** `exercise.tsx`

## Bugs to hunt (try yourself first)

<details>
<summary>Spoiler — click after attempting</summary>

Both the interval and the click handler use `setCount(count + 1)` with a **stale closure**:

- `useEffect(..., [])` captures `count === 0` forever → interval always sets `1`
- Rapid clicks batch `setCount(0 + 1)` → only +1 instead of +3

**Fix:** functional updates everywhere:

```tsx
setCount((c) => c + 1);
```

</details>

## Related React interview topics

Pair with:

- [Interview Q&A recap](/lessons/react/14-interview-questions) — stale closure section
- [Quiz 20 questions](/lessons/react/quiz-questions) — rules of hooks, `useEffect` deps

## Run

```bash
npm run react:01
```
