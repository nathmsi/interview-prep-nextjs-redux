import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor, act } from "@testing-library/react";
import { TodoList } from "./exercise";

describe("react-query/03-implement-optimistic-update", () => {
  let serverTodos: { id: number; title: string; done: boolean }[];
  let resolveToggle: (value: unknown) => void;

  beforeEach(() => {
    serverTodos = [{ id: 1, title: "Buy milk", done: false }];

    const pending = new Promise((resolve) => {
      resolveToggle = resolve;
    });

    vi.spyOn(globalThis, "fetch").mockImplementation(async (url) => {
      const href = String(url);
      if (href === "/api/todos") {
        return { ok: true, json: async () => serverTodos } as Response;
      }
      if (href.endsWith("/toggle")) {
        return pending as Promise<Response>;
      }
      throw new Error(`unexpected fetch: ${href}`);
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("applies the update optimistically then confirms on success", async () => {
    render(<TodoList />);
    await waitFor(() =>
      expect(screen.getByTestId("toggle-1")).not.toBeChecked()
    );

    fireEvent.click(screen.getByTestId("toggle-1"));

    await waitFor(() => expect(screen.getByTestId("toggle-1")).toBeChecked());

    await act(async () => {
      serverTodos = [{ ...serverTodos[0], done: true }];
      resolveToggle({ ok: true, json: async () => serverTodos[0] });
    });

    await waitFor(() => expect(screen.getByTestId("toggle-1")).toBeChecked());
  });

  it("rolls back the optimistic update if the request fails", async () => {
    render(<TodoList />);
    await waitFor(() =>
      expect(screen.getByTestId("toggle-1")).not.toBeChecked()
    );

    fireEvent.click(screen.getByTestId("toggle-1"));
    await waitFor(() => expect(screen.getByTestId("toggle-1")).toBeChecked());

    await act(async () => {
      resolveToggle({ ok: false, status: 500 });
    });

    await waitFor(() =>
      expect(screen.getByTestId("toggle-1")).not.toBeChecked()
    );
  });
});
