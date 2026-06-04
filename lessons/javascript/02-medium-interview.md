# JavaScript — medium interview Q&A

> **ES2020+** · Closures, `this`, prototypes, async, event loop basics

---

## Closures

**Q: What is a closure?**  
A: A function that remembers variables from its lexical scope, even after the outer function has returned.

```js
function makeCounter() {
  let n = 0;
  return () => ++n;
}
const inc = makeCounter();
inc(); // 1
inc(); // 2
```

**Q: Classic loop + var interview bug?**  
A: All timeouts share one `i`. Fix: `let` in the loop, or IIFE, or `forEach` with a new function per iteration.

```js
// Bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}

// Fix
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
```

**TypeScript:** closures preserve inferred types; be careful capturing mutable objects:

```ts
function createLogger(label: string) {
  return (msg: string) => console.log(`[${label}] ${msg}`);
}
```

---

## `this`

**Q: How is `this` determined?**  
A: Depends on **call site**: default binding (strict: `undefined`, sloppy: global), implicit (object before dot), explicit (`call`/`apply`/`bind`), `new` (new empty object), arrow functions (lexical `this` from enclosing scope).

**Q: arrow vs regular method on an object?**  
A: Regular method: `this` is the object (unless extracted). Arrow in object literal: `this` is outer scope — often wrong for methods.

```js
const user = {
  name: "Ada",
  greet() {
    return `Hi ${this.name}`;
  },
  broken: () => `Hi ${this?.name}`, // lexical this — not user
};
```

**TypeScript:** `this` parameters in methods for fluent APIs:

```ts
class Builder {
  value = "";
  append(part: string): this {
    this.value += part;
    return this;
  }
}
```

---

## Prototypes & classes

**Q: Prototype chain?**  
A: Objects delegate to `[[Prototype]]` (exposed as `__proto__` or `Object.getPrototypeOf`). Property lookup walks the chain until `null`.

**Q: class vs constructor function?**  
A: `class` is mostly syntactic sugar over prototypes; methods live on the prototype. `extends` sets up the chain; `super` calls parent prototype methods.

```ts
class Animal {
  constructor(public name: string) {}
  speak(): string {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak(): string {
    return `${this.name} barks`;
  }
}
```

**Q: instanceof?**  
A: Checks if `Constructor.prototype` is anywhere on the object's prototype chain. Not reliable across realms/iframes; prefer type guards in TS.

```ts
function isDog(pet: Animal): pet is Dog {
  return pet instanceof Dog;
}
```

---

## Promises & async/await

**Q: Promise states?**  
A: pending → fulfilled or rejected, **once**. `.then` schedules microtasks; errors propagate unless caught.

**Q: async/await vs .then?**  
A: `async` always returns a Promise; `await` pauses inside `async` only. Same underlying mechanism — sugar for readability and try/catch.

```ts
async function fetchUser(id: string): Promise<{ id: string; name: string }> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

**Q: Promise.all vs allSettled vs race?**  
A: `all` fails fast on first rejection. `allSettled` waits for all. `race` settles with the first settled promise.

```ts
const results = await Promise.allSettled([
  fetchUser("1"),
  fetchUser("2"),
]);
```

---

## Event loop (medium depth)

**Q: What runs first: setTimeout(0) or Promise.then?**  
A: Sync code first, then **microtasks** (promise callbacks, queueMicrotask), then **macrotasks** (setTimeout, I/O). That's why promise callbacks often run before timeout 0.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1, 4, 3, 2
```

**Q: Why does this matter in React/Next interviews?**  
A: State updates and effects schedule work; understanding microtasks helps debug batching and "flash" of wrong UI.

---

## Modules

**Q: ESM vs CommonJS?**  
A: ESM: `import`/`export`, static analysis, `import()` dynamic. CJS: `require`, `module.exports`, synchronous load in Node. Bundlers and Node `"type": "module"` blur the line — know your project config.

**TypeScript:** compiles to ESM or CJS per `module` in `tsconfig`; use `import type` for type-only imports (erased at runtime).

```ts
import type { User } from "./types";
import { loadUser } from "./api";
```

---

## Immutability patterns

**Q: How do you "mutate" state in a Redux/React interview?**  
A: Return new references — spread, `map`, `filter`, Immer inside RTK. Same JS skill: avoid mutating shared objects.

```ts
type Todo = { id: string; done: boolean };
function toggle(todos: Todo[], id: string): Todo[] {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}
```

---

## JSON & fetch

**Q: JSON.parse pitfalls?**  
A: No functions, dates become strings, `undefined` keys dropped in `JSON.stringify`. Validate shape after parse — TS `unknown` + type guard or schema (zod).

```ts
function parseUser(raw: string): User {
  const data: unknown = JSON.parse(raw);
  if (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof (data as User).id === "string"
  ) {
    return data as User;
  }
  throw new Error("Invalid user JSON");
}
```

---

## Medium checklist

- Closure + loop variable classic
- Four rules of `this` + arrow lexical `this`
- Prototype chain and `class` sugar
- Promise lifecycle, async/await, Promise.allSettled
- Microtasks before macrotasks (basic event loop)
- ESM vs CJS and `import type` in TypeScript
