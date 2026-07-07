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

  it("calcule et affiche la valeur triée", () => {
    render(<SortedList items={["banana", "apple", "cherry"]} />);
    const items = within(screen.getByTestId("list")).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual([
      "apple",
      "banana",
      "cherry",
    ]);
  });

  it("appelle factory une seule fois au montage", () => {
    render(<SortedList items={["b", "a"]} />);
    expect(getFactoryCallCount()).toBe(1);
  });

  it("ne rappelle PAS factory quand les deps ne changent pas", () => {
    render(<SortedList items={["b", "a"]} />);
    expect(getFactoryCallCount()).toBe(1);

    // Re-render via un state interne (count) → deps [items] inchangées
    fireEvent.click(screen.getByTestId("inc"));
    fireEvent.click(screen.getByTestId("inc"));

    expect(getFactoryCallCount()).toBe(1);
  });

  it("rappelle factory quand la dep change", () => {
    const { rerender } = render(<SortedList items={["b", "a"]} />);
    expect(getFactoryCallCount()).toBe(1);

    rerender(<SortedList items={["c", "a"]} />);
    expect(getFactoryCallCount()).toBe(2);
  });
});
