# TypeScript — interview Q&A recap

> Short, **verifiable** answers · pair with the [20-question quiz](/lessons/typescript/quiz-questions)

---

## Core

**Q: What problem does TypeScript solve?**  
A: Catches type errors at compile time; better IDE refactors; documents contracts. Runtime is still JavaScript.

**Verify:** `tsc` fails on `const n: number = "x";` — error TS2322.

---

**Q: `any` vs `unknown` vs `never`?**  
A: `any` disables checking. `unknown` = must narrow before use. `never` = impossible value (exhaustive switch, thrown function).

```ts
function assertNever(x: never): never {
  throw new Error("Unexpected: " + x);
}
```

---

**Q: Structural typing?**  
A: Shape matters, not keyword `class`. Two interfaces with same fields are assignable.

---

## strictNullChecks

**Q: Why are `null` and `undefined` separate?**  
A: Explicit absence vs uninitialized. Forces handling before use.

```ts
function len(s: string | null) {
  if (s === null) return 0;
  return s.length;
}
```

---

## Generics & utilities

**Q: When generics?**  
A: Reusable functions/components (`useState<T>`, API wrappers) without `any`.

**Q: `Pick` / `Omit` / `Partial`?**  
A: Derive DTOs from domain types — single source of truth.

---

## Advanced (senior)

**Q: `infer` in conditional types?**  
A: Extract type from another type inside conditional — used in library typings.

**Q: `satisfies`?**  
A: Validate value matches type without widening literals (config objects).

**Q: Declaration files `.d.ts`?**  
A: Types for JS libraries without TS source.

---

## With React / Next

**Q: Typing `children`?**  
A: `React.ReactNode` for props.children.

**Q: Typing events?**  
A: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`.

**Q: Server vs client types?**  
A: Share types in `types/` imported by both; no browser APIs in server modules.

---

## Pitfalls table

| Pitfall | Better |
|---------|--------|
| `as` on API JSON | Zod + `z.infer` |
| Enums for strings | `as const` + union |
| `!` non-null assertion | Guard or optional chain |
| Typing everything | infer locally, annotate exports |

---

## Study order

1. [Types & narrowing](./01-types-and-narrowing.md)  
2. [Generics & utilities](./02-generics-utility-types.md)  
3. [Interactive quiz](/lessons/typescript/quiz-questions)
