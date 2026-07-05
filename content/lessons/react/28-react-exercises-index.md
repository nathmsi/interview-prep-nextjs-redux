# React — 10 hands-on exercises

> Debug + implement · typical live interview patterns

## Debug (find the bug)

| # | Command | Topic |
|---|---------|-------|
| 01 | `npm run react:01` | Stale closure — auto counter |
| 02 | `npm run react:02` | Missing `useEffect` deps — greeting |
| 03 | `npm run react:03` | Wrong list `key` |
| 04 | `npm run react:04` | Missing interval cleanup |
| 08 | `npm run react:08` | Reset state when prop changes |

## Implement (write from stub)

| # | Command | Topic |
|---|---------|-------|
| 05 | `npm run react:05` | Custom hook `useToggle` |
| 06 | `npm run react:06` | Controlled search + filter |
| 07 | `npm run react:07` | Context + provider |
| 09 | `npm run react:09` | `useFetch` + loading/error |
| 10 | `npm run react:10` | `useReducer` |

## Suggested order

1. Debug 01 → 02 → 04 (closures & effects)
2. Implement 05 → 06 (hooks basics)
3. Debug 03 → 08 (keys & props)
4. Implement 07 → 09 → 10 (context, fetch, reducer)

## Theory backup

- [Interview Q&A](/lessons/react/14-interview-questions)
- [Quiz 20 questions](/lessons/react/quiz-questions)
