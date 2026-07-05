/** Root folders for curriculum content (lessons + exercises), separate from the Next.js app. */
export const CONTENT_ROOT = "content";
export const LESSONS_ROOT = `${CONTENT_ROOT}/lessons`;
export const EXERCISES_ROOT = `${CONTENT_ROOT}/exercises`;

export function lessonPath(...segments: string[]): string {
  return [LESSONS_ROOT, ...segments].join("/");
}

export function exercisePath(...segments: string[]): string {
  return [EXERCISES_ROOT, ...segments].join("/");
}
