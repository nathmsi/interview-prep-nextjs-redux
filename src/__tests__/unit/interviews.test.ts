import { describe, it, expect } from "vitest";
import { getInterview, interviewHref, interviews } from "@/lib/interviews";

describe("interview prep metadata", () => {
  it("lists Palo Alto Networks Cortex prep", () => {
    expect(interviews).toHaveLength(1);
    expect(interviews[0]?.company).toBe("Palo Alto Networks");
  });

  it("getInterview finds by slug", () => {
    const panw = getInterview("palo-alto-networks-cortex");
    expect(panw?.role).toContain("Cortex");
    expect(panw?.interviewer).toContain("Shai Tubul");
    expect(getInterview("unknown")).toBeUndefined();
  });

  it("interviewHref", () => {
    expect(interviewHref("palo-alto-networks-cortex")).toBe(
      "/interviews/palo-alto-networks-cortex"
    );
  });
});
