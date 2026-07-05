import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CounterExercise } from "./exercise";

describe("easy/02-redux-provider", () => {
  it("increment et decrement", () => {
    render(<CounterExercise />);
    expect(screen.getByTestId("value")).toHaveTextContent("0");
    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("value")).toHaveTextContent("1");
    fireEvent.click(screen.getByTestId("dec"));
    expect(screen.getByTestId("value")).toHaveTextContent("0");
  });
});
