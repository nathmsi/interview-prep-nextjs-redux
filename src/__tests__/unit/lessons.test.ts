import { describe, it, expect } from "vitest";
import { getLesson, getLessonsByLevel, lessons } from "@/lib/lessons";

describe("lessons metadata", () => {
  it("9 lessons total", () => {
    expect(lessons).toHaveLength(9);
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
