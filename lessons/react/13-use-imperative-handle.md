# useImperativeHandle — custom ref API for parents

> **React 19** · Course only

## What it does

With `forwardRef`, lets a child expose **specific methods** to the parent instead of the raw DOM node.

```ts
useImperativeHandle(ref, () => ({ focus: () => ... }), deps);
```

Use sparingly — prefer declarative props/events. Good for: focus management, scroll, media controls, integrating non-React widgets.

## Interview questions

- **Why not expose full DOM ref?** Encapsulation — parent should not depend on child internals.
- **forwardRef still needed?** In React 19, `ref` can be a regular prop on function components — check your version/docs; `useImperativeHandle` still applies to the ref object.

## Example

```tsx
"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export type TextFieldHandle = { focus: () => void; clear: () => void };

export const TextField = forwardRef<TextFieldHandle>(function TextField(_props, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} className="border px-2 py-1" />;
});

export function FormWithImperative() {
  const fieldRef = useRef<TextFieldHandle>(null);

  return (
    <div>
      <TextField ref={fieldRef} />
      <button type="button" onClick={() => fieldRef.current?.focus()}>
        Focus field
      </button>
      <button type="button" onClick={() => fieldRef.current?.clear()}>
        Clear
      </button>
    </div>
  );
}
```
