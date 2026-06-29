/**
 * EXERCISE algo/08 — Expression Calculator
 *
 * Evaluate a math expression string and return the numeric result.
 * Supports +, -, *, /, parentheses, and whitespace.
 *
 * Examples
 * - calc("4*5/(3*3)")  → 20/9 ≈ 2.222...
 * - calc("1+2*3")      → 7
 * - calc("(1+2)*3")    → 9
 *
 * Hint: recursive descent — expression → term → factor
 * Run: npm run algo:39
 */

export function calc(expression: string): number {
  const fullExpression = expression.replace(/\s/g, "");
  let index = 0;

  const isNumber = (val: unknown) => Number.isFinite(val);

  const getResultFromExpression = (str: string) => {
    // without parentheses
    let a: string = "";
    let b: string = "";
    let expr: string = "";

    const calc = () => {
      if (expr === "*") {
        return Number(a) * Number(b);
      }
      if (expr === "+") {
        return Number(a) + Number(b);
      }
      if (expr === "+") {
        return Number(a) + Number(b);
      }
      if (expr === "/") {
        return Number(a) / Number(b);
      }
      return 0;
    };

    while (index <= str.length - 1) {
      if (isNumber(Number(str.at(index)))) {
        if (expr) {
          b += str.at(index);
        } else {
          a += str.at(index);
        }
        index++;
      } else {
        expr = str.at(index) || ""; // +,-,/,*
        index++;
        if (b !== undefined) {
          a = String(calc());
          b = '';
        }
      }
    }

    return calc();
  };

  return getResultFromExpression(fullExpression);
}
