# Express 11 — Todos CRUD API

> **Pattern:** REST CRUD  
> **Export:** `createApp()` from `app.ts`  
> **Exercise:** `content/exercises/nodejs-express/05-crud/01-todos-api/`

## Problem

Full in-memory CRUD for todos.

## Files

| File | Role |
|------|------|
| `app.ts` | Express app — **you implement the TODOs** |
| `app.test.ts` | Supertest tests (no real port opened) |

## Run locally

```bash
npm run server:11
```

## Dev server (optional)

```typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
```

## Reference — REST mapping

| Method | Route | Action |
|--------|-------|--------|
| GET | /api/todos | list all |
| POST | /api/todos | create |
| GET | /api/todos/:id | get one |
| DELETE | /api/todos/:id | delete |

```typescript
let todos: Todo[] = [];
let nextId = 1;

app.post("/api/todos", (req, res) => {
  const todo = { id: String(nextId++), title: req.body.title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});
```
