import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Greeting } from "./exercise";

describe("react/02-debug-stale-greeting", () => {
  afterEach(() => cleanup());

  it("shows greeting for initial name", () => {
    render(<Greeting name="Alice" />);
    expect(screen.getByTestId("message")).toHaveTextContent("Hello, Alice!");
  });

  it("updates greeting when name prop changes", () => {
    const { rerender } = render(<Greeting name="Alice" />);
    rerender(<Greeting name="Bob" />);
    expect(screen.getByTestId("message")).toHaveTextContent("Hello, Bob!");
  });
});
