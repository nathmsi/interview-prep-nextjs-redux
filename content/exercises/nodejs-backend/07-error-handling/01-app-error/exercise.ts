/**
 * EXERCISE nodejs — App Error
 *
 * Typed error with statusCode. isAppError type guard.
 *
 * Hint: instanceof
 * Run: npm run node:25
 */

export class AppError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}
export function isAppError(err: unknown): err is AppError {
  // TODO: your code here
  return err instanceof AppError;
}