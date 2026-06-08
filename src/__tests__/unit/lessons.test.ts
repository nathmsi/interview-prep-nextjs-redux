import { describe, it, expect } from "vitest";
import {
  getAdjacentLessons,
  getLesson,
  getLessonsByLevel,
  getLessonsByTrack,
  lessons,
} from "@/lib/lessons";

describe("lessons metadata", () => {
  it("67 lessons total (9 hidden labs + 58 interview courses)", () => {
    expect(lessons).toHaveLength(67);
  });

  it("6 AI & coding courses", () => {
    expect(getLessonsByTrack("ai")).toHaveLength(6);
  });

  it("4 typescript courses including quiz", () => {
    expect(getLessonsByTrack("typescript")).toHaveLength(4);
  });

  it("10 nextjs framework courses", () => {
    expect(getLessonsByTrack("nextjs")).toHaveLength(10);
    expect(getLesson("nextjs", "04-route-handlers-api")?.title).toContain("API");
  });

  it("3 javascript interview courses", () => {
    expect(getLessonsByTrack("javascript")).toHaveLength(3);
  });

  it("css and libraries interview courses", () => {
    expect(getLessonsByTrack("css")).toHaveLength(2);
    expect(getLessonsByTrack("libraries")).toHaveLength(2);
  });

  it("15 tailwind courses with react and nextjs integration", () => {
    expect(getLessonsByTrack("tailwind")).toHaveLength(15);
    expect(getLesson("tailwind", "01-setup-nextjs")?.title).toContain("Next.js");
    expect(getLesson("tailwind", "14-nextjs-integration")).toBeDefined();
  });

  it("16 react courses including quiz", () => {
    expect(getLessonsByTrack("react")).toHaveLength(16);
  });

  it("typescript quiz lesson metadata", () => {
    expect(getLesson("typescript", "quiz-questions")?.title).toContain("TypeScript");
    expect(getLesson("typescript", "01-types-and-narrowing")).toBeDefined();
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

  it("getAdjacentLessons returns prev and next within track", () => {
    const { prev, next } = getAdjacentLessons("tailwind", "02-utility-first");
    expect(prev?.slug).toBe("01-setup-nextjs");
    expect(next?.slug).toBe("03-layout-flex-grid");
  });

  it("getAdjacentLessons omits prev on first lesson", () => {
    const { prev, next } = getAdjacentLessons("tailwind", "01-setup-nextjs");
    expect(prev).toBeUndefined();
    expect(next?.slug).toBe("02-utility-first");
  });

  it("getAdjacentLessons omits next on last lesson", () => {
    const { prev, next } = getAdjacentLessons("tailwind", "15-interview-questions");
    expect(prev?.slug).toBe("14-nextjs-integration");
    expect(next).toBeUndefined();
  });
});
