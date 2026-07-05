import { describe, it, expect } from "vitest";
import { encodeCursor, decodeCursor } from "./exercise";

describe("nodejs/05-data-layer/03-cursor-pagination", () => {
  it("round-trips cursor", () => {
    const c = encodeCursor({ offset: 10 });
    expect(decodeCursor(c)).toEqual({ offset: 10 });
  });
});