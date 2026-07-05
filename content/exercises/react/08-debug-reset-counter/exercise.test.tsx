import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ResettableCounter } from "./exercise";

describe("react/08-debug-reset-counter", () => {
  afterEach(() => cleanup());

  it("resets to 0 when resetKey changes", () => {
    const { rerender } = render(<ResettableCounter resetKey={1} />);
    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("2");

    rerender(<ResettableCounter resetKey={2} />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("can increment after reset", () => {
    const { rerender } = render(<ResettableCounter resetKey={1} />);
    rerender(<ResettableCounter resetKey={2} />);
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });
});
