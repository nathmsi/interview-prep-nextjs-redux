# JavaScript — hard interview Q&A

> **Advanced JS + TypeScript in production** · Memory, concurrency, patterns, pitfalls

---

## Event loop & concurrency

**Q: Microtask starvation?**  
A: If you keep scheduling microtasks (recursive `queueMicrotask` or chained `then`), macrotasks (paint, `setTimeout`) can starve. Rare in app code; know the concept for senior loops.

**Q: async function return value?**  
A: Always wrapped in a Promise. Throwing rejects; returning a value fulfills. Returning a Promise chains it.

**Q: Unhandled rejection?**  
A: Node/process and browsers emit `unhandledrejection`. In apps, always `.catch` on fire-and-forget promises or use `void` with explicit error handling in `async` IIFEs.

```ts
void (async () => {
  try {
    await risky();
  } catch (e) {
    report(e);
  }
})();
```

---

## Memory & performance

**Q: What causes memory leaks in SPAs?**  
A: Detached DOM nodes still referenced, forgotten listeners, closures holding large objects, global caches without eviction, timers/intervals not cleared.

**Q: WeakMap / WeakSet?**  
A: Keys are objects held weakly — do not prevent GC. Useful for metadata on DOM nodes or private caches without leaking memory.

```ts
const cache = new WeakMap<object, string>();

function label(el: object, text: string) {
  cache.set(el, text);
}
```

**Q: Debounce vs throttle?**  
A: Debounce: run after pause in events (search input). Throttle: at most once per window (scroll). Both are closure-heavy interview implementations.

```ts
function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let id: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}
```

---

## Advanced functions

**Q: Currying?**  
A: Transform `f(a,b,c)` into `f(a)(b)(c)` — partial application one argument at a time. Useful for configurable utilities; overuse hurts readability.

**Q: Composition?**  
A: `compose(f, g)(x) === f(g(x))`. Pipelines with reduce; Ramda/lodash history — in modern TS, often inline or small helpers.

**Q: IIFE today?**  
A: Less needed with modules; still used to create scope before `let` or in legacy bundles.

---

## Object model deep dive

**Q: Property descriptors?**  
A: `writable`, `enumerable`, `configurable`, `value` / `get` / `set`. `Object.freeze` makes properties non-writable/non-configurable (shallow).

**Q: Symbols?**  
A: Unique keys, `Symbol.iterator` for iterables, well-known symbols (`toStringTag`). TS: `unique symbol` for branding.

```ts
const brand: unique symbol = Symbol("brand");
type BrandedId = string & { [brand]: true };
```

**Q: Proxy?**  
A: Intercept traps (`get`, `set`, `apply`). Used in reactive systems (Vue 3), test mocks, imutability libs. Performance and debugging cost — mention when asked, not default tool.

---

## Generators & iterators

**Q: Generator function?**  
A: `function*` yields values; returns `{ value, done }` protocol. Async generators for streams; less common in React apps, more in Node/ETL.

```ts
function* range(n: number) {
  for (let i = 0; i < n; i++) yield i;
}
```

---

## TypeScript at hard level (often paired with JS)

**Q: structural typing vs nominal?**  
A: TS is structural — shape matters, not declaration site. `interface A { x: number }` and `type B = { x: number }` are compatible if shapes match.

**Q: type guard vs assertion?**  
A: Guards narrow safely at runtime (`is User`). Assertions (`as User`) trust you — avoid on external data.

```ts
interface ApiError {
  code: number;
  message: string;
}

function isApiError(e: unknown): e is ApiError {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    typeof (e as ApiError).code === "number"
  );
}
```

**Q: discriminated union?**  
A: Common `kind` or `type` field lets TS narrow in `switch`.

```ts
type Result =
  | { ok: true; data: string }
  | { ok: false; error: string };

function handle(r: Result) {
  if (r.ok) console.log(r.data);
  else console.error(r.error);
}
```

**Q: satisfies operator?**  
A: Check value matches type without widening literal types.

```ts
const routes = {
  home: "/",
  cart: "/cart",
} as const satisfies Record<string, `/${string}`>;
```

**Q: keyof / indexed access / mapped types?**  
A: Build API wrappers and safe pickers — senior TS question tied to JS object keys.

```ts
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) out[k] = obj[k];
  return out;
}
```

---

## Security & language gotchas

**Q: eval / new Function?**  
A: XSS and CSP issues; avoid. `JSON.parse` is not eval — but still validate.

**Q: Prototype pollution?**  
A: Merging untrusted objects can set `__proto__` / `constructor.prototype`. Use `Object.create(null)` for maps, validate keys, or libraries that block pollution.

---

## Concurrency models (browser vs Node)

**Q: Web Workers?**  
A: Separate thread, message passing, no DOM. Good for heavy CPU off main thread.

**Q: Node worker_threads vs cluster?**  
A: Workers share memory optionally; cluster forks processes. Know you're in a **Next.js** interview: server code may use Node APIs; client uses Workers sparingly.

---

## Design patterns (JS-flavored)

**Q: Module pattern / revealing module?**  
A: IIFE returning public API — historical; ESM replaced most uses.

**Q: Singleton in JS?**  
A: Module cache is already singleton per import. For tests, inject dependencies instead of hidden globals.

**Q: Promise pooling / limiting concurrency?**  
A: Classic hard question: run max N async tasks at once with a queue — shows closures + Promises mastery.

```ts
async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker())
  );
  return results;
}
```

---

## Hard checklist

- Event loop depth, unhandled rejections, starvation edge case
- Leaks, WeakMap, debounce/throttle implementation
- Descriptors, Proxy, symbols, generators (when they matter)
- TS: guards, discriminated unions, `satisfies`, utility types
- Security: pollution, no eval on user strings
- Optional: concurrency limiter, Workers vs main thread

**Next steps in this repo:** TypeScript quiz (`/lessons/typescript/quiz-questions`), React hooks courses, Redux labs.
