import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { PersistedCounter } from "./exercise";

describe("react/15-implement-use-local-storage", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  it("utilise initialValue quand localStorage est vide", () => {
    render(<PersistedCounter />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("lit la valeur existante dans localStorage au montage", () => {
    localStorage.setItem("count", JSON.stringify(5));
    render(<PersistedCounter />);
    expect(screen.getByTestId("count")).toHaveTextContent("5");
  });

  it("persiste les mises à jour dans localStorage", () => {
    render(<PersistedCounter />);
    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(localStorage.getItem("count")).toBe(JSON.stringify(1));

    fireEvent.click(screen.getByTestId("inc"));
    expect(localStorage.getItem("count")).toBe(JSON.stringify(2));
  });

  it("une nouvelle instance relit la valeur persistée", () => {
    const { unmount } = render(<PersistedCounter />);
    fireEvent.click(screen.getByTestId("inc"));
    fireEvent.click(screen.getByTestId("inc"));
    unmount();

    render(<PersistedCounter />);
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });
});
