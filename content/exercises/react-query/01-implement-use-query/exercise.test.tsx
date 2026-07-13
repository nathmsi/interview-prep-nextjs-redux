import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { UserList } from "./exercise";

describe("react-query/01-implement-use-query", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("shows loading then the data on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    } as Response);

    render(<UserList />);
    expect(screen.getByTestId("status")).toHaveTextContent("loading");

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("Alice");
    });
    expect(screen.getByTestId("status")).toHaveTextContent("Bob");
    expect(fetch).toHaveBeenCalledWith("/api/users");
  });

  it("shows an error when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("error:");
    });
  });
});
