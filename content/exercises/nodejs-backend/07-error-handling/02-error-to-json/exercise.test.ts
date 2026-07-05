import { describe, it, expect } from "vitest";
import { AppError } from "./exercise";
import { errorToJson } from "./exercise";

describe("nodejs/07-error-handling/02-error-to-json", () => {
  it("maps AppError", () => {
    expect(errorToJson(new AppError("nope", 404))).toEqual({
      status: 404,
      body: { error: "nope" },
    });
  });
});