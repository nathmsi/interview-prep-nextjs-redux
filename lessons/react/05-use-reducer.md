# useReducer — state as (state, action) → state

> **React 19** · Course only

## What it does

Like Redux locally: `const [state, dispatch] = useReducer(reducer, initialState)`.

Prefer over `useState` when:

- Many related fields update together
- Next state depends on action type (discriminated union)
- You want predictable transitions (easier to test)

## Interview questions

- **useReducer vs useState?** Few fields + simple updates → `useState`. Complex transitions → `useReducer`.
- **Lazy init?** `useReducer(reducer, arg, initFn)` — third argument runs once to build initial state.
- **Relation to Redux?** Same reducer pattern; Redux adds global store, middleware, ecosystem.

## Example

```tsx
"use client";

import { useReducer } from "react";

type State = { count: number };
type Action = { type: "inc" } | { type: "dec" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button type="button" onClick={() => dispatch({ type: "inc" })}>+</button>
      <button type="button" onClick={() => dispatch({ type: "dec" })}>-</button>
      <button type="button" onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
}
```
