# Algo 57 — Rand7 from Rand5

> **Category:** Full-stack / practical JS (probability)  
> **Function:** `rand7`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/29-rand7/`

## Problem (LeetCode 470)

`rand5()` returns a uniform integer in `[1, 5]`.  
Implement `rand7(rand5)` returning a uniform integer in `[1, 7]`.

You can call `rand5()` as many times as needed.

## Why interviewers ask this

- Tests **probability / rejection sampling**, not just loops
- Very common in **Israeli tech interviews** (junior → senior)
- Cousin problems: `rand10` from `rand7`, dice simulation, reservoir sampling intro

## Classic solution — rejection sampling

Two calls give 25 equally likely outcomes (`5 × 5`):

```
num = (rand5() - 1) * 5 + rand5()   // 1..25 uniform
```

Only keep `num <= 21` (21 = 7 × 3, divisible by 7). Remap:

```
return ((num - 1) % 7) + 1
```

Rejected values (22–25) → retry in a loop.

## TypeScript cheatsheet

```typescript
export function rand7(rand5: () => number): number {
  while (true) {
    const num = (rand5() - 1) * 5 + rand5();
    if (num <= 21) {
      return ((num - 1) % 7) + 1;
    }
  }
}
```

## Talking points

| Question | Answer |
|----------|--------|
| Why reject 22–25? | 25 outcomes can't split evenly into 7 buckets |
| Is the loop infinite? | No — each trial has 21/25 accept probability |
| Uniform? | Accepted values partition 1..21 into 3 full cycles of 1..7 |

## Run

```bash
npm run algo:57
```
