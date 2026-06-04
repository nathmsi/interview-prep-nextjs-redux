# JavaScript — basic interview Q&A

> **ES2020+** · Course only · JS answers with **TypeScript** where it helps

Short answers you can say out loud. Practice explaining, then check the code.

---

## Types & values

**Q: What are the primitive types in JavaScript?**  
A: `string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `null`. Everything else is an object (including arrays and functions).

**TypeScript tie-in:** primitives map to lowercase types; `null` and `undefined` are separate unless you use `strictNullChecks`.

```ts
let name: string = "Ada";
let count: number = 0;
let active: boolean = true;
let nothing: null = null;
let missing: undefined = undefined;
```

**Q: typeof null?**  
A: `"object"` — a long-standing JS bug. In interviews, mention you still use `=== null` or optional chaining, not `typeof` for null checks.

**Q: == vs ===?**  
A: `===` is strict equality (no coercion). `==` coerces types (`0 == false` is true). Prefer `===` almost always.

```ts
// TS often flags loose == in eslint; use ===
if (value === null || value === undefined) { /* ... */ }
```

---

## var, let, const

**Q: Difference between var, let, and const?**  
A: `var` is function-scoped and hoisted (initialized as `undefined`). `let`/`const` are block-scoped; `const` must be assigned once (the binding is constant, not deep immutability of objects).

```js
for (var i = 0; i < 3; i++) {}
console.log(i); // 3

for (let j = 0; j < 3; j++) {}
// console.log(j); // ReferenceError
```

**TypeScript:** prefer `const` + inference; use explicit types at boundaries (API, public functions).

```ts
const ids: readonly number[] = [1, 2, 3];
// ids.push(4); // error if readonly
```

---

## Functions

**Q: Arrow function vs function declaration?**  
A: Declarations are hoisted; arrows are not. Arrows have no own `this`, `arguments`, or `new`. Use arrows for callbacks; use `function` for methods that need dynamic `this` (or use class fields).

```ts
type Handler = (event: MouseEvent) => void;

const onClick: Handler = (event) => {
  console.log(event.target);
};
```

**Q: Default parameters?**  
A: Evaluated at call time; later params can use earlier ones.

```js
function greet(name = "guest", suffix = `, ${name}`) {
  return `Hello${suffix}`;
}
```

---

## Arrays & objects

**Q: map vs forEach?**  
A: `map` returns a new array; `forEach` returns `undefined` (side effects only).

**Q: Spread vs rest?**  
A: Same `...` syntax: rest collects in parameters/destructuring; spread expands iterables or object properties.

```ts
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

const defaults = { theme: "dark" as const };
const user = { name: "Lee", ...defaults };
```

**Q: Shallow vs deep copy?**  
A: Spread/`Object.assign`/`Array.from` are shallow. Deep copy needs `structuredClone` (modern), recursion, or a library — know interview tradeoffs.

```ts
const original = { a: { b: 1 } };
const shallow = { ...original };
shallow.a.b = 2;
// original.a.b is now 2
```

---

## Truthiness & optional access

**Q: Falsy values?**  
A: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.

**Q: Optional chaining and nullish coalescing?**  
A: `?.` short-circuits on `null`/`undefined`. `??` only replaces `null`/`undefined` (not `0` or `""`).

```ts
const city = user?.address?.city ?? "Unknown";
```

---

## Strings & numbers

**Q: Template literals?**  
A: Backticks with `${expression}`; multi-line strings without `\n` hacks.

**Q: Number quirks?**  
A: `0.1 + 0.2 !== 0.3` (IEEE 754). `Number.isNaN(NaN)` is true; `NaN === NaN` is false. Use `Number.isFinite`, `Number.isInteger` instead of global `isNaN` when possible.

---

## Error handling (basic)

**Q: try / catch / finally?**  
A: `catch` receives any thrown value. `finally` runs always. In TS, narrow in `catch`:

```ts
try {
  JSON.parse(raw);
} catch (e: unknown) {
  const message = e instanceof Error ? e.message : "Parse failed";
  console.error(message);
}
```

---

## Quick checklist before medium level

- Explain primitives vs objects and `typeof null`
- Prefer `===`, `const`, block scope
- Know map/filter/reduce and spread/rest
- Mention `?.` and `??` for safe access
- Tie answers to **TypeScript** at API boundaries: `unknown` in catch, typed handlers, `readonly` for immutable lists
