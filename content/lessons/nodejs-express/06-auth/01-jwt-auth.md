# Express 12 — JWT Auth Flow

> **Pattern:** bcrypt + jsonwebtoken  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/06-auth/01-jwt-auth/`

## Problem

Register, login, and protected /me route with bcrypt + JWT.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:12
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference — auth flow

```typescript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "dev-secret";

// POST /auth/register { email, password }
const hash = await bcrypt.hash(password, 10);
users.push({ email, passwordHash: hash });

// POST /auth/login { email, password }
const ok = await bcrypt.compare(password, user.passwordHash);
const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
res.json({ token });

// GET /me — Authorization: Bearer <token>
const payload = jwt.verify(token, JWT_SECRET);
```
