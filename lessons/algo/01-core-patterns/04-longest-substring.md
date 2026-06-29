# Algo 04 — Longest Substring Without Repeating Characters

> **Pattern:** Sliding window  
> **Function:** `lengthOfLongestSubstring`  
> **Exercise:** `src/exercises/algo/04-longest-substring/`

## Problem

Given a string, return the length of the longest substring with **no repeated character**.

## Examples

- `"abcabcbb"` → `3` (`"abc"`)
- `"bbbbb"` → `1`
- `"pwwkew"` → `3` (`"wke"`)
- `"dvdf"` → `3` (`"vdf"`)

## Constraints

- Target: **O(n)** — use sliding window, not O(n²) brute force

## Hint

1. `left` and `right` pointers
2. Track chars in the window with a `Set`
3. On duplicate → shrink from `left` until valid again

## TypeScript cheatsheet

```typescript
// Set — O(1) add / has / delete
const seen = new Set<string>();
seen.add("a");
seen.has("a");   // true
seen.delete("a");

// Two pointers
let left = 0;
let max = 0;

// for loop with right pointer
for (let right = 0; right < s.length; right++) {
  const char = s[right];

  // while — shrink window until valid
  while (seen.has(char)) {
    seen.delete(s[left]);
    left++;
  }

  seen.add(char);
  max = Math.max(max, right - left + 1);
}

// String access by index
s[0]; // first character
```

## Run locally

```bash
npm run algo:04
```
