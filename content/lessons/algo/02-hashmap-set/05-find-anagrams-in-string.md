# Algo 56 — Find All Anagrams in a String

> **Category:** HashMap / Set + sliding window  
> **Function:** `findAnagrams`  
> **Exercise:** `content/exercises/algo/02-hashmap-set/05-find-anagrams-in-string/`

## Problem

Given `s` and `p`, return every **start index** in `s` where a substring of length `p.length` is an anagram of `p`.

## Examples

- `s = "cbaebabacd"`, `p = "abc"` → `[0, 6]` (`"cba"` and `"bac"`)
- `s = "abab"`, `p = "ab"` → `[0, 1, 2]`

## Mental model

Valid Anagram compares **two whole strings**. Here you slide a window of size `p.length` over `s` and ask: *does this slice have the same letter counts as `p`?*

```
s = "cbaebabacd"   p = "abc"
     [cba]ebabacd  → index 0 ✓
      cbae[bab]acd → no
      ...
      cbaebab[acd] → no
      cbaeba[bac]d → index 6 ✓
```

## Approach — sliding window + frequency

1. Build frequency map for `p`
2. Maintain a window of length `p.length` on `s`
3. Compare window counts with `p` (or track how many letters still match)
4. Slide right: add new char, remove char leaving the window

**Complexity:** O(n) time, O(1) space if alphabet is fixed (26 lowercase letters).

## TypeScript cheatsheet

```typescript
function findAnagrams(s: string, p: string): number[] {
  if (p.length > s.length) return [];

  const need = new Array(26).fill(0);
  for (const ch of p) need[ch.charCodeAt(0) - 97]++;

  const window = new Array(26).fill(0);
  const result: number[] = [];
  let matches = 0; // how many of the 26 slots have need[i] === window[i]

  for (let i = 0; i < s.length; i++) {
    const add = s.charCodeAt(i) - 97;
    window[add]++;
    if (window[add] === need[add]) matches++;
    else if (window[add] === need[add] + 1) matches--;

    const remove = i - p.length;
    if (remove >= 0) {
      const idx = s.charCodeAt(remove) - 97;
      window[idx]--;
      if (window[idx] === need[idx]) matches++;
      else if (window[idx] === need[idx] - 1) matches--;
    }

    if (i >= p.length - 1 && matches === 26) {
      result.push(i - p.length + 1);
    }
  }

  return result;
}
```

## Interview chain

| Step | Question |
|------|----------|
| 1 | Valid Anagram — same counts? |
| 2 | Group Anagrams — bucket by signature |
| 3 | **Find Anagrams in String** — sliding window |
| 4 | Permutation in String — boolean version |
| 5 | Minimum Window Substring — harder variant |

## Run

```bash
npm run algo:56
```
