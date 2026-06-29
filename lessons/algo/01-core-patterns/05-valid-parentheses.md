# Algo 05 — Valid Parentheses

> **Pattern:** Stack  
> **Function:** `isValidParentheses`  
> **Exercise:** `src/exercises/algo/05-valid-parentheses/`

## Problem

Given a string of `()`, `{}`, `[]`, determine if brackets are valid:

- Every opener has a matching closer of the same type
- Closers match the most recent unmatched opener

## Examples

- `"()"` → `true`
- `"()[]{}"` → `true`
- `"(]"` → `false`
- `"([)]"` → `false`
- `""` → `true`

## Hint

1. Opening bracket → **push**
2. Closing bracket → **pop** and check it matches
3. End → stack must be **empty**

## TypeScript cheatsheet

`PAIRS` is already exported in `exercise.ts`:

```typescript
const PAIRS: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
};

const stack: string[] = [];

// for...of — iterate a string
for (const char of s) {
  if (char === "(" || char === "[" || char === "{") {
    stack.push(char);
    continue;
  }

  const open = stack.pop(); // undefined if stack empty
  if (!open || open !== PAIRS[char]) {
    return false;
  }
}

return stack.length === 0;
```

Useful array methods: `push`, `pop`, `length`.

## Run locally

```bash
npm run algo:05
```
