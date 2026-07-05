# Express 10 — Zod Body Validation

> **Pattern:** Zod  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/04-validation/01-zod-body/`

## Problem

Validate POST body with Zod safeParse.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:10
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

```typescript
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

app.post("/users", (req, res) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }
  res.status(201).json({ id: "1", ...parsed.data });
});
```
