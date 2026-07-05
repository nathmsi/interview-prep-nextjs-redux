# Next.js — Server Actions & forms

> Mutations without manual API routes · progressive enhancement · React 19

---

## Verify it

Create `"use server"` action + `<form action={fn}>` — submit with JS disabled still works (progressive enhancement).

---

## What is a Server Action?

An **async function** that runs on the **server**, invoked from a form or client transition. Marked with:

```ts
"use server";
```

At top of file or inside a server module. Next serializes the call — **not** a public REST URL by default.

---

## Basic form (zero client JS required)

```tsx
// app/contact/actions.ts
"use server";

export async function submitContact(formData: FormData) {
  const email = formData.get("email");
  if (typeof email !== "string" || !email.includes("@")) {
    return { error: "Invalid email" };
  }
  await saveToDb(email);
  return { ok: true };
}
```

```tsx
// app/contact/page.tsx
import { submitContact } from "./actions";

export default function ContactPage() {
  return (
    <form action={submitContact}>
      <input name="email" type="email" required />
      <button type="submit">Send</button>
    </form>
  );
}
```

**Works without JavaScript** — progressive enhancement.

---

## Revalidation after action

```ts
"use server";

import { revalidatePath } from "next/cache";

export async function addToCart(productId: string) {
  await db.cart.add(productId);
  revalidatePath("/cart");
}
```

---

## Client invocation

```tsx
"use client";

import { useTransition } from "react";
import { addToCart } from "./actions";

export function BuyButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => addToCart(id))}
    >
      {pending ? "Adding..." : "Add to cart"}
    </button>
  );
}
```

---

## React 19: `useActionState`

Pairs with Server Actions for pending + returned state:

```tsx
"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form action={formAction}>
      <input name="email" />
      {state?.error && <p>{state.error}</p>}
      <button disabled={pending}>Login</button>
    </form>
  );
}
```

See React track lesson: `useActionState` / `useOptimistic`.

---

## Security notes (interview)

- **Always validate** `FormData` on server — never trust client
- Auth check inside every action
- CSRF: Next provides built-in origin checks for actions; understand your deployment
- Don’t expose secrets in action return values

---

## Server Actions vs Route Handlers

| Use Server Actions when | Use Route Handlers when |
|-------------------------|-------------------------|
| Form submit from your app | Mobile app / third-party REST |
| Colocated with page UI | Webhooks (Stripe, GitHub) |
| No need for public URL | Need GET cache at CDN edge |

**This repo** uses Route Handlers for cart API (Redux labs). Production apps often add Server Actions for simple forms **and** keep `/api` for Redux/mobile.

---

## `redirect` after action

```ts
"use server";

import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const id = await savePost(formData);
  redirect(`/posts/${id}`);
}
```

---

## Interview answer

**Q: How do Server Actions differ from API routes?**  
A: Actions are RPC-style server functions wired to React/forms; Route Handlers are HTTP endpoints. Actions simplify mutations; routes integrate with any HTTP client.

Next: [Middleware & env →](./08-middleware-auth-env.md)
