import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ThemeProvider, ThemeToggle } from "./exercise";

describe("react/07-implement-theme-context", () => {
  afterEach(() => cleanup());

  it("starts with light theme", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-toggle")).toHaveTextContent("light");
  });

  it("toggles to dark and back", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const btn = screen.getByTestId("theme-toggle");
    fireEvent.click(btn);
    expect(btn).toHaveTextContent("dark");
    fireEvent.click(btn);
    expect(btn).toHaveTextContent("light");
  });
});
