#!/usr/bin/env node
/**
 * Generate nodejs-express exercises + lessons.
 * Run: node scripts/generate-express-section.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

const VITEST_ENV = `/**
 * @vitest-environment node
 */
`;

const EXERCISES = [
  {
    section: "01-basics",
    slug: "01-hello-express",
    num: 1,
    global: 1,
    title: "Hello Express",
    summary: "Create an Express app with a health check route.",
    pattern: "Express app",
    exportFn: "createApp",
    lessonExtra: `## Reference — minimal Express server

\`\`\`typescript
import express from "express";

const app = express();

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
\`\`\`

## Supertest (sans ouvrir de port)

\`\`\`typescript
import request from "supertest";
import { createApp } from "./app";

const app = createApp();
const res = await request(app).get("/health");
expect(res.status).toBe(200);
\`\`\``,
    app: `import express, { type Express } from "express";

/**
 * EXERCISE express 01 — Hello Express
 *
 * Add GET /health → { status: "ok" }
 * Run: npm run server:01
 */
export function createApp(): Express {
  const app = express();

  // TODO: GET /health → res.json({ status: "ok" })

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/01-basics/01-hello-express", () => {
  const app = createApp();

  it("GET /health returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});`,
  },
  {
    section: "01-basics",
    slug: "02-json-body",
    num: 2,
    global: 2,
    title: "JSON Body Parser",
    summary: "Parse JSON bodies with express.json() and echo them back.",
    pattern: "express.json()",
    exportFn: "createApp",
    lessonExtra: `## Reference

\`\`\`typescript
app.use(express.json());

app.post("/echo", (req, res) => {
  res.json({ received: req.body });
});
\`\`\`

\`express.json()\` doit être **avant** les routes qui lisent \`req.body\`.`,
    app: `import express, { type Express } from "express";

/**
 * EXERCISE express 02 — JSON Body
 *
 * - Use express.json()
 * - POST /echo → { received: req.body }
 * Run: npm run server:02
 */
export function createApp(): Express {
  const app = express();

  // TODO: app.use(express.json())
  // TODO: POST /echo

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/01-basics/02-json-body", () => {
  const app = createApp();

  it("POST /echo returns body", async () => {
    const res = await request(app)
      .post("/echo")
      .send({ name: "Ada" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ received: { name: "Ada" } });
  });
});`,
  },
  {
    section: "01-basics",
    slug: "03-route-params",
    num: 3,
    global: 3,
    title: "Route Params",
    summary: "Read :id from URL params and return a user object.",
    pattern: "req.params",
    exportFn: "createApp",
    lessonExtra: `## Reference

\`\`\`typescript
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "User " + req.params.id });
});
\`\`\`

\`req.params\` contient les segments dynamiques (\`:id\`, \`:postId\`, etc.).`,
    app: `import express, { type Express } from "express";

/**
 * EXERCISE express 03 — Route Params
 *
 * GET /users/:id → { id, name: "User " + id }
 * Run: npm run server:03
 */
export function createApp(): Express {
  const app = express();

  // TODO: GET /users/:id

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/01-basics/03-route-params", () => {
  const app = createApp();

  it("GET /users/:id", async () => {
    const res = await request(app).get("/users/42");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "42", name: "User 42" });
  });
});`,
  },
  {
    section: "02-routing",
    slug: "01-query-string",
    num: 1,
    global: 4,
    title: "Query String Filters",
    summary: "Filter items by category query param.",
    pattern: "req.query",
    exportFn: "createApp",
    lessonExtra: `## Reference

\`\`\`typescript
const ITEMS = [
  { id: "1", name: "Book", category: "books" },
  { id: "2", name: "Pen", category: "office" },
];

app.get("/items", (req, res) => {
  const category = req.query.category as string | undefined;
  const items = category
    ? ITEMS.filter((i) => i.category === category)
    : ITEMS;
  res.json(items);
});
\`\`\``,
    app: `import express, { type Express } from "express";

const ITEMS = [
  { id: "1", name: "TypeScript Handbook", category: "books" },
  { id: "2", name: "Notebook", category: "office" },
  { id: "3", name: "React Patterns", category: "books" },
];

/**
 * EXERCISE express 04 — Query String
 *
 * GET /items — all items
 * GET /items?category=books — filtered
 * Run: npm run server:04
 */
export function createApp(): Express {
  const app = express();

  // TODO: GET /items with optional ?category= filter (use ITEMS)

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/02-routing/01-query-string", () => {
  const app = createApp();

  it("lists all items", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it("filters by category", async () => {
    const res = await request(app).get("/items?category=books");
    expect(res.body).toHaveLength(2);
    expect(res.body.every((i: { category: string }) => i.category === "books")).toBe(true);
  });
});`,
  },
  {
    section: "02-routing",
    slug: "02-express-router",
    num: 2,
    global: 5,
    title: "Express Router",
    summary: "Mount a /api router with separate route module.",
    pattern: "express.Router",
    exportFn: "createApp",
    lessonExtra: `## Reference — routes/users.ts

\`\`\`typescript
import { Router } from "express";
export const usersRouter = Router();

usersRouter.get("/", (_req, res) => {
  res.json([{ id: "1", name: "Ada" }]);
});
\`\`\`

## app.ts

\`\`\`typescript
import { usersRouter } from "./routes/users";
app.use("/api/users", usersRouter);
\`\`\``,
    app: `import express, { type Express } from "express";
import { usersRouter } from "./routes/users";

/**
 * EXERCISE express 05 — Express Router
 *
 * Mount usersRouter at /api/users
 * Run: npm run server:05
 */
export function createApp(): Express {
  const app = express();

  // TODO: app.use("/api/users", usersRouter)

  return app;
}`,
    extraFiles: {
      "routes/users.ts": `import { Router } from "express";

export const usersRouter = Router();

// TODO: GET / → [{ id: "1", name: "Ada" }]
`,
    },
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/02-routing/02-express-router", () => {
  const app = createApp();

  it("GET /api/users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: "1", name: "Ada" }]);
  });
});`,
  },
  {
    section: "02-routing",
    slug: "03-not-found",
    num: 3,
    global: 6,
    title: "404 Handler",
    summary: "Return JSON 404 for unknown routes.",
    pattern: "404 middleware",
    exportFn: "createApp",
    lessonExtra: `## Reference

Le handler 404 doit être **après** toutes les routes :

\`\`\`typescript
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});
\`\`\``,
    app: `import express, { type Express } from "express";

/**
 * EXERCISE express 06 — 404 Handler
 *
 * GET /exists → { ok: true }
 * anything else → 404 { error: "Not found" }
 * Run: npm run server:06
 */
export function createApp(): Express {
  const app = express();

  app.get("/exists", (_req, res) => {
    res.json({ ok: true });
  });

  // TODO: 404 middleware (must be last)

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/02-routing/03-not-found", () => {
  const app = createApp();

  it("known route works", async () => {
    const res = await request(app).get("/exists");
    expect(res.status).toBe(200);
  });

  it("unknown route returns 404", async () => {
    const res = await request(app).get("/nope");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });
});`,
  },
  {
    section: "03-middleware",
    slug: "01-request-logger",
    num: 1,
    global: 7,
    title: "Request Logger",
    summary: "Custom middleware that logs method and path.",
    pattern: "app.use middleware",
    exportFn: "createApp",
    lessonExtra: `## Reference

\`\`\`typescript
const logs: string[] = [];

function requestLogger(req, res, next) {
  logs.push(\`\${req.method} \${req.path}\`);
  next();
}

app.use(requestLogger);
\`\`\`

Toujours appeler \`next()\` sauf si tu termines la réponse.`,
    app: `import express, { type Express, type Request, type Response, type NextFunction } from "express";

/** Shared log buffer — tests read this */
export const requestLogs: string[] = [];

/**
 * EXERCISE express 07 — Request Logger
 *
 * Export requestLogger middleware: push "\${method} \${path}" to requestLogs
 * Mount it before routes. GET /test → { ok: true }
 * Run: npm run server:07
 */
export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  // TODO: push to requestLogs, call next()
}

export function createApp(): Express {
  const app = express();
  requestLogs.length = 0;

  // TODO: app.use(requestLogger)
  // TODO: GET /test → { ok: true }

  return app;
}`,
    test: `import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp, requestLogs } from "./app";

describe("express/03-middleware/01-request-logger", () => {
  beforeEach(() => { requestLogs.length = 0; });

  it("logs requests", async () => {
    const app = createApp();
    await request(app).get("/test");
    expect(requestLogs).toContain("GET /test");
  });
});`,
  },
  {
    section: "03-middleware",
    slug: "02-async-handler",
    num: 2,
    global: 8,
    title: "Async Route Handler",
    summary: "Wrap async handlers so errors reach error middleware.",
    pattern: "async + next(err)",
    exportFn: "createApp",
    lessonExtra: `## Reference

\`\`\`typescript
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get("/fail", asyncHandler(async (_req, _res) => {
  throw new Error("boom");
}));
\`\`\``,
    app: `import express, { type Express, type Request, type Response, type NextFunction } from "express";

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * EXERCISE express 08 — Async Handler
 *
 * Implement asyncHandler — catches rejections and calls next(err)
 * GET /fail throws → error middleware returns 500
 * Run: npm run server:08
 */
export function asyncHandler(fn: AsyncRequestHandler) {
  // TODO: return middleware that catches async errors
  return (_req: Request, _res: Response, next: NextFunction) => next();
}

export function createApp(): Express {
  const app = express();

  app.get("/fail", asyncHandler(async () => {
    throw new Error("boom");
  }));

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: err.message });
  });

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/03-middleware/02-async-handler", () => {
  it("handles async errors", async () => {
    const res = await request(createApp()).get("/fail");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "boom" });
  });
});`,
  },
  {
    section: "03-middleware",
    slug: "03-error-middleware",
    num: 3,
    global: 9,
    title: "Error Middleware",
    summary: "Central error handler with status codes.",
    pattern: "4-arg middleware",
    exportFn: "createApp",
    lessonExtra: `## Reference

\`\`\`typescript
class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

app.get("/missing", () => {
  throw new AppError("Not found", 404);
});

app.use((err, _req, res, _next) => {
  const status = err instanceof AppError ? err.statusCode : 500;
  res.status(status).json({ error: err.message });
});
\`\`\`

Express reconnaît un error middleware par ses **4 arguments**.`,
    app: `import express, { type Express, type Request, type Response, type NextFunction } from "express";

export class AppError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

/**
 * EXERCISE express 09 — Error Middleware
 *
 * Implement errorHandler (4 args): AppError → its status, else 500
 * GET /missing throws AppError("Item not found", 404)
 * Run: npm run server:09
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // TODO: map error to status + { error: message }
  res.status(500).json({ error: "Internal error" });
}

export function createApp(): Express {
  const app = express();

  app.get("/missing", () => {
    throw new AppError("Item not found", 404);
  });

  // TODO: app.use(errorHandler)

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/03-middleware/03-error-middleware", () => {
  it("returns 404 for AppError", async () => {
    const res = await request(createApp()).get("/missing");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});`,
  },
  {
    section: "04-validation",
    slug: "01-zod-body",
    num: 1,
    global: 10,
    title: "Zod Body Validation",
    summary: "Validate POST body with Zod safeParse.",
    pattern: "Zod",
    exportFn: "createApp",
    lessonExtra: `## Reference

\`\`\`typescript
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
\`\`\``,
    app: `import express, { type Express } from "express";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

/**
 * EXERCISE express 10 — Zod Validation
 *
 * POST /users — validate body with createUserSchema
 * 400 on invalid, 201 + { id: "1", email, name } on success
 * Run: npm run server:10
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());

  // TODO: POST /users with Zod validation

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/04-validation/01-zod-body", () => {
  const app = createApp();

  it("creates user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "a@b.com", name: "Ada" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: "1", email: "a@b.com", name: "Ada" });
  });

  it("rejects invalid email", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "bad", name: "Ada" });
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});`,
  },
  {
    section: "05-crud",
    slug: "01-todos-api",
    num: 1,
    global: 11,
    title: "Todos CRUD API",
    summary: "Full in-memory CRUD for todos.",
    pattern: "REST CRUD",
    exportFn: "createApp",
    lessonExtra: `## Reference — REST mapping

| Method | Route | Action |
|--------|-------|--------|
| GET | /api/todos | list all |
| POST | /api/todos | create |
| GET | /api/todos/:id | get one |
| DELETE | /api/todos/:id | delete |

\`\`\`typescript
let todos: Todo[] = [];
let nextId = 1;

app.post("/api/todos", (req, res) => {
  const todo = { id: String(nextId++), title: req.body.title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});
\`\`\``,
    app: `import express, { type Express } from "express";

export type Todo = { id: string; title: string; done: boolean };

/**
 * EXERCISE express 11 — Todos CRUD
 *
 * In-memory store (module-level array + nextId counter):
 * - GET    /api/todos       → all todos
 * - POST   /api/todos       → { title } → 201 created todo
 * - GET    /api/todos/:id   → one or 404
 * - DELETE /api/todos/:id   → 204 or 404
 * Run: npm run server:11
 */
export function createApp(): Express {
  const app = express();
  app.use(express.json());

  // TODO: implement CRUD routes

  return app;
}`,
    test: `import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/05-crud/01-todos-api", () => {
  const app = createApp();

  it("CRUD flow", async () => {
    const list = await request(app).get("/api/todos");
    expect(list.body).toEqual([]);

    const created = await request(app)
      .post("/api/todos")
      .send({ title: "Learn Express" });
    expect(created.status).toBe(201);
    expect(created.body.title).toBe("Learn Express");

    const id = created.body.id;
    const one = await request(app).get(\`/api/todos/\${id}\`);
    expect(one.status).toBe(200);

    await request(app).delete(\`/api/todos/\${id}\`).expect(204);
    await request(app).get(\`/api/todos/\${id}\`).expect(404);
  });
});`,
  },
  {
    section: "06-auth",
    slug: "01-jwt-auth",
    num: 1,
    global: 12,
    title: "JWT Auth Flow",
    summary: "Register, login, and protected /me route with bcrypt + JWT.",
    pattern: "bcrypt + jsonwebtoken",
    exportFn: "createApp",
    lessonExtra: `## Reference — auth flow

\`\`\`typescript
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
\`\`\``,
    app: `import express, { type Express, type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "exercise-dev-secret";

type User = { email: string; passwordHash: string };
const users: User[] = [];

declare global {
  namespace Express {
    interface Request {
      user?: { email: string };
    }
  }
}

/**
 * EXERCISE express 12 — JWT Auth
 *
 * POST /auth/register { email, password } → 201
 * POST /auth/login    { email, password } → { token }
 * GET  /me            (Bearer token)      → { email }
 * Run: npm run server:12
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // TODO: read Bearer token, jwt.verify, set req.user, or 401
  res.status(401).json({ error: "Unauthorized" });
}

export function createApp(): Express {
  const app = express();
  app.use(express.json());
  users.length = 0;

  // TODO: POST /auth/register
  // TODO: POST /auth/login → { token }
  // TODO: GET /me with requireAuth

  return app;
}`,
    test: `import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "./app";

describe("express/06-auth/01-jwt-auth", () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    app = createApp();
  });

  it("register, login, me", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "a@b.com", password: "secret123" })
      .expect(201);

    const login = await request(app)
      .post("/auth/login")
      .send({ email: "a@b.com", password: "secret123" });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeTruthy();

    const me = await request(app)
      .get("/me")
      .set("Authorization", \`Bearer \${login.body.token}\`);
    expect(me.status).toBe(200);
    expect(me.body.email).toBe("a@b.com");
  });

  it("rejects /me without token", async () => {
    await request(app).get("/me").expect(401);
  });
});`,
  },
];

function writeExercise(ex) {
  const dir = path.join(ROOT, "content/exercises/nodejs-express", ex.section, ex.slug);
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(path.join(dir, "app.ts"), ex.app + "\n");
  fs.writeFileSync(path.join(dir, "app.test.ts"), VITEST_ENV + ex.test + "\n");

  if (ex.extraFiles) {
    for (const [rel, content] of Object.entries(ex.extraFiles)) {
      const fp = path.join(dir, rel);
      fs.mkdirSync(path.dirname(fp), { recursive: true });
      fs.writeFileSync(fp, content + "\n");
    }
  }

  const lessonDir = path.join(ROOT, "content/lessons/nodejs-express", ex.section);
  fs.mkdirSync(lessonDir, { recursive: true });

  const testCmd = `npm run server:${String(ex.global).padStart(2, "0")}`;
  const lesson = `# Express ${String(ex.global).padStart(2, "0")} — ${ex.title}

> **Pattern:** ${ex.pattern}  
> **Export:** \`createApp()\` from \`app.ts\`  
> **Exercise:** \`content/exercises/nodejs-express/${ex.section}/${ex.slug}/\`

## Problem

${ex.summary}

## Files

| File | Role |
|------|------|
| \`app.ts\` | Express app — **you implement the TODOs** |
| \`app.test.ts\` | Supertest tests (no real port opened) |

## Run locally

\`\`\`bash
${testCmd}
\`\`\`

## Dev server (optional)

\`\`\`typescript
// dev.ts — not part of tests, for manual try
import { createApp } from "./app";
createApp().listen(3000, () => console.log("http://localhost:3000"));
\`\`\`

${ex.lessonExtra || ""}
`;
  fs.writeFileSync(path.join(lessonDir, `${ex.slug}.md`), lesson);

  return { ...ex, testCmd };
}

const meta = EXERCISES.map(writeExercise);
fs.writeFileSync(
  path.join(ROOT, "scripts/express-exercises-meta.json"),
  JSON.stringify(meta, null, 2)
);
console.log(`Generated ${meta.length} Express exercises`);
