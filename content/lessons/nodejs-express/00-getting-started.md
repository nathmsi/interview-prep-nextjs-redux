# Express — Getting started (reference)

> Read this first before the hands-on exercises.  
> Each exercise exports `createApp()` and is tested with **supertest** (no real port).

## 1. Minimal app

```typescript
import express from "express";

const app = express();

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000);
```

## 2. Project layout (our exercises)

```
content/exercises/nodejs-express/01-basics/01-hello-express/
  app.ts       ← you complete TODOs, export createApp()
  app.test.ts  ← supertest — do not edit
```

```typescript
// app.ts pattern
import express, { type Express } from "express";

export function createApp(): Express {
  const app = express();
  // your routes here
  return app;
}
```

## 3. Supertest

```typescript
import request from "supertest";
import { createApp } from "./app";

const app = createApp();
const res = await request(app).get("/health");
expect(res.status).toBe(200);
expect(res.body).toEqual({ status: "ok" });
```

## 4. JSON body

```typescript
app.use(express.json());

app.post("/users", (req, res) => {
  const { email, name } = req.body;
  res.status(201).json({ id: "1", email, name });
});
```

## 5. Params & query

```typescript
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

app.get("/items", (req, res) => {
  const category = req.query.category as string | undefined;
  // filter...
});
```

## 6. Router module

```typescript
// routes/todos.ts
import { Router } from "express";
export const todosRouter = Router();
todosRouter.get("/", (_req, res) => res.json([]));

// app.ts
import { todosRouter } from "./routes/todos";
app.use("/api/todos", todosRouter);
```

## 7. Middleware

```typescript
function logger(req, res, next) {
  console.log(req.method, req.path);
  next();
}
app.use(logger);
```

Order matters: `express.json()` → custom middleware → routes → 404 → error handler.

## 8. Error middleware (4 arguments)

```typescript
app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err.message });
});
```

## 9. Async routes

```typescript
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/data", asyncHandler(async (_req, res) => {
  const data = await fetchSomething();
  res.json(data);
}));
```

## 10. Zod validation

```typescript
import { z } from "zod";

const schema = z.object({ email: z.string().email() });
const parsed = schema.safeParse(req.body);
if (!parsed.success) {
  return res.status(400).json({ errors: parsed.error.flatten() });
}
```

## 11. Auth (bcrypt + JWT)

```typescript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hash = await bcrypt.hash(password, 10);
const ok = await bcrypt.compare(password, storedHash);
const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
const payload = jwt.verify(token, SECRET);
```

## Commands

```bash
npm run server:01   # hello express
npm run server:11   # todos CRUD
npm run server:12   # JWT auth
```
