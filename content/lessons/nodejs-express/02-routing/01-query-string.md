# Express 04 — Query String Filters

> **Pattern:** req.query  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/02-routing/01-query-string/`

## Problem

Filter items by category query param.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:04
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

```typescript
const ITEMS = [
  { id: "1", name: "Book", category: "books" },
  { id: "2", name: "Pen", category: "office" },
];

app.get("/items", (req, res) => {
  const category = req.query.category as string | undefined;
  const items = category
    ? ITEMS.filter((i) => i.category === category)
    : ITEMS;
  res.json(items);
});
```
