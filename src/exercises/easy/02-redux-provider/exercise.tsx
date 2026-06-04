/**
 * EXERCISE easy/02 — Redux counter UI
 * Lesson: lessons/easy/02-redux-provider.md
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
  return configureStore({ reducer: { counter: counterReducer } });
}

function CounterInner(): React.ReactElement {
  throw new Error("TODO: useAppSelector + dispatch increment/decrement");
  return <></>;
}

export function CounterExercise() {
  const store = makeExerciseStore();
  return (
    <Provider store={store}>
      <CounterInner />
    </Provider>
  );
}
