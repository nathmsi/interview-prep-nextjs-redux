import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CounterExercise } from "./solution";

describe("solution easy/02", () => {
  it("counter exercise", () => {
    render(<CounterExercise />);
    fireEvent.click(screen.getByTestId("inc"));
    expect(screen.getByTestId("value")).toHaveTextContent("1");
  });
});
