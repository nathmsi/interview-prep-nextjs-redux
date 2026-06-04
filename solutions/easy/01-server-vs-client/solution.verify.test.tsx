import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServerProductCount, ClientAddButton } from "./solution";
import type { Product } from "@/lib/db";

const sample: Product[] = [
  { id: "1", name: "A", price: 1, category: "books" },
];

describe("solution easy/01", () => {
  it("ServerProductCount", async () => {
    render(await ServerProductCount({ products: sample }));
    expect(screen.getByTestId("product-count")).toHaveTextContent("1 product");
  });

  it("ClientAddButton", () => {
    const onAdd = vi.fn();
    render(<ClientAddButton label="Go" onAdd={onAdd} />);
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(onAdd).toHaveBeenCalledOnce();
  });
});
