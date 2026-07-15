import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { CartSummary, useCartStore } from "./exercise";

describe("zustand/05-implement-computed-selector", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });
  afterEach(() => cleanup());

  it("starts at 0", () => {
    render(<CartSummary />);
    expect(screen.getByTestId("total")).toHaveTextContent("0");
  });

  it("computes the total from the items in the store", () => {
    render(<CartSummary />);

    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("total")).toHaveTextContent("20");

    fireEvent.click(screen.getByTestId("add"));
    expect(screen.getByTestId("total")).toHaveTextContent("40");
  });

  it("reflects items added directly via the store outside React", () => {
    render(<CartSummary />);

    act(() => {
      useCartStore.getState().addItem({ id: "outside", price: 5, quantity: 3 });
    });

    expect(screen.getByTestId("total")).toHaveTextContent("15");
  });
});
