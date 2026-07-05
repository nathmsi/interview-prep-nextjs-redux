# Algo 39 — Expression Calculator

> **Category:** Full-stack / practical JS  
> **Function:** `calc`  
> **Exercise:** `content/exercises/algo/08-fullstack-js/13-calc-expression/`

## Problem

Evaluate a math expression string like `"4*5/(3*3)"` and return the numeric result.

Supports `+`, `-`, `*`, `/`, parentheses, and whitespace.

## Approach — recursive descent

Three levels of precedence:

```
expression  →  term ( (+|-) term )*
term        →  factor ( (*|/) factor )*
factor      →  number | (expression) | unary -
```

## TypeScript cheatsheet

```typescript
function parseExpression(): number {
  let result = parseTerm();
  while (s[i] === "+" || s[i] === "-") {
    const op = s[i++];
    result = op === "+" ? result + parseTerm() : result - parseTerm();
  }
  return result;
}

function parseTerm(): number {
  let result = parseFactor();
  while (s[i] === "*" || s[i] === "/") {
    const op = s[i++];
    result = op === "*" ? result * parseFactor() : result / parseFactor();
  }
  return result;
}

function parseFactor(): number {
  if (s[i] === "(") { i++; const r = parseExpression(); i++; return r; }
  if (s[i] === "-") { i++; return -parseFactor(); }
  // read digits → Number(num)
}
```

## Examples

| Input | Output |
|-------|--------|
| `"4*5/(3*3)"` | `2.222...` |
| `"1+2*3"` | `7` |
| `"(1+2)*3"` | `9` |

## Run

```bash
npm run algo:39
```
