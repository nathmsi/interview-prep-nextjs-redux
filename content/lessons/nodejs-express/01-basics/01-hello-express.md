# Express 01 — Hello Express

> **Pattern:** Express app  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/01-basics/01-hello-express/`

## Problem

Create an Express app with a health check route.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:01
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference — minimal Express server

```typescript
import express from "express";

const app = express();

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
```

## Supertest (sans ouvrir de port)

```typescript
import request from "supertest";
import { createApp } from "./app";

const app = createApp();
const res = await request(app).get("/health");
expect(res.status).toBe(200);
```
