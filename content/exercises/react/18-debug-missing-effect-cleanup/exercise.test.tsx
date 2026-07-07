import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { KeyCounter } from "./exercise";

describe("react/18-debug-missing-effect-cleanup", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("incrémente de 1 à chaque pression de touche", () => {
    render(<KeyCounter />);

    fireEvent.keyDown(window);
    expect(screen.getByTestId("count")).toHaveTextContent("1");

    fireEvent.keyDown(window);
    expect(screen.getByTestId("count")).toHaveTextContent("2");

    fireEvent.keyDown(window);
    expect(screen.getByTestId("count")).toHaveTextContent("3");
  });

  it("n'ajoute qu'un seul listener keydown au montage", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    render(<KeyCounter />);

    fireEvent.keyDown(window);
    fireEvent.keyDown(window);

    const keydownCalls = addSpy.mock.calls.filter(
      ([type]) => type === "keydown"
    );
    expect(keydownCalls.length).toBe(1);
  });

  it("retire le listener au démontage", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<KeyCounter />);
    unmount();

    const keydownRemovals = removeSpy.mock.calls.filter(
      ([type]) => type === "keydown"
    );
    expect(keydownRemovals.length).toBeGreaterThanOrEqual(1);
  });
});
