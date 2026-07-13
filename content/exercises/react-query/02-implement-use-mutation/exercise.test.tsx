import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { TodoApp } from "./exercise";

describe("react-query/02-implement-use-mutation", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("loads the list, then adds a todo and refreshes the list", async () => {
    let todos = [{ id: 1, title: "Buy milk" }];

    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (_url, init?: RequestInit) => {
        if (!init || init.method === undefined) {
          return { ok: true, json: async () => todos } as Response;
        }
        if (init.method === "POST") {
          const body = JSON.parse(String(init.body));
          const newTodo = { id: todos.length + 1, title: body.title };
          todos = [...todos, newTodo];
          return { ok: true, json: async () => newTodo } as Response;
        }
        throw new Error("unexpected request");
      }
    );

    render(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByTestId("list")).toHaveTextContent("Buy milk");
    });

    fireEvent.change(screen.getByTestId("input"), {
      target: { value: "Walk dog" },
    });
    fireEvent.click(screen.getByTestId("add"));

    await waitFor(() => {
      expect(screen.getByTestId("list")).toHaveTextContent("Walk dog");
    });
    expect(screen.getByTestId("list")).toHaveTextContent("Buy milk");
    expect(screen.getByTestId("input")).toHaveValue("");
  });
});
