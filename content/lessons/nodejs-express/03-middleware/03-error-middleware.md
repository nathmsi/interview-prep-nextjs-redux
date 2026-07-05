# Express 09 — Error Middleware

> **Pattern:** 4-arg middleware  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/03-middleware/03-error-middleware/`

## Problem

Central error handler with status codes.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:09
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

```typescript
class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

app.get("/missing", () => {
  throw new AppError("Not found", 404);
});

app.use((err, _req, res, _next) => {
  const status = err instanceof AppError ? err.statusCode : 500;
  res.status(status).json({ error: err.message });
});
```

Express reconnaît un error middleware par ses **4 arguments**.
