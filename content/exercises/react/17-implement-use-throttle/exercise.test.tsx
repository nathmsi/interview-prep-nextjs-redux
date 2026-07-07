import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { SearchBox } from "./exercise";

describe("react/17-implement-use-throttle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("commence avec la valeur initiale (vide)", () => {
    render(<SearchBox />);
    expect(screen.getByTestId("throttled")).toHaveTextContent("");
  });

  it("laisse passer un changement isolé après le délai", () => {
    render(<SearchBox />);
    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "hello" },
    });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(screen.getByTestId("throttled")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByTestId("throttled")).toHaveTextContent("hello");
  });

  it("regroupe les changements rapprochés et n'applique que la dernière valeur", () => {
    render(<SearchBox />);
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "a" } });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.change(input, { target: { value: "ab" } });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.change(input, { target: { value: "abc" } });

    // Toujours dans la fenêtre des 300ms depuis le tout premier changement
    expect(screen.getByTestId("throttled")).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    // 300ms depuis "a" → mise à jour directe vers la dernière valeur connue
    expect(screen.getByTestId("throttled")).toHaveTextContent("abc");
  });
});
