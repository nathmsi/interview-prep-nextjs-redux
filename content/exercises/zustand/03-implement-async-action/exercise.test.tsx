import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor, act } from "@testing-library/react";
import { UserList, useUsersStore } from "./exercise";

describe("zustand/03-implement-async-action", () => {
  beforeEach(() => {
    useUsersStore.setState({ data: null, loading: false, error: null });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("loads users on click", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: "Alice" }],
    } as Response);

    render(<UserList />);
    fireEvent.click(screen.getByTestId("load"));

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("Alice");
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("shows loading while the request is in flight", async () => {
    let resolveFetch: (value: unknown) => void;
    vi.spyOn(globalThis, "fetch").mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }) as Promise<Response>
    );

    render(<UserList />);
    fireEvent.click(screen.getByTestId("load"));

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("loading");
    });

    await act(async () => {
      resolveFetch({ ok: true, json: async () => [] });
    });
  });

  it("sets an error message on failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    render(<UserList />);
    fireEvent.click(screen.getByTestId("load"));

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("error:");
    });
  });
});
