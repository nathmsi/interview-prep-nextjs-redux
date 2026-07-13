import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import { ResponsiveLabel } from "./exercise";

describe("react/19-implement-use-media-query", () => {
  let trigger: (matches: boolean) => void;

  beforeEach(() => {
    let matches = false;
    let listener: ((e: { matches: boolean }) => void) | null = null;

    trigger = (next: boolean) => {
      matches = next;
      listener?.({ matches: next });
    };

    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        get matches() {
          return matches;
        },
        media: query,
        addEventListener: (
          _event: string,
          cb: (e: { matches: boolean }) => void
        ) => {
          listener = cb;
        },
        removeEventListener: () => {
          listener = null;
        },
      }))
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("returns the initial value from matchMedia", () => {
    render(<ResponsiveLabel />);
    expect(screen.getByTestId("label")).toHaveTextContent("narrow");
  });

  it("updates when the media query changes", () => {
    render(<ResponsiveLabel />);
    expect(screen.getByTestId("label")).toHaveTextContent("narrow");

    act(() => {
      trigger(true);
    });
    expect(screen.getByTestId("label")).toHaveTextContent("wide");
  });

  it("unsubscribes on unmount without crashing", () => {
    const { unmount } = render(<ResponsiveLabel />);
    unmount();
    expect(() => trigger(true)).not.toThrow();
  });
});
