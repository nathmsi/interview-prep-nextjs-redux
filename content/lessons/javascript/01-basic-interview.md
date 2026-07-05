# JavaScript — basic interview Q&A

> **ES2020+** · Every section has a **Verify it** block (DevTools console or `node file.js`)

## Learning goals

- Name primitives and falsy values without hesitation
- Prefer `===`, `const`, block scope
- Use `?.` and `??` correctly (not `||` for `0`)

---

## Interview answer (30 seconds)

> JavaScript has 7 primitives plus `null`; everything else is an object. I use **strict equality**, **block scope** with `const`, and **immutable updates** (spread, `map`) instead of mutating. For external data I validate before trust — in TS that means `unknown` and narrowing.

---

## Types & values

**Q: Primitive types?**  
A: `string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `null`.

### Verify it — typeof

```js
console.log(typeof "a");     // "string"
console.log(typeof 1);       // "number"
console.log(typeof true);    // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);    // "object" ← historical bug
```

**Q: `==` vs `===`?**  
A: `===` no coercion. `0 == false` is `true` with `==` only.

### Verify it — equality

```js
console.log(0 == false);   // true
console.log(0 === false);  // false
console.log("" == false);  // true
console.log(null == undefined); // true
console.log(null === undefined); // false
```

---

## var, let, const

**Q: Differences?**  
A: `var` — function-scoped, hoisted as `undefined`. `let`/`const` — block-scoped. `const` = binding fixed, object contents can still mutate.

### Verify it — loop trap

```js
const outputs = [];
for (var i = 0; i < 3; i++) outputs.push(() => i);
console.log(outputs.map((fn) => fn())); // [3, 3, 3]

const fixed = [];
for (let j = 0; j < 3; j++) fixed.push(() => j);
console.log(fixed.map((fn) => fn())); // [0, 1, 2]
```

---

## Arrays & objects

**Q: `map` vs `forEach`?**  
A: `map` returns new array; `forEach` returns `undefined`.

### Verify it

```js
const doubled = [1, 2, 3].map((n) => n * 2);
console.log(doubled); // [2, 4, 6]

let sum = 0;
[1, 2, 3].forEach((n) => (sum += n));
console.log(sum); // 6
```

**Q: Shallow copy?**  
A: Spread copies one level only.

### Verify it

```js
const original = { a: { b: 1 } };
const shallow = { ...original };
shallow.a.b = 99;
console.log(original.a.b); // 99 — same nested reference
```

---

## Truthiness & `?.` / `??`

**Falsy:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.

### Verify it — `??` vs `||`

```js
const count = 0;
console.log(count || 10);  // 10 — wrong if 0 is valid
console.log(count ?? 10);  // 0 — correct

const user = null;
console.log(user?.profile?.name ?? "Guest"); // "Guest"
```

---

## Numbers

### Verify it

```js
console.log(0.1 + 0.2 === 0.3); // false
console.log(Number.isNaN(NaN)); // true
console.log(NaN === NaN);       // false
```

Use `Number.isFinite`, not global `isNaN("hello")` (coerces).

---

## TypeScript tie-in (same file, `tsc`)

```ts
let raw: unknown = JSON.parse('{"ok":true}');
if (typeof raw === "object" && raw !== null && "ok" in raw) {
  console.log((raw as { ok: boolean }).ok); // true
}
```

---

## Common mistakes

| Mistake | Correct |
|---------|---------|
| `if (x)` when `0` is valid | `x != null` or `??` |
| `typeof null === "object"` for checks | `x === null` |
| Mutating state `arr.push` in React | new array `[...arr, item]` |

---

## Checklist

- [ ] Ran typeof + equality snippets
- [ ] Explained var loop vs let loop output
- [ ] Demonstrated `??` vs `||` with `0`

Next: [Medium →](./02-medium-interview.md)
