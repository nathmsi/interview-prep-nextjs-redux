# React + Algo — classic coding interview round

> Based on common **junior/mid developer** interviews in Israel (HR → TL → R&D)

## Typical 3-part structure

| Round | What they test | Prep in this repo |
|-------|----------------|-------------------|
| **React theory** | Hooks, state, effects, keys, performance | [Quiz 20Q](/lessons/react/quiz-questions), [Interview Q&A](/lessons/react/14-interview-questions) |
| **Debug live code** | Find bugs in a small component | [10 React exercises](/lessons/react/28-react-exercises-index) |
| **Algo (LeetCode style)** | Classic patterns under time pressure | [Algo track](/algo), especially HashMap + [Rand7](/algo/08-fullstack-js/29-rand7) |

## Algo favourites in frontend interviews

| Problem | Pattern | Your exercise |
|---------|---------|---------------|
| Valid Anagram | Frequency count | `algo:55` |
| Group Anagrams | HashMap key | `algo:09` |
| Find Anagrams in String | Sliding window | `algo:56` |
| **Rand7 from Rand5** | Rejection sampling | `algo:57` |
| Two Sum | HashMap complement | `algo:08` |

## Rand7 — 30-second pitch

> « I combine two `rand5()` into 1–25, reject above 21 so the range divides evenly by 7, then map with modulo. Loop until accepted. »

## Debug round — 30-second pitch

> « The interval closes over stale `count` because deps are `[]`. I switch to functional `setState` so each tick uses the latest value. »

## Suggested study order

1. React quiz (theory)
2. Debug auto counter (hands-on)
3. Valid Anagram → Find Anagrams (progression)
4. Rand7 (probability)
