# Algo 09 — Group Anagrams

> **Category:** HashMap / Set  
> **Function:** `groupAnagrams`  
> **Exercise:** `content/exercises/algo/02-hashmap-set/02-group-anagrams/`

## Problem

Group strings that are anagrams. Order of groups/words does not matter.

## Example

`["eat","tea","tan","ate","nat","bat"]` → `[["eat","tea","ate"],["tan","nat"],["bat"]]`

## TypeScript cheatsheet

```typescript
const groups = new Map<string, string[]>();

for (const word of words) {
  const key = word.split("").sort().join(""); // anagram key
  const list = groups.get(key) ?? [];
  list.push(word);
  groups.set(key, list);
}

return Array.from(groups.values());
```

## Run

```bash
npm run algo:09
```
