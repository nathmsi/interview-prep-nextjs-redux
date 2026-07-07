import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { SearchBox } from "./exercise";

describe("react/14-implement-use-debounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("commence avec la valeur debouncée vide", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("debounced")).toHaveTextContent("");
  });

  it("ne met pas à jour la valeur debouncée avant la fin du délai", () => {
    render(<SearchBox />);

    fireEvent.change(screen.getByTestId("input"), { target: { value: "a" } });

    // L'input change immédiatement...
    expect(screen.getByTestId("input")).toHaveValue("a");
    // ...mais pas la valeur debouncée
    expect(screen.getByTestId("debounced")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(screen.getByTestId("debounced")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByTestId("debounced")).toHaveTextContent("a");
  });

  it("annule le timer précédent si la valeur rechange (debounce)", () => {
    render(<SearchBox />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "a" } });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Rechange avant les 300ms → reset du timer
    fireEvent.change(input, { target: { value: "ab" } });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    // Total 400ms depuis "a" mais seulement 200ms depuis "ab" → toujours vide
    expect(screen.getByTestId("debounced")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    // 300ms depuis "ab" → mise à jour, on saute directement à "ab"
    expect(screen.getByTestId("debounced")).toHaveTextContent("ab");
  });
});
