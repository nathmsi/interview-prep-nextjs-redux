# Algo 06 — Evaluate Reverse Polish Notation

> **Pattern:** Stack  
> **Function:** `evaluateRPN`  
> **Exercise:** `content/exercises/algo/06-evaluate-rpn/`

## Problem

Evaluate an arithmetic expression in **postfix** notation.

Operators: `+`, `-`, `*`, `/`  
Division **truncates toward zero** (`7 / 3 = 2`, `7 / -3 = -2`).

## Examples

- `["2","1","+","3","*"]` → `9` — `(2 + 1) * 3`
- `["4","13","5","/","+"]` → `6` — `4 + 13/5`
- `["3"]` → `3`

## Important

When popping for an operator:

- First pop = **right** operand
- Second pop = **left** operand  
- Compute `left op right` (e.g. `3 - 2 = 1`, not `2 - 3`)

## TypeScript cheatsheet

`OPERATORS` is already exported in `exercise.ts`:

```typescript
const OPERATORS = new Set(["+", "-", "*", "/"]);

const stack: number[] = [];

for (const token of tokens) {
  if (OPERATORS.has(token)) {
    const b = stack.pop()!; // right operand (pop first)
    const a = stack.pop()!; // left operand

    switch (token) {
      case "+":
        stack.push(a + b);
        break;
      case "-":
        stack.push(a - b);
        break;
      case "*":
        stack.push(a * b);
        break;
      case "/":
        stack.push(Math.trunc(a / b)); // truncate toward zero
        break;
    }
  } else {
    stack.push(Number(token)); // string → number
  }
}

return stack.pop()!;
```

## Run locally

```bash
npm run algo:06
```
