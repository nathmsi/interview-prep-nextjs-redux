import { describe, expect, it } from "vitest";
import {
  algoHref,
  algoSections,
  getAlgoExercise,
  getAlgoSection,
  totalAvailableExercises,
} from "@/lib/algo";

describe("algo catalog", () => {
  it("lists all eight sections as available", () => {
    const available = algoSections.filter((s) => s.available);
    expect(available).toHaveLength(8);
    expect(available.map((s) => s.slug)).toEqual([
      "01-core-patterns",
      "02-hashmap-set",
      "03-two-pointers",
      "04-binary-search",
      "05-linked-list",
      "06-trees-bfs-dfs",
      "07-dynamic-programming",
      "08-fullstack-js",
    ]);
  });

  it("exposes 57 exercises across all sections", () => {
    expect(totalAvailableExercises()).toBe(57);
  });

  it("resolves exercise metadata with category folder paths", () => {
    const exercise = getAlgoExercise("01-core-patterns", "01-merge-intervals");
    expect(exercise?.functionName).toBe("mergeIntervals");
    expect(exercise?.exercisePath).toBe(
      "content/exercises/algo/01-core-patterns/01-merge-intervals"
    );
    expect(exercise?.lessonPath).toBe(
      "content/lessons/algo/01-core-patterns/01-merge-intervals.md"
    );
  });

  it("resolves hashmap exercise", () => {
    const exercise = getAlgoExercise("02-hashmap-set", "01-two-sum");
    expect(exercise?.testCommand).toBe("npm run algo:08");
  });

  it("builds hrefs", () => {
    expect(algoHref("02-hashmap-set")).toBe("/algo/02-hashmap-set");
    expect(algoHref("02-hashmap-set", "01-two-sum")).toBe(
      "/algo/02-hashmap-set/01-two-sum"
    );
  });

  it("groups section 1 into subsections", () => {
    const section = getAlgoSection("01-core-patterns");
    expect(section?.subsections).toHaveLength(3);
    expect(section?.folder).toBe("01-core-patterns");
  });

  it("section 2 has five hashmap exercises", () => {
    const section = getAlgoSection("02-hashmap-set");
    expect(exerciseCount(section)).toBe(5);
    expect(getAlgoExercise("02-hashmap-set", "04-valid-anagram")?.testCommand).toBe(
      "npm run algo:55"
    );
    expect(getAlgoExercise("02-hashmap-set", "05-find-anagrams-in-string")?.testCommand).toBe(
      "npm run algo:56"
    );
  });

  it("section 4 has three binary search exercises", () => {
    const section = getAlgoSection("04-binary-search");
    expect(section?.available).toBe(true);
    expect(exerciseCount(section)).toBe(3);
    const exercise = getAlgoExercise("04-binary-search", "01-binary-search");
    expect(exercise?.testCommand).toBe("npm run algo:13");
  });

  it("section 5 has four linked list exercises", () => {
    const section = getAlgoSection("05-linked-list");
    expect(exerciseCount(section)).toBe(4);
    expect(getAlgoExercise("05-linked-list", "01-reverse-linked-list")?.testCommand).toBe(
      "npm run algo:16"
    );
  });

  it("section 8 has twenty-nine fullstack exercises ending at algo:57", () => {
    const section = getAlgoSection("08-fullstack-js");
    expect(exerciseCount(section)).toBe(29);
    expect(getAlgoExercise("08-fullstack-js", "28-sleep")?.testCommand).toBe(
      "npm run algo:54"
    );
    expect(getAlgoExercise("08-fullstack-js", "29-rand7")?.testCommand).toBe(
      "npm run algo:57"
    );
  });
});

function exerciseCount(section: ReturnType<typeof getAlgoSection>) {
  return section?.subsections.reduce((n, s) => n + s.exercises.length, 0) ?? 0;
}
