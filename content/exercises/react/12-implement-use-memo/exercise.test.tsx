import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import {
  SortedList,
  getFactoryCallCount,
  resetFactoryCallCount,
} from "./exercise";

describe("react/12-implement-use-memo", () => {
  beforeEach(() => resetFactoryCallCount());
  afterEach(() => cleanup());

  it("computes and shows the sorted value", () => {
    render(<SortedList items={["banana", "apple", "cherry"]} />);
    const items = within(screen.getByTestId("list")).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual([
      "apple",
      "banana",
      "cherry",
    ]);
  });

  it("calls factory only once on mount", () => {
    render(<SortedList items={["b", "a"]} />);
    expect(getFactoryCallCount()).toBe(1);
  });

  it("does NOT call factory again when deps haven't changed", () => {
    render(<SortedList items={["b", "a"]} />);
    expect(getFactoryCallCount()).toBe(1);

    // Re-render via internal state (count) → deps [items] unchanged
    fireEvent.click(screen.getByTestId("inc"));
    fireEvent.click(screen.getByTestId("inc"));

    expect(getFactoryCallCount()).toBe(1);
  });

  it("calls factory again when the dep changes", () => {
    const { rerender } = render(<SortedList items={["b", "a"]} />);
    expect(getFactoryCallCount()).toBe(1);

    rerender(<SortedList items={["c", "a"]} />);
    expect(getFactoryCallCount()).toBe(2);
  });
});
