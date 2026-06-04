import { describe, it, expect } from "vitest";
import { getLesson, getLessonsByLevel, getLessonsByTrack, lessons } from "@/lib/lessons";

describe("lessons metadata", () => {
  it("52 lessons total (9 hidden labs + 43 interview courses)", () => {
    expect(lessons).toHaveLength(52);
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
});
