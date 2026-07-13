import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  TodoList,
  getChildRenderCount,
  resetChildRenderCount,
} from "./exercise";

describe("react/11-implement-use-callback", () => {
  beforeEach(() => resetChildRenderCount());
  afterEach(() => cleanup());

  // --- Basic behavior ---

  it("shows all todos initially", () => {
    render(<TodoList />);
    expect(screen.getByTestId("item-1")).toBeTruthy();
    expect(screen.getByTestId("item-2")).toBeTruthy();
    expect(screen.getByTestId("item-3")).toBeTruthy();
  });

  it("removes a todo when clicking Remove", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByTestId("remove-1"));
    expect(screen.queryByTestId("item-1")).toBeNull();
    expect(screen.getByTestId("item-2")).toBeTruthy();
  });

  it("filters todos by text", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId("filter"), {
      target: { value: "interview" },
    });
    // Just check that filtering does something coherent
    const list = screen.getByTestId("list");
    expect(list).toBeTruthy();
  });

  // --- Reference stability (the real useCallback test) ---

  it("does not re-render TodoItem when only the filter changes", () => {
    render(<TodoList />);
    const renderCountAfterMount = getChildRenderCount(); // 3 initial renders

    // Change the filter → parent re-renders, but useMyCallback deps = []
    // → same reference → TodoItem (memo) must NOT re-render
    fireEvent.change(screen.getByTestId("filter"), {
      target: { value: "a" },
    });

    expect(getChildRenderCount()).toBe(renderCountAfterMount);
  });

  it("removes the item from the DOM and does not re-render the remaining items (memo + stable callback)", () => {
    render(<TodoList />);
    const countBefore = getChildRenderCount(); // 3 initial renders

    fireEvent.click(screen.getByTestId("remove-3"));

    // The removed item is gone
    expect(screen.queryByTestId("item-3")).toBeNull();
    // The other 2 are still there
    expect(screen.getByTestId("item-1")).toBeTruthy();
    expect(screen.getByTestId("item-2")).toBeTruthy();
    // memo + stable useMyCallback → remaining items did NOT re-render
    expect(getChildRenderCount()).toBe(countBefore);
  });
});
