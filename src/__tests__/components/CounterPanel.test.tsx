import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { CounterPanel } from "@/components/demo/CounterPanel";
import { makeStore } from "@/store";

describe("CounterPanel", () => {
  it("increments and decrements", () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <CounterPanel />
      </Provider>
    );
    expect(screen.getByText("0")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText("1")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "−" }));
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
