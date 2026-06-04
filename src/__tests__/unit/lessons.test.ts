import { describe, it, expect } from "vitest";
import { getLesson, getLessonsByLevel, getLessonsByTrack, lessons } from "@/lib/lessons";

describe("lessons metadata", () => {
  it("23 lessons total (9 labs + 14 react courses)", () => {
    expect(lessons).toHaveLength(23);
  });

  it("14 react hook courses", () => {
    expect(getLessonsByTrack("react")).toHaveLength(14);
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
