/**
 * EXERCISE algo/06 — Evaluate Reverse Polish Notation
 *
 * Problem
 * -------
 * Evaluate the value of an arithmetic expression in Reverse Polish Notation (RPN).
 *
 * Valid operators: +, -, *, /
 * Operands are integers (given as strings in the input array).
 *
 * Division truncates toward zero: 7 / 3 = 2, 7 / -3 = -2
 *
 * You may assume the input is always valid (no division by zero).
 *
 * Examples
 * - ["2", "1", "+", "3", "*"]           → 9    ((2 + 1) * 3)
 * - ["4", "13", "5", "/", "+"]          → 6    (4 + 13/5)
 * - ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"] → 22
 * - ["3"]                               → 3
 *
 * Constraints
 * - 1 <= tokens.length <= 10_000
 * - Target complexity: O(n) time, O(n) space
 *
 * Hint
 * 1. Same pattern as valid parentheses: use a stack
 * 2. Number → push onto stack
 * 3. Operator → pop two numbers, compute, push result back
 * 4. At the end, stack has one value — that's the answer
 *
 * Related: algo/05 — valid parentheses (stack + scan left to right)
 *
 * Run: npm run algo:06
 */

const OPERATORS = new Set(["+", "-", "*", "/"]);


export function evaluateRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const token of tokens) {
    switch (token) {
      case "+": {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(Number(b) + Number(a));
        break;
      }
      case "-": {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(Number(a) - Number(b));
        break;
      }
      case "*": {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(Number(b) * Number(a));
        break;
      }
      case "/": {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(Math.trunc(Number(a) / Number(b)));
        break;
      }
      default: {
        stack.push(Number(token));
      }
    }
  }
  return Number(stack[0]);
}

export { OPERATORS };
