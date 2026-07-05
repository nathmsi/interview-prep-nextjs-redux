# JavaScript — hard interview Q&A

> Memory, concurrency patterns, TS at scale

## Learning goals

- Describe debounce vs throttle with use cases
- Implement or explain concurrency limiter
- Tie advanced TS (guards, `satisfies`) to JS runtime

---

## Interview answer (30 seconds)

> At senior level I talk about **memory** (listeners, closures holding DOM), **async control** (debounce, queue with concurrency cap), and **safe typing** at boundaries. I avoid `eval`, validate merged objects against **prototype pollution**, and prefer **transform/opacity** for animation perf.

---

## Debounce — Verify it

Paste in console; click fast — only last run fires after 300ms idle.

```js
function debounce(fn, ms) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}
const log = debounce((msg) => console.log(msg), 300);
log("a");
log("b");
log("c"); // only "c" ~300ms later
```

---

## Throttle — when

Scroll/resize: at most once per 100ms. Debounce: search input after typing stops.

---

## `WeakMap` — Verify it

```js
let obj = { id: 1 };
const meta = new WeakMap();
meta.set(obj, "attached");
console.log(meta.get(obj)); // "attached"
obj = null; // entry can be GC'd with obj
```

---

## Concurrency limiter — Verify it

```js
async function mapLimit(items, limit, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  );
  return results;
}

const delays = [50, 50, 50];
const start = Date.now();
await mapLimit(delays, 2, (ms) => new Promise((r) => setTimeout(r, ms)));
console.log("done in ~", Date.now() - start, "ms"); // ~100 not 150
```

---

## TypeScript guards (with JS runtime check)

```ts
type ApiError = { code: number; message: string };

function isApiError(e: unknown): e is ApiError {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    typeof (e as ApiError).code === "number"
  );
}
```

---

## `satisfies` — Verify in TS Playground

```ts
const routes = {
  home: "/",
  cart: "/cart",
} as const satisfies Record<string, `/${string}`>;
```

---

## Security talking points

- **Prototype pollution:** `Object.assign({}, userInput)` — validate keys
- **eval / new Function:** XSS risk — never on user strings
- **CORS:** browser enforces; server sets headers

---

## Checklist

- [ ] Debounce vs throttle use case stated
- [ ] `mapLimit` ~100ms for 3×50ms with limit 2
- [ ] Named WeakMap + prototype pollution

Back to [Basic](./01-basic-interview.md) · TypeScript: [/subjects/typescript](/subjects/typescript)
