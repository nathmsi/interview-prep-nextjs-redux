# Express 08 — Async Route Handler

> **Pattern:** async + next(err)  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/03-middleware/02-async-handler/`

## Problem

Wrap async handlers so errors reach error middleware.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:08
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

```typescript
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get("/fail", asyncHandler(async (_req, _res) => {
  throw new Error("boom");
}));
```
