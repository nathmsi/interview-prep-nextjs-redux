import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { Counter, useCounterStore } from "./exercise";

describe("zustand/04-implement-persist-middleware", () => {
  beforeEach(() => {
    localStorage.clear();
    useCounterStore.setState({ count: 0 });
  });
  afterEach(() => cleanup());

  it("increments as usual", () => {
    render(<Counter />);
    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("persists the store to localStorage under the given key", () => {
    render(<Counter />);
    fireEvent.click(screen.getByTestId("inc"));

    const stored = localStorage.getItem("zustand-counter");
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored!);
    expect(parsed.state.count).toBe(1);
  });

  it("rehydrates state from localStorage when the store is (re)created", async () => {
    localStorage.setItem(
      "zustand-counter",
      JSON.stringify({ state: { count: 5 }, version: 0 })
    );

    vi.resetModules();
    const fresh = await import("./exercise");

    render(<fresh.Counter />);

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("5");
    });
  });
});
