/**
 * EXERCISE nodejs — Validate Fields
 *
 * Validate presence and typeof for each rule key.
 *
 * Hint: Push error messages into array
 * Run: npm run node:10
 */

export type FieldRules = Record<string, "string" | "number" | "boolean">;
export type ValidationResult = { valid: true } | { valid: false; errors: string[] };
export function validateFields(data: Record<string, unknown>, rules: FieldRules): ValidationResult {
  // TODO: your code here
  return { valid: false, errors: [] };
}