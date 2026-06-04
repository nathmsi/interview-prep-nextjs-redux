import { describe, it, expect } from "vitest";
import { getLesson, getLessonsByLevel, getLessonsByTrack, lessons } from "@/lib/lessons";

describe("lessons metadata", () => {
  it("30 lessons total (9 labs + 16 react + 1 TS + 3 JS + 1 CSS)", () => {
    expect(lessons).toHaveLength(30);
  });

  it("3 javascript interview courses", () => {
    expect(getLessonsByTrack("javascript")).toHaveLength(3);
  });

  it("1 css interview course", () => {
    expect(getLessonsByTrack("css")).toHaveLength(1);
  });

  it("16 react courses including quiz", () => {
    expect(getLessonsByTrack("react")).toHaveLength(16);
  });

  it("typescript quiz lesson", () => {
    expect(getLessonsByTrack("typescript")).toHaveLength(1);
    expect(getLesson("typescript", "quiz-questions")?.title).toContain("TypeScript");
  });

  it("getLessonsByLevel", () => {
    expect(getLessonsByLevel("easy")).toHaveLength(2);
    expect(getLessonsByLevel("medium")).toHaveLength(4);
    expect(getLessonsByLevel("hard")).toHaveLength(3);
  });

  it("getLesson finds by slug", () => {
    const l = getLesson("easy", "01-server-vs-client");
    expect(l?.title).toContain("Server");
    expect(getLesson("easy", "unknown")).toBeUndefined();
  });
});
