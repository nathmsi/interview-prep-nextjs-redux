import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServerProductCount, ClientAddButton } from "./exercise";
import type { Product } from "@/lib/db";

const sample: Product[] = [
  { id: "1", name: "A", price: 1, category: "books" },
  { id: "2", name: "B", price: 2, category: "books" },
];

describe("easy/01-server-vs-client", () => {
  it("ServerProductCount affiche le nombre", async () => {
    const el = await ServerProductCount({ products: sample });
    render(el);
    expect(screen.getByTestId("product-count")).toHaveTextContent("2 produits");
  });

  it("ClientAddButton appelle onAdd", () => {
    const onAdd = vi.fn();
    render(<ClientAddButton label="Ajouter" onAdd={onAdd} />);
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(onAdd).toHaveBeenCalledOnce();
  });
});
