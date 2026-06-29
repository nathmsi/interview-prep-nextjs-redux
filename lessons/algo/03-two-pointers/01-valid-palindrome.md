# Algo 11 — Valid Palindrome

> **Category:** Two pointers  
> **Function:** `isValidPalindrome`  
> **Exercise:** `src/exercises/algo/03-two-pointers/01-valid-palindrome/`

## Problem

Return `true` if the string is a palindrome considering only alphanumeric chars, ignoring case.

## Examples

- `"A man, a plan, a canal: Panama"` → `true`
- `"race a car"` → `false`

## TypeScript cheatsheet

```typescript
const isAlphaNum = (c: string) => /[a-z0-9]/i.test(c);

let left = 0;
let right = s.length - 1;

while (left < right) {
  while (left < right && !isAlphaNum(s[left])) left++;
  while (left < right && !isAlphaNum(s[right])) right--;

  if (s[left].toLowerCase() !== s[right].toLowerCase()) {
    return false;
  }
  left++;
  right--;
}

return true;
```

## Run

```bash
npm run algo:11
```
