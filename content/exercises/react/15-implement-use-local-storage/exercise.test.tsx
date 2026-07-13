import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { PersistedCounter } from "./exercise";

describe("react/15-implement-use-local-storage", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  it("uses initialValue when localStorage is empty", () => {
    render(<PersistedCounter />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("reads the existing value from localStorage on mount", () => {
    localStorage.setItem("count", JSON.stringify(5));
    render(<PersistedCounter />);
    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });

  it("persists updates to localStorage", () => {
    render(<PersistedCounter />);
    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(localStorage.getItem("count")).toBe(JSON.stringify(1));

    fireEvent.click(screen.getByTestId("inc"));
    expect(localStorage.getItem("count")).toBe(JSON.stringify(2));
  });

  it("a new instance reads the persisted value back", () => {
    const { unmount } = render(<PersistedCounter />);
    fireEvent.click(screen.getByTestId("inc"));
    fireEvent.click(screen.getByTestId("inc"));
    unmount();

    render(<PersistedCounter />);
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });
});
