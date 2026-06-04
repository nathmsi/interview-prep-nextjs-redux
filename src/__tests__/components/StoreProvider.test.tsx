import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAppSelector } from "@/store/hooks";
import { StoreProvider } from "@/components/providers/StoreProvider";

function Child() {
  const value = useAppSelector((s) => s.counter.value);
  return <span data-testid="v">{value}</span>;
}

describe("StoreProvider", () => {
  it("provides Redux store", () => {
    render(
      <StoreProvider>
        <Child />
      </StoreProvider>
    );
    expect(screen.getByTestId("v")).toHaveTextContent("0");
  });
});
