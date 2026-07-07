import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CounterWithPrevious } from "./exercise";

describe("react/13-implement-use-previous", () => {
  afterEach(() => cleanup());

  it("n'a pas de valeur précédente au premier render", () => {
    render(<CounterWithPrevious />);
    expect(screen.getByTestId("current")).toHaveTextContent("0");
    expect(screen.getByTestId("previous")).toHaveTextContent("none");
  });

  it("expose la valeur du render précédent après un changement", () => {
    render(<CounterWithPrevious />);

    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("previous")).toHaveTextContent("0");

    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("current")).toHaveTextContent("2");
    expect(screen.getByTestId("previous")).toHaveTextContent("1");
  });
});
