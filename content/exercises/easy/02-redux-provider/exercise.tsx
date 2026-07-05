/**
 * EXERCISE easy/02 — Redux counter UI
 * Lesson: content/lessons/easy/02-redux-provider.md
 */

"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer, {
  decrement,
  increment,
} from "@/store/slices/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function makeExerciseStore() {
  return configureStore({ reducer: { counter: counterReducer, } });
}

function CounterInner(): React.ReactElement {
  const counterValue = useAppSelector(state => state.counter.value);
  const dispacth = useAppDispatch();
  return <>
    <button data-testid="inc" onClick={() => dispacth(decrement())}>increment</button>
    <span data-testid="value">{counterValue}</span>
    <button data-testid="dec" onClick={() => dispacth(increment())}>decrement</button>
  </>;
}

export function CounterExercise() {
  const store = makeExerciseStore();
  return (
    <Provider store={store}>
      <CounterInner />
    </Provider>
  );
}
