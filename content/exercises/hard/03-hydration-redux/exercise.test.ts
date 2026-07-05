import { describe, it, expect } from "vitest";
import { classifyComponent } from "./classify";

describe("hard/03-hydration-redux", () => {
  it("async server sans hooks → server-safe", () => {
    expect(
      classifyComponent({
        id: "a",
        usesUseState: false,
        usesRedux: false,
        usesWindow: false,
        isAsyncServer: true,
      })
    ).toBe("server-safe");
  });

  it("redux → client-redux", () => {
    expect(
      classifyComponent({
        id: "b",
        usesUseState: false,
        usesRedux: true,
        usesWindow: false,
        isAsyncServer: false,
      })
    ).toBe("client-redux");
  });

  it("redux sur async server → unsafe", () => {
    expect(
      classifyComponent({
        id: "c",
        usesUseState: false,
        usesRedux: true,
        usesWindow: false,
        isAsyncServer: true,
      })
    ).toBe("unsafe");
  });
});
