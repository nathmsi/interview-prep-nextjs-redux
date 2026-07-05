# useActionState — form actions (React 19)

> **React 19** · Course only

## What it does

Replaces the older `useFormState` pattern. Pairs with async **actions** (often Server Actions in Next.js):

```ts
const [state, formAction, isPending] = useActionState(action, initialState);
```

- `action(previousState, formData)` runs on submit
- `isPending` is true while the action runs
- Return value becomes the new `state`

## Interview questions

- **vs controlled form + fetch?** Actions integrate pending state, progressive enhancement, less boilerplate.
- **Client vs server action?** Server actions run on server; can still use `useActionState` on client with async client functions.

## Example (client action)

```tsx
"use client";

import { useActionState } from "react";

type State = { message: string };

async function greetAction(_prev: State, formData: FormData): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  await new Promise((r) => setTimeout(r, 400));
  return { message: name ? `Hello, ${name}` : "Name required" };
}

export function GreetForm() {
  const [state, action, pending] = useActionState(greetAction, { message: "" });

  return (
    <form action={action}>
      <input name="name" placeholder="Your name" disabled={pending} />
      <button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Greet"}
      </button>
      <p>{state.message}</p>
    </form>
  );
}
```
