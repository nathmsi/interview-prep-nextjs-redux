# JavaScript — medium interview Q&A

> Closures, `this`, prototypes, Promises, event loop

## Learning goals

- Explain closure with the loop example
- Predict event loop order (microtasks vs macrotasks)
- Compare Promise combinators

---

## Interview answer (30 seconds)

> A **closure** keeps variables from its birth scope. **`this`** depends on call site, except arrows which use lexical `this`. **Promises** are one-shot async; **microtasks** (`.then`) run before **macrotasks** (`setTimeout`). I use **modules** for encapsulation and **immutable updates** for predictable state.

---

## Closures

### Verify it — counter

```js
function makeCounter() {
  let n = 0;
  return () => ++n;
}
const inc = makeCounter();
console.log(inc(), inc(), inc()); // 1 2 3
```

### Verify it — event loop order

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1, 4, 3, 2
```

---

## `this`

**Rules:** default binding, implicit (obj.method), explicit (`call`/`apply`/`bind`), `new`, arrow (lexical).

### Verify it

```js
const obj = {
  name: "Ada",
  greet() {
    return this.name;
  },
  arrow: () => this?.name, // lexical — not obj in browser strict module may differ
};
console.log(obj.greet()); // "Ada"

const fn = obj.greet;
// console.log(fn()); // undefined (strict) or global — classic trap
```

---

## Promises

### Verify it — chain

```js
Promise.resolve(1)
  .then((n) => n + 1)
  .then((n) => {
    throw new Error("fail");
  })
  .catch((e) => "recovered")
  .then(console.log); // "recovered"
```

### Verify it — Promise.all vs allSettled

```js
const ok = Promise.resolve(1);
const fail = Promise.reject(new Error("x"));

Promise.all([ok, fail]).catch((e) => console.log("all failed fast:", e.message));
Promise.allSettled([ok, fail]).then(console.log);
// all failed fast: x
// [ { status: 'fulfilled', value: 1 }, { status: 'rejected', reason: ... } ]
```

---

## Prototypes (one-liner + verify)

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};
const a = new Animal("Cat");
console.log(a.speak()); // Cat makes a sound
console.log(Object.getPrototypeOf(a) === Animal.prototype); // true
```

---

## Modules (ESM)

**Interview:** `import`/`export` static; `import()` dynamic. No `require` in native browser ESM without bundler.

```ts
import type { User } from "./types"; // erased at runtime
import { loadUser } from "./api";
```

---

## Immutability (Redux/React pattern)

### Verify it

```js
const todos = [{ id: "1", done: false }];
const next = todos.map((t) =>
  t.id === "1" ? { ...t, done: true } : t
);
console.log(todos[0].done); // false
console.log(next[0].done);  // true
```

---

## Common mistakes

- Missing `await` → Promise logs as pending object
- `async` arrow in object literal as method — wrong `this`
- Infinite `useEffect` without deps (see React track)

---

## Checklist

- [ ] Event loop order 1,4,3,2 spoken aloud
- [ ] Closure counter returns 1,2,3
- [ ] `Promise.allSettled` vs `all` difference

Next: [Hard →](./03-hard-interview.md)
