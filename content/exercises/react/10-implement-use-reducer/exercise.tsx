/**
 * EXERCISE react/10 — Counter with useReducer
 *
 * Implement counterReducer and wire CounterControls.
 * Actions: INCREMENT, DECREMENT, RESET
 * Run: npm run react:10
 */

"use client";

import { useReducer } from "react";

export type CounterState = { count: number };

export type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" };

export function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  // TODO: your code here
  return state;
}

export function CounterControls(): React.ReactElement {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <span data-testid="count">{state.count}</span>
      <button
        data-testid="increment"
        type="button"
        onClick={() => dispatch({ type: "INCREMENT" })}
      >
        +
      </button>
      <button
        data-testid="decrement"
        type="button"
        onClick={() => dispatch({ type: "DECREMENT" })}
      >
        −
      </button>
      <button
        data-testid="reset"
        type="button"
        onClick={() => dispatch({ type: "RESET" })}
      >
        reset
      </button>
    </div>
  );
}
