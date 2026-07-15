import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  AppPanel,
  useAppStore,
  getCountDisplayRenderCount,
  resetCountDisplayRenderCount,
} from "./exercise";

describe("zustand/02-implement-selector", () => {
  beforeEach(() => {
    useAppStore.setState({ count: 0, text: "" });
    resetCountDisplayRenderCount();
  });
  afterEach(() => cleanup());

  it("shows the current count", () => {
    render(<AppPanel />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("re-renders CountDisplay when count changes", () => {
    render(<AppPanel />);
    const before = getCountDisplayRenderCount();

    fireEvent.click(screen.getByTestId("inc"));

    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(getCountDisplayRenderCount()).toBeGreaterThan(before);
  });

  it("does NOT re-render CountDisplay when only text changes", () => {
    render(<AppPanel />);
    const before = getCountDisplayRenderCount();

    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "hello" },
    });

    expect(getCountDisplayRenderCount()).toBe(before);
  });
});
