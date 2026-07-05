/**
 * EXERCISE algo/02 — Valid Anagram
 *
 * Given two strings s and t, return true if t is an anagram of s.
 * An anagram uses the same letters with the same frequencies (order does not matter).
 *
 * Examples
 * - s = "anagram", t = "nagaram" → true
 * - s = "rat", t = "car"         → false
 * - s = "", t = ""               → true
 *
 * Hint: compare sorted strings, or count char frequencies in a Map / array
 * Run: npm run algo:55
 */

export function isAnagram(s: string, t: string): boolean {
  const dictionary: Record<string,number> = {};

  for (const letter of s) {
    if (Object.hasOwn(dictionary, letter)) {
      dictionary[letter]++;
    } else {
      dictionary[letter] = 1;
    }
  }

  for (const letter of t) {
    if (Object.hasOwn(dictionary, letter)) {
      dictionary[letter]--;
    } else {
      return false;
    }
  }

  return Object.keys(dictionary).every(letter => dictionary[letter] === 0);
}

