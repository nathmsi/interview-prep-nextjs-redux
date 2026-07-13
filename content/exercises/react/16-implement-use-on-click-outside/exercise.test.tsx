import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Dropdown } from "./exercise";

describe("react/16-implement-use-on-click-outside", () => {
  afterEach(() => cleanup());

  it("is open by default", () => {
    render(<Dropdown />);
    expect(screen.getByTestId("panel")).toHaveTextContent("open");
  });

  it("closes when clicking outside", () => {
    render(<Dropdown />);
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.getByTestId("panel")).toHaveTextContent("closed");
  });

  it("stays open when clicking inside", () => {
    render(<Dropdown />);
    fireEvent.mouseDown(screen.getByTestId("panel"));
    expect(screen.getByTestId("panel")).toHaveTextContent("open");
  });

  it("cleans up the listener on unmount (no crash)", () => {
    const { unmount } = render(<Dropdown />);
    unmount();
    expect(() => fireEvent.mouseDown(document.body)).not.toThrow();
  });
});
