# React — Counter with useReducer

> **Exercise:** `content/exercises/react/10-implement-use-reducer/`  
> **Run:** `npm run react:10`

## Problem

Implement `counterReducer` for INCREMENT, DECREMENT, RESET.

## Skeleton

```typescript
switch (action.type) {
  case "INCREMENT": return { count: state.count + 1 };
  case "DECREMENT": return { count: state.count - 1 };
  case "RESET": return { count: 0 };
}
```

## Interview angle

When reducer beats multiple `useState` — predictable state transitions.
