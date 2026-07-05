import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { TodoList } from "./exercise";

describe("react/03-debug-todo-list-keys", () => {
  afterEach(() => cleanup());

  it("keeps input values on the correct item after reorder", () => {
    const { rerender } = render(
      <TodoList
        items={[
          { id: "a", label: "Apple" },
          { id: "b", label: "Banana" },
        ]}
      />
    );

    const inputA = screen.getByTestId("input-a");
    const inputB = screen.getByTestId("input-b");

    fireEvent.change(inputA, { target: { value: "Apricot" } });
    expect(inputA).toHaveValue("Apricot");
    expect(inputB).toHaveValue("Banana");

    rerender(
      <TodoList
        items={[
          { id: "b", label: "Banana" },
          { id: "a", label: "Apple" },
        ]}
      />
    );

    expect(screen.getByTestId("input-b")).toHaveValue("Banana");
    expect(screen.getByTestId("input-a")).toHaveValue("Apricot");
  });
});
