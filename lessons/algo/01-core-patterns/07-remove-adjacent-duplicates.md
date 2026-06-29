# Algo 07 — Remove Adjacent Duplicates

> **Pattern:** Stack  
> **Function:** `removeAdjacentDuplicates`  
> **Exercise:** `src/exercises/algo/07-remove-adjacent-duplicates/`

## Problem

Repeatedly remove **adjacent duplicate** characters until none remain.

## Examples

- `"abbaca"` → `"ca"`
- `"azxxzy"` → `"ay"`
- `"aabccba"` → `"a"`
- `"aabb"` → `""`

## Hint

One pass with a stack:

- If char equals stack top → **pop** (cancel pair)
- Else → **push**
- Return `stack.join("")`

Target: **O(n)** time.

## TypeScript cheatsheet

```typescript
const stack: string[] = [];

for (const char of s) {
  // Last element without pop
  const top = stack.at(-1);

  if (top === char) {
    stack.pop(); // cancel the pair
  } else {
    stack.push(char);
  }
}

// Array → string
return stack.join("");
```

Compare with string methods (slower for this problem):

```typescript
s.split("");     // string → char array
str.slice(0, i); // substring without mutating
str.includes(c); // O(n) — avoid inside a loop
```

Prefer **stack + push/pop** for O(n).

## Run locally

```bash
npm run algo:07
```
