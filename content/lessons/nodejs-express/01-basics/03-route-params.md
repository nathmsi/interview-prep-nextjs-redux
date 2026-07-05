# Express 03 — Route Params

> **Pattern:** req.params  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/01-basics/03-route-params/`

## Problem

Read :id from URL params and return a user object.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:03
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference

```typescript
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "User " + req.params.id });
});
```

`req.params` contient les segments dynamiques (`:id`, `:postId`, etc.).
