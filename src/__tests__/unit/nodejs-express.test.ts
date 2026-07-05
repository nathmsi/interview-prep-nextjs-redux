import { describe, expect, it } from "vitest";
import {
  expressHref,
  expressSections,
  getExpressExercise,
  getExpressSection,
  totalAvailableExpressExercises,
} from "@/lib/nodejs-express";

describe("nodejs-express catalog", () => {
  it("lists six sections as available", () => {
    expect(expressSections.filter((s) => s.available)).toHaveLength(6);
  });

  it("exposes 12 express exercises", () => {
    expect(totalAvailableExpressExercises()).toBe(12);
  });

  it("resolves exercise paths", () => {
    const ex = getExpressExercise("01-basics", "01-hello-express");
    expect(ex?.exercisePath).toBe(
      "content/exercises/nodejs-express/01-basics/01-hello-express"
    );
    expect(ex?.testCommand).toBe("npm run server:01");
  });

  it("builds hrefs", () => {
    expect(expressHref("01-basics")).toBe("/express/01-basics");
    expect(expressHref("06-auth", "01-jwt-auth")).toBe("/express/06-auth/01-jwt-auth");
  });

  it("section 6 has jwt auth ending at server:12", () => {
    const section = getExpressSection("06-auth");
    expect(section?.subsections[0]?.exercises).toHaveLength(1);
    expect(getExpressExercise("06-auth", "01-jwt-auth")?.testCommand).toBe(
      "npm run server:12"
    );
  });
});
