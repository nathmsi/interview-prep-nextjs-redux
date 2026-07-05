/**
 * EXERCISE algo/02 — Group Anagrams
 *
 * Group strings that are anagrams of each other.
 * Order of groups and words within a group does not matter.
 *
 * Examples
 * - ["eat","tea","tan","ate","nat","bat"] → [["eat","tea","ate"],["tan","nat"],["bat"]]
 * - [""] → [[""]]
 * - ["a"] → [["a"]]
 *
 * Hint: use sorted word or char count as Map key
 * Run: npm run algo:09
 */

type stringArray = string[];

export function groupAnagrams(words: string[]): string[][] {
  // TODO: your code here

  const mappedWordAnagrams: Map<string,stringArray> = new Map();


   for (const word of words) {
    const sortedWord = word.split("").sort().join("");
    if (mappedWordAnagrams.has(sortedWord)) {
      mappedWordAnagrams.set(sortedWord,[
        ...(mappedWordAnagrams.get(sortedWord) ?? []),
        word
      ])
    } else {
      mappedWordAnagrams.set(sortedWord,[word])
    }
   }

   

  return [...mappedWordAnagrams.values()];
}
