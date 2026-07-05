# Algo 55 — Valid Anagram

> **Category:** HashMap / Set  
> **Function:** `isAnagram`  
> **Exercise:** `content/exercises/algo/02-hashmap-set/04-valid-anagram/`

## Problem

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`.

An anagram is a word formed by rearranging the letters of another, using all the original letters exactly once.

## Examples

- `s = "anagram"`, `t = "nagaram"` → `true`
- `s = "rat"`, `t = "car"` → `false`
- `s = ""`, `t = ""` → `true`

## Approaches

**Sort** — O(n log n): if sorted strings are equal, they're anagrams.

**Frequency count** — O(n): count each letter in `s`, decrement for `t`; all counts should end at 0.

## TypeScript cheatsheet

```typescript
if (s.length !== t.length) return false;

const counts = new Map<string, number>();

for (const ch of s) {
  counts.set(ch, (counts.get(ch) ?? 0) + 1);
}

for (const ch of t) {
  const n = counts.get(ch);
  if (!n) return false;
  if (n === 1) counts.delete(ch);
  else counts.set(ch, n - 1);
}

return true;
```

## Run

```bash
npm run algo:55
```
