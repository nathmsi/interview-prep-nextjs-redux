import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ToggleButton } from "./exercise";

describe("react/05-implement-use-toggle", () => {
  afterEach(() => cleanup());

  it("starts OFF", () => {
    render(<ToggleButton />);
    expect(screen.getByTestId("toggle")).toHaveTextContent("OFF");
  });

  it("toggles ON then OFF", () => {
    render(<ToggleButton />);
    const btn = screen.getByTestId("toggle");
    fireEvent.click(btn);
    expect(btn).toHaveTextContent("ON");
    fireEvent.click(btn);
    expect(btn).toHaveTextContent("OFF");
  });
});
