# TypeScript — types, inference & narrowing

> **TypeScript 5.x** · Verifiable examples (TS Playground or `tsc`)

## Learning goals

- Explain structural typing vs nominal (Java, C#)
- Narrow `unknown` / union types safely at runtime
- Know when to use `interface` vs `type`

---

## Interview answer (30 seconds)

> TypeScript is **structural**: if it has the shape, it fits. I infer types locally, annotate **public APIs** and **boundaries** (API JSON, forms). For external data I parse to `unknown`, then **narrow** with `typeof`, `in`, or a type guard — never `as` without validation.

---

## Structural typing — Verify it

```ts
type Point = { x: number; y: number };
type Vector = { x: number; y: number };

const p: Point = { x: 1, y: 2 };
const v: Vector = p; // OK — same structure
```

Paste in [TypeScript Playground](https://www.typescriptlang.org/play) — no error.

---

## `interface` vs `type`

| | `interface` | `type` |
|---|-------------|--------|
| Merge | declaration merging | no |
| Unions / tuples | no | yes |
| `extends` | yes | via `&` |

**Interview pick:** `interface` for object contracts you may extend; `type` for unions, mapped/conditional types.

```ts
interface User {
  id: string;
}
interface User {
  name: string; // merges → { id, name }
}

type Result = { ok: true; data: string } | { ok: false; error: string };
```

---

## Inference — Verify it

```ts
const n = 42; // inferred: number
const arr = [1, 2]; // number[]

function double(x: number) {
  return x * 2; // inferred return: number
}

// explicit when boundary is unclear:
function parseId(raw: string): string {
  return raw.trim();
}
```

---

## Narrowing `unknown` (API / JSON) — Verify it

```ts
function isUser(x: unknown): x is { id: string; name: string } {
  return (
    typeof x === "object" &&
    x !== null &&
    "id" in x &&
    "name" in x &&
    typeof (x as { id: unknown }).id === "string" &&
    typeof (x as { name: unknown }).name === "string"
  );
}

const raw: unknown = JSON.parse('{"id":"1","name":"Ada"}');
if (isUser(raw)) {
  console.log(raw.name); // Ada — TS knows shape
}
```

**Expected:** logs `Ada`. Wrong JSON → `isUser` false, block skipped.

---

## Discriminated unions — Verify it

```ts
type ApiResult =
  | { status: "ok"; data: string }
  | { status: "error"; message: string };

function handle(r: ApiResult) {
  switch (r.status) {
    case "ok":
      return r.data; // TS knows .data exists
    case "error":
      return r.message;
  }
}

console.log(handle({ status: "ok", data: "hi" })); // "hi"
```

---

## `as const` + literals — Verify it

```ts
const routes = {
  home: "/",
  cart: "/cart",
} as const;

type Route = (typeof routes)[keyof typeof routes];
// "/" | "/cart"
```

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `as User` on `fetch` body | Zod / type guard first |
| `any` everywhere | `unknown` + narrow |
| Duplicate enums for strings | `as const` object + union |

---

## Checklist

- [ ] Structural typing explained
- [ ] `unknown` + type guard demo run
- [ ] Discriminated union `switch` exhaustiveness

Next: [Generics & utility types →](./02-generics-utility-types.md)
