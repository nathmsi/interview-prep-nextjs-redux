"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer, {
  decrement,
  increment,
} from "@/store/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";

function makeExerciseStore() {
  return configureStore({ reducer: { counter: counterReducer } });
}

type ExerciseState = ReturnType<ReturnType<typeof makeExerciseStore>["getState"]>;

function CounterInner() {
  const value = useSelector((s: ExerciseState) => s.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <span data-testid="value">{value}</span>
      <button type="button" data-testid="inc" onClick={() => dispatch(increment())}>
        +
      </button>
      <button type="button" data-testid="dec" onClick={() => dispatch(decrement())}>
        −
      </button>
    </div>
  );
}

export function CounterExercise() {
  const store = makeExerciseStore();
  return (
    <Provider store={store}>
      <CounterInner />
    </Provider>
  );
}
