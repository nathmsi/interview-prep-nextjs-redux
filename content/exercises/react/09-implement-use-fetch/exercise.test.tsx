import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { UserCard } from "./exercise";

describe("react/09-implement-use-fetch", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("shows loading then data on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: "Alice" }),
    } as Response);

    render(<UserCard userId="1" />);
    expect(screen.getByTestId("status")).toHaveTextContent("loading");

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("Alice");
    });
    expect(fetch).toHaveBeenCalledWith("/api/users/1");
  });

  it("shows error on failed response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    render(<UserCard userId="2" />);

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("error:");
    });
  });

  it("refetches when userId changes", async () => {
    const mockFetch = vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const id = String(input).split("/").pop();
      return {
        ok: true,
        json: async () => ({ name: id === "1" ? "Alice" : "Bob" }),
      } as Response;
    });

    const { rerender } = render(<UserCard userId="1" />);
    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("Alice");
    });

    rerender(<UserCard userId="2" />);
    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("Bob");
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
