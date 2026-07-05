import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import { ProductSearch } from "./exercise";

const products = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Apricot" },
];

describe("react/06-implement-filtered-list", () => {
  afterEach(() => cleanup());

  it("shows all products when search is empty", () => {
    render(<ProductSearch products={products} />);
    const list = screen.getByTestId("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("filters by case-insensitive substring", () => {
    render(<ProductSearch products={products} />);
    fireEvent.change(screen.getByTestId("search"), { target: { value: "ap" } });
    const items = within(screen.getByTestId("list")).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Apple");
    expect(items[1]).toHaveTextContent("Apricot");
  });

  it("shows empty list when nothing matches", () => {
    render(<ProductSearch products={products} />);
    fireEvent.change(screen.getByTestId("search"), { target: { value: "zzz" } });
    expect(within(screen.getByTestId("list")).queryAllByRole("listitem")).toHaveLength(0);
  });
});
