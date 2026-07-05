# Express 06 — 404 Handler

> **Pattern:** 404 middleware  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/02-routing/03-not-found/`

## Problem

Return JSON 404 for unknown routes.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:06
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

Le handler 404 doit être **après** toutes les routes :

```typescript
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});
```
