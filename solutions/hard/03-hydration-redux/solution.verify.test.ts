import { describe, it, expect } from "vitest";
import { classifyComponent } from "./solution";

describe("solution hard/03", () => {
  it("classifyComponent", () => {
    expect(
      classifyComponent({
        id: "a",
        usesUseState: false,
        usesRedux: false,
        usesWindow: false,
        isAsyncServer: true,
      })
    ).toBe("server-safe");
    expect(
      classifyComponent({
        id: "b",
        usesUseState: true,
        usesRedux: true,
        usesWindow: false,
        isAsyncServer: true,
      })
    ).toBe("unsafe");
  });
});
