import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Dropdown } from "./exercise";

describe("react/16-implement-use-on-click-outside", () => {
  afterEach(() => cleanup());

  it("est ouvert par défaut", () => {
    render(<Dropdown />);
    expect(screen.getByTestId("panel")).toHaveTextContent("open");
  });

  it("se ferme quand on clique en dehors", () => {
    render(<Dropdown />);
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.getByTestId("panel")).toHaveTextContent("closed");
  });

  it("reste ouvert quand on clique à l'intérieur", () => {
    render(<Dropdown />);
    fireEvent.mouseDown(screen.getByTestId("panel"));
    expect(screen.getByTestId("panel")).toHaveTextContent("open");
  });

  it("nettoie le listener au démontage (pas de crash)", () => {
    const { unmount } = render(<Dropdown />);
    unmount();
    expect(() => fireEvent.mouseDown(document.body)).not.toThrow();
  });
});
