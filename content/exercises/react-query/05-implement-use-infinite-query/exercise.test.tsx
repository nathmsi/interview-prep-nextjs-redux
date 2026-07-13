import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { PostFeed } from "./exercise";

describe("react-query/05-implement-use-infinite-query", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("loads the first page then fetches the next one on click", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (url) => {
      const page = Number(String(url).match(/page=(\d+)/)?.[1]);
      if (page === 1) {
        return {
          ok: true,
          json: async () => ({
            items: [{ id: 1, title: "Post 1" }],
            nextPage: 2,
          }),
        } as Response;
      }
      if (page === 2) {
        return {
          ok: true,
          json: async () => ({
            items: [{ id: 2, title: "Post 2" }],
            nextPage: null,
          }),
        } as Response;
      }
      throw new Error(`unexpected page: ${page}`);
    });

    render(<PostFeed />);

    await waitFor(() => {
      expect(screen.getByTestId("list")).toHaveTextContent("Post 1");
    });
    expect(screen.getByTestId("load-more")).toHaveTextContent("Load more");
    expect(screen.getByTestId("load-more")).not.toBeDisabled();

    fireEvent.click(screen.getByTestId("load-more"));

    await waitFor(() => {
      expect(screen.getByTestId("list")).toHaveTextContent("Post 2");
    });
    expect(screen.getByTestId("list")).toHaveTextContent("Post 1");
    expect(screen.getByTestId("load-more")).toHaveTextContent(
      "No more posts"
    );
    expect(screen.getByTestId("load-more")).toBeDisabled();
  });
});
