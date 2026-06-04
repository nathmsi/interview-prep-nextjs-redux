import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer, {
  decrement,
  increment,
  reset,
  setStep,
} from "@/store/slices/counterSlice";

function makeStore() {
  return configureStore({ reducer: { counter: counterReducer } });
}

describe("counterSlice", () => {
  it("increment / decrement with step", () => {
    const store = makeStore();
    store.dispatch(setStep(2));
    store.dispatch(increment());
    store.dispatch(increment());
    expect(store.getState().counter.value).toBe(4);
    store.dispatch(decrement());
    expect(store.getState().counter.value).toBe(2);
    store.dispatch(reset());
    expect(store.getState().counter.value).toBe(0);
  });
});
