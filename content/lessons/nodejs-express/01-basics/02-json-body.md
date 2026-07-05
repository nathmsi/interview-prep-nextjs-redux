# Express 02 — JSON Body Parser

> **Pattern:** express.json()  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/01-basics/02-json-body/`

## Problem

Parse JSON bodies with express.json() and echo them back.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:02
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

```typescript
app.use(express.json());

app.post("/echo", (req, res) => {
  res.json({ received: req.body });
});
```

`express.json()` doit être **avant** les routes qui lisent `req.body`.
