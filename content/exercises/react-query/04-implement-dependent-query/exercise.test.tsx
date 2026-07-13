import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { UserPosts } from "./exercise";

describe("react-query/04-implement-dependent-query", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("does not fetch posts while no user is selected", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<UserPosts />);

    expect(screen.getByTestId("status")).toHaveTextContent(
      "no user selected"
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fetches posts only after a user is selected", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "Hello world" }],
    } as Response);

    render(<UserPosts />);
    fireEvent.click(screen.getByTestId("select-user"));

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent("Hello world");
    });
    expect(fetch).toHaveBeenCalledWith("/api/users/1/posts");
  });
});
