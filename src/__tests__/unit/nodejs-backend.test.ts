import { describe, expect, it } from "vitest";
import {
  getNodeExercise,
  getNodeSection,
  nodeHref,
  nodeSections,
  totalAvailableNodeExercises,
} from "@/lib/nodejs-backend";

describe("nodejs-backend catalog", () => {
  it("lists all eight sections as available", () => {
    const available = nodeSections.filter((s) => s.available);
    expect(available).toHaveLength(8);
    expect(available.map((s) => s.slug)).toEqual([
      "01-http-fundamentals",
      "02-middleware",
      "03-validation",
      "04-auth-security",
      "05-data-layer",
      "06-rate-limit-cache",
      "07-error-handling",
      "08-production-patterns",
    ]);
  });

  it("exposes 32 exercises across all sections", () => {
    expect(totalAvailableNodeExercises()).toBe(32);
  });

  it("resolves exercise metadata with category folder paths", () => {
    const exercise = getNodeExercise("01-http-fundamentals", "01-parse-url");
    expect(exercise?.functionName).toBe("parseUrl");
    expect(exercise?.exercisePath).toBe(
      "content/exercises/nodejs-backend/01-http-fundamentals/01-parse-url"
    );
    expect(exercise?.lessonPath).toBe(
      "content/lessons/nodejs-backend/01-http-fundamentals/01-parse-url.md"
    );
  });

  it("builds hrefs", () => {
    expect(nodeHref("02-middleware")).toBe("/nodejs/02-middleware");
    expect(nodeHref("02-middleware", "01-compose-middleware")).toBe(
      "/nodejs/02-middleware/01-compose-middleware"
    );
  });

  it("section 4 has four auth exercises ending at node:16", () => {
    const section = getNodeSection("04-auth-security");
    expect(exerciseCount(section)).toBe(4);
    expect(getNodeExercise("04-auth-security", "04-verify-jwt")?.testCommand).toBe(
      "npm run node:16"
    );
  });

  it("section 8 ends at node:32", () => {
    expect(getNodeExercise("08-production-patterns", "04-retry-backoff")?.testCommand).toBe(
      "npm run node:32"
    );
  });
});

function exerciseCount(section: ReturnType<typeof getNodeSection>) {
  return section?.subsections.reduce((n, s) => n + s.exercises.length, 0) ?? 0;
}
