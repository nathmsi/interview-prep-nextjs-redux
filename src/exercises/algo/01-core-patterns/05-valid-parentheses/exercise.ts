/**
 * EXERCISE algo/05 — Valid Parentheses
 *
 * Problem
 * -------
 * Given a string containing only the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * Valid means:
 * - Every opening bracket has a matching closing bracket of the same type
 * - Brackets close in the correct order
 * - Every closing bracket has a corresponding opening bracket before it
 *
 * Examples
 * - "()"       → true
 * - "()[]{}"  → true
 * - "(]"       → false
 * - "([)]"     → false   (wrong order — not interleaved)
 * - "{[]}"     → true
 * - ""         → true
 * - "("        → false
 *
 * Constraints
 * - 0 <= s.length <= 10_000
 * - Target complexity: O(n) time, O(n) space
 *
 * Hint
 * 1. Use a stack (array push/pop)
 * 2. Opening bracket → push onto stack
 * 3. Closing bracket → pop and check it matches the top
 * 4. At the end, stack must be empty
 *
 * Pattern: stack (pairs well with parsing, ASTs, undo/redo in real apps)
 *
 * Run: npm run algo:05
 */

const PAIRS: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
};

// ([)]
export function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  for (const letter of s) {
    if (letter === "(" || letter === "[" || letter === "{") {
      stack.push(letter);
    } else {
      const open = stack.pop(); 
      if (!open || PAIRS[letter] !== open) {
        return false
      }
    }
  }
  return stack.length===0;
}

export { PAIRS };
