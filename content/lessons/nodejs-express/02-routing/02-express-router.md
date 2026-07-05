# Express 05 — Express Router

> **Pattern:** express.Router  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/02-routing/02-express-router/`

## Problem

Mount a /api router with separate route module.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:05
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference — routes/users.ts

```typescript
import { Router } from "express";
export const usersRouter = Router();

usersRouter.get("/", (_req, res) => {
  res.json([{ id: "1", name: "Ada" }]);
});
```

## app.ts

```typescript
import { usersRouter } from "./routes/users";
app.use("/api/users", usersRouter);
```
