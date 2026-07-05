/**
 * EXERCISE nodejs — Error To JSON
 *
 * AppError -> its status. Other -> 500.
 *
 * Hint: isAppError check
 * Run: npm run node:26
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
  return err instanceof AppError;
}

export function errorToJson(err: unknown): { status: number; body: { error: string } } {
  // TODO: your code here
  return { status: 500, body: { error: "Internal error" } };
}