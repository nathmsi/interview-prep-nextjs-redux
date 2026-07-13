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
  // TODO: your code here
  const counterValue = useAppSelector(state => state.counter.value);
  void useAppDispatch;
  void increment;
  void decrement;
  return <>
    <button data-testid="inc">increment</button>
    <span data-testid="value">{counterValue}</span>
    <button data-testid="dec">decrement</button>
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
