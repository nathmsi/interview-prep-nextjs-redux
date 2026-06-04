import type { QuizItem } from "./quiz-types";

export const typescriptQuizItems: QuizItem[] = [
  {
    id: 1,
    level: "basic",
    title: "type vs interface",
    question:
      "What is the difference between type and interface in TypeScript? When might you pick one over the other?",
    solution:
      "Both describe object shapes. interface can be merged (declaration merging) and extended with extends. type supports unions, intersections, tuples, and mapped/conditional types. Use interface for public object contracts you may extend; use type for unions, utilities, and complex compositions.",
  },
  {
    id: 2,
    level: "basic",
    title: "Primitive types",
    question: "Name the main primitive types in TypeScript and what typeof returns for each.",
    solution:
      "string, number, boolean, bigint, symbol, null, undefined. typeof on literals: typeof 'a' is 'string', typeof 1 is 'number', typeof true is 'boolean', typeof null is 'object' (historical JS quirk), typeof undefined is 'undefined'.",
  },
  {
    id: 3,
    level: "basic",
    title: "any vs unknown",
    question:
      "Compare any and unknown. Which is safer for values from JSON.parse or user input?",
    solution:
      "any disables type checking — you can call anything on it. unknown means we must narrow before use (typeof, in, type guards). Prefer unknown for external data, then narrow. any is an escape hatch for gradual migration.",
  },
  {
    id: 4,
    level: "basic",
    title: "Type inference",
    question: "What is type inference? Give one example where TypeScript infers without an annotation.",
    solution:
      "The compiler deduces types without explicit annotations. Example: const x = 42 infers number; const arr = [1, 2] infers number[]. Function return types are often inferred from return statements when not annotated.",
  },
  {
    id: 5,
    level: "basic",
    title: "as const",
    question: "What does as const do on an array or object literal?",
    solution:
      "Makes the value deeply readonly and literal: ['a', 'b'] as const is readonly ['a', 'b'], not string[]. { role: 'admin' } as const gives role type 'admin' not string. Useful for discriminated unions and config objects.",
  },
  {
    id: 6,
    level: "intermediate",
    title: "Union & intersection",
    question:
      "Explain string | number and A & B. How do you narrow a union safely?",
    solution:
      "Union: value is one of several types (OR). Intersection: value must satisfy all types (AND). Narrow unions with typeof, in checks, discriminant fields, or type predicates. After narrowing, TypeScript knows the precise type in that branch.",
  },
  {
    id: 7,
    level: "intermediate",
    title: "Generics basics",
    question:
      "Why use function identity<T>(arg: T): T? What problem do generics solve?",
    solution:
      "Generics preserve the relationship between input and output types without losing information (unlike any). identity<number>(1) returns number; identity('hi') returns string. They enable reusable components, hooks, and APIs that work across types while staying type-safe.",
  },
  {
    id: 8,
    level: "intermediate",
    title: "keyof & typeof",
    question: "What do keyof User and typeof config produce? Give a short use case for each.",
    solution:
      "keyof User is a union of property names ('id' | 'name' | ...). typeof on a value gives its type (typeof config captures the shape of a const object). Use keyof for typed pickers over object keys; typeof to derive types from runtime values.",
  },
  {
    id: 9,
    level: "intermediate",
    title: "Type guards",
    question:
      "What is a user-defined type guard? Show the syntax function isFish(x): x is Fish.",
    solution:
      "A function that returns x is SomeType tells TypeScript to narrow in true branches. Example: function isError(r: unknown): r is { message: string } { return typeof r === 'object' && r !== null && 'message' in r; }. Prefer this over casts when validating unknown data.",
  },
  {
    id: 10,
    level: "intermediate",
    title: "Optional & readonly",
    question:
      "Difference between prop?: string and prop: string | undefined? What does readonly do?",
    solution:
      "Optional ? means the key may be absent. string | undefined means the key may exist with value undefined. readonly prevents reassignment of properties (compile-time; shallow for objects). ReadonlyArray<T> blocks push/pop on arrays.",
  },
  {
    id: 11,
    level: "advanced",
    title: "Discriminated unions",
    question:
      "What is a discriminated union? Why is a common literal field (kind/tag) useful?",
    solution:
      "A union of object types sharing a literal discriminant field (e.g. kind: 'success' | 'error'). Switching on kind narrows the whole object — TypeScript knows which fields exist. Powers Redux actions, API results, and exhaustive checking with never.",
  },
  {
    id: 12,
    level: "advanced",
    title: "Utility types Pick & Omit",
    question: "What do Pick<User, 'id' | 'name'> and Omit<User, 'password'> do?",
    solution:
      "Pick selects a subset of properties. Omit creates a type without listed keys. Both are implemented with mapped types. Common for DTOs, public API types, and form types that exclude server-only fields.",
  },
  {
    id: 13,
    level: "advanced",
    title: "Mapped types",
    question: "What is a mapped type? Example: { [K in keyof T]: boolean }.",
    solution:
      "A type that iterates keys of another type to build a new shape. { [K in keyof T]: boolean } makes every key of T optional boolean flags. Partial, Required, Record are built-in mapped-type patterns.",
  },
  {
    id: 14,
    level: "advanced",
    title: "Conditional types",
    question: "What does T extends U ? X : Y mean? Give a simple interview example.",
    solution:
      "If T is assignable to U, the type is X, else Y. Example: type IsString<T> = T extends string ? true : false. Used in advanced utilities like Exclude, Extract, and infer patterns in ReturnType-style helpers.",
  },
  {
    id: 15,
    level: "advanced",
    title: "never & exhaustive switch",
    question:
      "What is never? How do you use it for exhaustive checks in a switch on a union?",
    solution:
      "never means no possible value — unreachable code, thrown functions, empty union. In default branch: const _exhaustive: never = action ensures every union member was handled; if you add a new variant, TypeScript errors until you handle it.",
  },
  {
    id: 16,
    level: "pro",
    title: "satisfies operator",
    question: "What does satisfies do in TypeScript 4.9+? How is it different from as?",
    solution:
      "value satisfies Type checks that value matches Type but keeps the inferred literal type (narrower than widening to Type). as forces the type and can widen or lie. Example: config satisfies Record<string, Route> keeps exact keys for autocomplete while validating shape.",
  },
  {
    id: 17,
    level: "pro",
    title: "infer keyword",
    question: "What does infer R in ReturnType<T> do inside a conditional type?",
    solution:
      "infer declares a type variable to be inferred from a matching position in another type. In ReturnType<Func>, if Func is (...args: any) => infer R, R becomes the return type. Powers utility types: Parameters, Awaited, etc.",
  },
  {
    id: 18,
    level: "pro",
    title: "strict mode",
    question:
      "Name three compiler options under strict that catch real bugs (strictNullChecks, etc.).",
    solution:
      "strictNullChecks: null/undefined are not assignable to string unless optional. noImplicitAny: errors on implicit any. strictFunctionTypes: safer function parameter checking. Also strictBindCallApply, always strict in --strict.",
  },
  {
    id: 19,
    level: "pro",
    title: "Structural typing",
    question:
      "TypeScript is structural, not nominal. What does that mean in an interview?",
    solution:
      "Compatibility is based on shape, not name. If { x: number } is expected, any object with x: number works even without declaring the same interface. Duck typing at compile time — extra properties may cause errors on direct assignment but often work via variables.",
  },
  {
    id: 20,
    level: "pro",
    title: "TypeScript + React props",
    question:
      "How do you type children, optional callbacks, and polymorphic as prop patterns briefly?",
    solution:
      "children: ReactNode. Optional callback?: () => void. Polymorphic: C extends ElementType = 'span', props: { as?: C } & ComponentPropsWithoutRef<C>. Use PropsWithChildren, ComponentProps for extending HTML elements.",
  },
];
