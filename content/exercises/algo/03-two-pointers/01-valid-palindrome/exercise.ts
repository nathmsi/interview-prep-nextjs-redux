/**
 * EXERCISE algo/03 — Valid Palindrome
 *
 * Given a string, return true if it is a palindrome after considering
 * only alphanumeric characters and ignoring cases.
 *
 * Examples
 * - "A man, a plan, a canal: Panama" → true
 * - "race a car" → false
 * - "" → true
 *
 * Hint: left / right pointers, skip non-alphanumeric
 * Run: npm run algo:11
 */

export function isValidPalindrome(s: string): boolean {
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
}
