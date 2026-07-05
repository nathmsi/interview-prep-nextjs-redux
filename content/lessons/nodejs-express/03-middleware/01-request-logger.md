# Express 07 — Request Logger

> **Pattern:** app.use middleware  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/03-middleware/01-request-logger/`

## Problem

Custom middleware that logs method and path.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:07
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

```typescript
const logs: string[] = [];

function requestLogger(req, res, next) {
  logs.push(`${req.method} ${req.path}`);
  next();
}

app.use(requestLogger);
```

Toujours appeler `next()` sauf si tu termines la réponse.
