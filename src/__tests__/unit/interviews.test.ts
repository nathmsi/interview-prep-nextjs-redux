import { describe, it, expect } from "vitest";
import { getInterview, interviewHref, interviews } from "@/lib/interviews";

describe("interview prep metadata", () => {
  it("lists monday.com E2E prep", () => {
    expect(interviews).toHaveLength(1);
    expect(interviews[0]?.company).toBe("monday.com");
  });

  it("getInterview finds by slug", () => {
    const monday = getInterview("monday-com-e2e");
    expect(monday?.role).toContain("End2End");
    expect(getInterview("unknown")).toBeUndefined();
  });

  it("interviewHref", () => {
    expect(interviewHref("monday-com-e2e")).toBe("/interviews/monday-com-e2e");
  });
});
