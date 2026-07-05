# TypeScript — generics & utility types

> **Interview depth** · Runnable in TS Playground

## Learning goals

- Write generic functions and constraints
- Use `keyof`, `Pick`, `Partial`, `Record` in real APIs
- Explain `satisfies` vs type annotation

---

## Interview answer (30 seconds)

> Generics parameterize **types** so one function works for many shapes while staying type-safe. I constrain with `extends` when needed. Utility types (`Pick`, `Omit`, `Partial`) model API DTOs without duplicating fields. `satisfies` checks a value without widening literal types.

---

## Generic function — Verify it

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]); // number | undefined
const s = first(["a", "b"]); // string | undefined

console.log(n === 1); // true
```

---

## Constraint — Verify it

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: "1", name: "Ada" };
console.log(getProp(user, "name")); // Ada
// getProp(user, "age"); // compile error — good
```

---

## `Pick` / `Partial` for API layers — Verify it

```ts
type User = { id: string; name: string; email: string; role: "admin" | "user" };

type UserPublic = Pick<User, "id" | "name">;
type UserUpdate = Partial<Pick<User, "name" | "email">>;

const patch: UserUpdate = { name: "Lee" }; // OK — email optional
```

---

## `Record` — Verify it

```ts
type Role = "admin" | "user";
const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read"],
};

console.log(permissions.user.length); // 1
```

---

## `satisfies` — Verify it

```ts
const config = {
  apiUrl: "/api",
  retries: 3,
} as const satisfies { apiUrl: string; retries: number };

// config.apiUrl stays literal "/api" (not widened to string)
```

---

## Conditional type (senior) — know the pattern

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<"hi">; // true
type B = IsString<number>; // false
```

Say in interview: “Used in library types; I reach for built-in utilities first.”

---

## Mapped type (senior)

```ts
type ReadonlyFields<T> = { readonly [K in keyof T]: T[K] };

type RO = ReadonlyFields<{ a: number }>;
// { readonly a: number }
```

---

## Common mistakes

- Generic default abused: `function f<T = any>` — loses safety
- `keyof` on optional-heavy types without `NonNullable`
- Duplicating interfaces instead of `Pick`/`Omit` from source of truth

---

## Checklist

- [ ] `getProp` constraint compiles and runs
- [ ] Explain `Pick` vs copy-paste interface
- [ ] One sentence on `satisfies`

Next: [TypeScript interview Q&A →](./03-interview-questions.md) · [Quiz (interactive)](/lessons/typescript/quiz-questions)
