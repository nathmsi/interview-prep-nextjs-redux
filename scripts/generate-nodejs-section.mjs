#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

const EXERCISES = [
  ["01-http-fundamentals", "01-parse-url", 1, 1, "Parse URL", "Extract pathname and query params from a request path.", "URL parsing", "parseUrl"],
  ["01-http-fundamentals", "02-match-route", 2, 2, "Match Route", "Match path patterns with :param segments.", "Routing", "matchRoute"],
  ["01-http-fundamentals", "03-build-response", 3, 3, "Build HTTP Response", "Build status, headers, and JSON body.", "HTTP response", "buildResponse"],
  ["01-http-fundamentals", "04-parse-headers", 4, 4, "Parse Headers", "Parse raw header block into lowercase map.", "HTTP parsing", "parseHeaders"],
  ["02-middleware", "01-compose-middleware", 1, 5, "Compose Middleware", "Chain Express-style middleware functions.", "Middleware chain", "composeMiddleware"],
  ["02-middleware", "02-async-handler", 2, 6, "Async Handler", "Wrap async handlers; forward rejections to next(err).", "Error forwarding", "asyncHandler"],
  ["02-middleware", "03-cors-middleware", 3, 7, "CORS Middleware", "Set CORS headers for allowed origins.", "CORS", "createCorsMiddleware"],
  ["02-middleware", "04-request-id", 4, 8, "Request ID Middleware", "Attach unique X-Request-Id to req and res.", "Observability", "requestIdMiddleware"],
  ["03-validation", "01-parse-json-body", 1, 9, "Parse JSON Body", "Parse JSON with max size and typed errors.", "Body parsing", "parseJsonBody"],
  ["03-validation", "02-validate-fields", 2, 10, "Validate Fields", "Validate required fields and basic types.", "Schema validation", "validateFields"],
  ["03-validation", "03-sanitize-user", 3, 11, "Sanitize User Input", "Trim, lowercase email, cap name length.", "Sanitization", "sanitizeUserInput"],
  ["03-validation", "04-strip-html", 4, 12, "Strip HTML Tags", "Remove HTML tags from user content.", "Sanitization", "stripHtmlTags"],
  ["04-auth-security", "01-hash-password", 1, 13, "Hash Password", "Hash password with salt (no external libs).", "Password hashing", "hashPassword"],
  ["04-auth-security", "02-verify-password", 2, 14, "Verify Password", "Compare plaintext against stored hash.", "Password verify", "verifyPassword"],
  ["04-auth-security", "03-sign-jwt", 3, 15, "Sign JWT", "Create a minimal HMAC-signed JWT string.", "JWT", "signJwt"],
  ["04-auth-security", "04-verify-jwt", 4, 16, "Verify JWT", "Verify signature and decode JWT payload.", "JWT", "verifyJwt"],
  ["05-data-layer", "01-in-memory-repo", 1, 17, "In-Memory Repository", "Generic CRUD store with numeric ids.", "Repository", "InMemoryRepository"],
  ["05-data-layer", "02-offset-pagination", 2, 18, "Offset Pagination", "Slice a list with page and pageSize.", "Pagination", "paginateOffset"],
  ["05-data-layer", "03-cursor-pagination", 3, 19, "Cursor Pagination", "Encode/decode cursor for stable paging.", "Pagination", "encodeCursor / decodeCursor"],
  ["05-data-layer", "04-find-or-throw", 4, 20, "Find Or Throw", "Return entity or throw NotFoundError.", "Repository", "findOrThrow"],
  ["06-rate-limit-cache", "01-token-bucket", 1, 21, "Token Bucket Limiter", "Allow N requests per refill interval.", "Rate limiting", "TokenBucket"],
  ["06-rate-limit-cache", "02-response-cache", 2, 22, "Response Cache", "In-memory GET cache with TTL per key.", "Caching", "ResponseCache"],
  ["06-rate-limit-cache", "03-request-dedup", 3, 23, "Request Dedup", "Coalesce concurrent identical async calls.", "Concurrency", "dedupeRequests"],
  ["06-rate-limit-cache", "04-sliding-window", 4, 24, "Sliding Window Limiter", "Max N requests per rolling time window.", "Rate limiting", "SlidingWindowLimiter"],
  ["07-error-handling", "01-app-error", 1, 25, "App Error", "Custom error with HTTP status code.", "Errors", "AppError"],
  ["07-error-handling", "02-error-to-json", 2, 26, "Error To JSON", "Map errors to API JSON shape.", "Errors", "errorToJson"],
  ["07-error-handling", "03-http-errors", 3, 27, "HTTP Error Helpers", "Factory helpers for 400/404/500.", "Errors", "badRequest / notFound"],
  ["07-error-handling", "04-error-middleware", 4, 28, "Error Middleware", "Central error handler middleware.", "Errors", "errorMiddleware"],
  ["08-production-patterns", "01-graceful-shutdown", 1, 29, "Graceful Shutdown", "Register cleanup handlers on shutdown signal.", "Lifecycle", "createShutdownHandler"],
  ["08-production-patterns", "02-process-batch", 2, 30, "Process Batch", "Process items in fixed-size async batches.", "Batching", "processBatch"],
  ["08-production-patterns", "03-health-check", 3, 31, "Health Check", "Aggregate dependency health statuses.", "Observability", "buildHealthReport"],
  ["08-production-patterns", "04-retry-backoff", 4, 32, "Retry With Backoff", "Retry async fn with exponential backoff.", "Resilience", "retryWithBackoff"],
];

const EXERCISE_DETAILS = {
  "01-parse-url": {
    types: `export type ParsedUrl = { pathname: string; query: Record<string, string> };`,
    sig: `export function parseUrl(path: string): ParsedUrl`,
    stub: `return { pathname: "/", query: {} };`,
    problem: "Given `/users?page=2&limit=10`, return `{ pathname, query }`. Decode URI components. First value wins for duplicate keys.",
    hint: "Split on `?`, parse query with `&` and `=`.",
    tests: `import { describe, it, expect } from "vitest";
import { parseUrl } from "./exercise";

describe("nodejs/01-http-fundamentals/01-parse-url", () => {
  it("parses pathname only", () => {
    expect(parseUrl("/users")).toEqual({ pathname: "/users", query: {} });
  });
  it("parses query string", () => {
    expect(parseUrl("/users?page=2&limit=10")).toEqual({
      pathname: "/users",
      query: { page: "2", limit: "10" },
    });
  });
  it("decodes encoded values", () => {
    expect(parseUrl("/search?q=hello%20world")).toEqual({
      pathname: "/search",
      query: { q: "hello world" },
    });
  });
});`,
  },
  "02-match-route": {
    types: `export type RouteMatch = { params: Record<string, string> };`,
    sig: `export function matchRoute(pattern: string, path: string): RouteMatch | null`,
    stub: `return null;`,
    problem: "Match pattern like `/users/:id` against path. Return params or null.",
    hint: "Split segments; compare static or capture :param.",
    tests: `import { describe, it, expect } from "vitest";
import { matchRoute } from "./exercise";

describe("nodejs/01-http-fundamentals/02-match-route", () => {
  it("matches static path", () => {
    expect(matchRoute("/health", "/health")).toEqual({ params: {} });
  });
  it("extracts params", () => {
    expect(matchRoute("/users/:id", "/users/42")).toEqual({ params: { id: "42" } });
  });
  it("returns null on mismatch", () => {
    expect(matchRoute("/users/:id", "/posts/1")).toBeNull();
  });
});`,
  },
  "03-build-response": {
    types: `export type HttpResponse = { status: number; headers: Record<string, string>; body: string };`,
    sig: `export function buildResponse(status: number, body: unknown, headers?: Record<string, string>): HttpResponse`,
    stub: `return { status, headers: headers ?? {}, body: "" };`,
    problem: "Default Content-Type application/json for object bodies. String bodies pass through.",
    hint: "JSON.stringify non-strings; merge headers.",
    tests: `import { describe, it, expect } from "vitest";
import { buildResponse } from "./exercise";

describe("nodejs/01-http-fundamentals/03-build-response", () => {
  it("serializes object as JSON", () => {
    const res = buildResponse(200, { ok: true });
    expect(res.body).toBe('{"ok":true}');
    expect(res.headers["Content-Type"]).toBe("application/json");
  });
  it("keeps string body", () => {
    expect(buildResponse(200, "plain").body).toBe("plain");
  });
});`,
  },
  "04-parse-headers": {
    types: "",
    sig: `export function parseHeaders(raw: string): Record<string, string>`,
    stub: `return {};`,
    problem: "Parse `Key: value` lines. Lowercase keys. Trim values.",
    hint: "Split on newlines, first colon separates key/value.",
    tests: `import { describe, it, expect } from "vitest";
import { parseHeaders } from "./exercise";

describe("nodejs/01-http-fundamentals/04-parse-headers", () => {
  it("parses headers", () => {
    const raw = "Content-Type: application/json\\nAuthorization: Bearer t";
    expect(parseHeaders(raw)).toEqual({
      "content-type": "application/json",
      authorization: "Bearer t",
    });
  });
});`,
  },
  "01-compose-middleware": {
    types: `export type Req = Record<string, unknown>;
export type Res = { status: number; headers: Record<string, string>; body: string };
export type Next = (err?: unknown) => void;
export type Middleware = (req: Req, res: Res, next: Next) => void;`,
    sig: `export function composeMiddleware(middlewares: Middleware[]): Middleware`,
    stub: `return (_req, _res, next) => next();`,
    problem: "Run middleware in order. Stop chain when next(err) is called.",
    hint: "Index-based recursion.",
    tests: `import { describe, it, expect, vi } from "vitest";
import { composeMiddleware, type Req, type Res } from "./exercise";

describe("nodejs/02-middleware/01-compose-middleware", () => {
  it("runs in order", () => {
    const order: number[] = [];
    const m1 = (_r: Req, _s: Res, n: () => void) => { order.push(1); n(); };
    const m2 = (_r: Req, _s: Res, n: () => void) => { order.push(2); n(); };
    composeMiddleware([m1, m2])({}, { status: 200, headers: {}, body: "" }, () => order.push(3));
    expect(order).toEqual([1, 2, 3]);
  });
  it("stops on error", () => {
    const m2 = vi.fn();
    const m1 = (_r: Req, _s: Res, n: (e?: unknown) => void) => n(new Error("x"));
    composeMiddleware([m1, m2])({}, { status: 200, headers: {}, body: "" }, () => {});
    expect(m2).not.toHaveBeenCalled();
  });
});`,
  },
  "02-async-handler": {
    types: `export type Req = Record<string, unknown>;
export type Res = { json: (body: unknown) => void };
export type Next = (err?: unknown) => void;
export type AsyncHandler = (req: Req, res: Res) => Promise<void>;`,
    sig: `export function asyncHandler(fn: AsyncHandler): (req: Req, res: Res, next: Next) => void`,
    stub: `return (_req, _res, next) => next();`,
    problem: "Wrap async handler; call next(err) on rejection.",
    hint: "fn(req,res).catch(next)",
    tests: `import { describe, it, expect, vi } from "vitest";
import { asyncHandler } from "./exercise";

describe("nodejs/02-middleware/02-async-handler", () => {
  it("forwards rejection", async () => {
    const err = new Error("fail");
    const next = vi.fn();
    asyncHandler(vi.fn().mockRejectedValue(err))({}, { json: vi.fn() }, next);
    await Promise.resolve();
    expect(next).toHaveBeenCalledWith(err);
  });
});`,
  },
  "03-cors-middleware": {
    types: `export type Req = { headers: Record<string, string | undefined> };
export type Res = { headers: Record<string, string> };
export type Next = () => void;
export type Middleware = (req: Req, res: Res, next: Next) => void;`,
    sig: `export function createCorsMiddleware(allowedOrigins: string[]): Middleware`,
    stub: `return (_req, _res, next) => next();`,
    problem: "Set Access-Control-Allow-Origin when origin is whitelisted.",
    hint: "Check req.headers.origin",
    tests: `import { describe, it, expect } from "vitest";
import { createCorsMiddleware } from "./exercise";

describe("nodejs/02-middleware/03-cors-middleware", () => {
  it("sets allowed origin", () => {
    const res = { headers: {} as Record<string, string> };
    createCorsMiddleware(["https://app.com"])({ headers: { origin: "https://app.com" } }, res, () => {});
    expect(res.headers["Access-Control-Allow-Origin"]).toBe("https://app.com");
  });
});`,
  },
  "04-request-id": {
    types: `export type Req = { headers: Record<string, string | undefined>; id?: string };
export type Res = { headers: Record<string, string> };
export type Next = () => void;`,
    sig: `export function requestIdMiddleware(idGenerator: () => string): (req: Req, res: Res, next: Next) => void`,
    stub: `return (_req, _res, next) => next();`,
    problem: "Reuse X-Request-Id or generate new id on req and res.",
    hint: "headers['x-request-id'] || generator()",
    tests: `import { describe, it, expect } from "vitest";
import { requestIdMiddleware } from "./exercise";

describe("nodejs/02-middleware/04-request-id", () => {
  it("generates id", () => {
    const req = { headers: {} };
    const res = { headers: {} as Record<string, string> };
    requestIdMiddleware(() => "id-1")(req, res, () => {});
    expect(req.id).toBe("id-1");
  });
});`,
  },
  "01-parse-json-body": {
    types: `export class BodyTooLargeError extends Error { constructor() { super("Body too large"); this.name = "BodyTooLargeError"; } }
export class InvalidJsonError extends Error { constructor() { super("Invalid JSON"); this.name = "InvalidJsonError"; } }`,
    sig: `export function parseJsonBody(raw: string, maxBytes: number): unknown`,
    stub: `return {};`,
    problem: "Throw BodyTooLargeError or InvalidJsonError when appropriate.",
    hint: "Length check then JSON.parse",
    tests: `import { describe, it, expect } from "vitest";
import { parseJsonBody, BodyTooLargeError, InvalidJsonError } from "./exercise";

describe("nodejs/03-validation/01-parse-json-body", () => {
  it("parses JSON", () => {
    expect(parseJsonBody('{"a":1}', 100)).toEqual({ a: 1 });
  });
  it("throws on large body", () => {
    expect(() => parseJsonBody("x".repeat(11), 10)).toThrow(BodyTooLargeError);
  });
  it("throws on invalid JSON", () => {
    expect(() => parseJsonBody("{", 100)).toThrow(InvalidJsonError);
  });
});`,
  },
  "02-validate-fields": {
    types: `export type FieldRules = Record<string, "string" | "number" | "boolean">;
export type ValidationResult = { valid: true } | { valid: false; errors: string[] };`,
    sig: `export function validateFields(data: Record<string, unknown>, rules: FieldRules): ValidationResult`,
    stub: `return { valid: false, errors: [] };`,
    problem: "Validate presence and typeof for each rule key.",
    hint: "Push error messages into array",
    tests: `import { describe, it, expect } from "vitest";
import { validateFields } from "./exercise";

describe("nodejs/03-validation/02-validate-fields", () => {
  it("valid data", () => {
    expect(validateFields({ email: "a@b.com" }, { email: "string" })).toEqual({ valid: true });
  });
  it("missing field", () => {
    const r = validateFields({}, { email: "string" });
    expect(r.valid).toBe(false);
  });
});`,
  },
  "03-sanitize-user": {
    types: `export type UserInput = { email: string; name: string };`,
    sig: `export function sanitizeUserInput(input: UserInput): UserInput`,
    stub: `return input;`,
    problem: "Trim, lowercase email, cap name at 100 chars.",
    hint: "Return new object",
    tests: `import { describe, it, expect } from "vitest";
import { sanitizeUserInput } from "./exercise";

describe("nodejs/03-validation/03-sanitize-user", () => {
  it("normalizes email", () => {
    expect(sanitizeUserInput({ email: "  A@B.COM ", name: "Ada" }).email).toBe("a@b.com");
  });
});`,
  },
  "04-strip-html": {
    types: "",
    sig: `export function stripHtmlTags(html: string): string`,
    stub: `return html;`,
    problem: "Remove <tag> segments from string.",
    hint: "regex /<[^>]+>/g",
    tests: `import { describe, it, expect } from "vitest";
import { stripHtmlTags } from "./exercise";

describe("nodejs/03-validation/04-strip-html", () => {
  it("strips tags", () => {
    expect(stripHtmlTags("<p>Hi</p>")).toBe("Hi");
  });
});`,
  },
  "01-hash-password": {
    types: `export type PasswordHash = { salt: string; hash: string };
export function simpleHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i);
  return (h >>> 0).toString(16);
}`,
    sig: `export function hashPassword(password: string, randomBytes: (n: number) => string): PasswordHash`,
    stub: `return { salt: "", hash: "" };`,
    problem: "hash = simpleHash(salt + password). simpleHash is provided.",
    hint: "Use simpleHash helper",
    tests: `import { describe, it, expect } from "vitest";
import { hashPassword } from "./exercise";

describe("nodejs/04-auth-security/01-hash-password", () => {
  it("returns salt and hash", () => {
    const r = hashPassword("secret", () => "salt");
    expect(r.salt).toBe("salt");
    expect(r.hash.length).toBeGreaterThan(0);
  });
});`,
  },
  "02-verify-password": {
    types: `export type PasswordHash = { salt: string; hash: string };
export function simpleHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i);
  return (h >>> 0).toString(16);
}`,
    sig: `export function verifyPassword(password: string, stored: PasswordHash): boolean`,
    stub: `return false;`,
    problem: "Recompute simpleHash(salt + password) and compare.",
    hint: "Use same simpleHash as hash exercise",
    tests: `import { describe, it, expect } from "vitest";
import { verifyPassword, simpleHash } from "./exercise";

describe("nodejs/04-auth-security/02-verify-password", () => {
  it("verifies correct password", () => {
    const stored = { salt: "s", hash: simpleHash("s" + "pass") };
    expect(verifyPassword("pass", stored)).toBe(true);
  });
  it("rejects wrong password", () => {
    const stored = { salt: "s", hash: simpleHash("spass") };
    expect(verifyPassword("wrong", stored)).toBe(false);
  });
});`,
  },
  "03-sign-jwt": {
    types: `export type JwtPayload = Record<string, string | number>;`,
    sig: `export function signJwt(payload: JwtPayload, secret: string): string`,
    stub: `return "";`,
    problem: "Return header.payload.signature (base64url). Signature = simpleHmac(header.payload, secret) — use provided hmac fn.",
    hint: "base64url(JSON), join with dots",
    extra: `export function base64url(data: string): string {
  return Buffer.from(data).toString("base64url");
}`,
    tests: `import { describe, it, expect } from "vitest";
import { signJwt } from "./exercise";

describe("nodejs/04-auth-security/03-sign-jwt", () => {
  it("returns three segments", () => {
    const token = signJwt({ sub: "1" }, "secret");
    expect(token.split(".")).toHaveLength(3);
  });
});`,
  },
  "04-verify-jwt": {
    types: `export type JwtPayload = Record<string, string | number>;`,
    sig: `export function verifyJwt(token: string, secret: string): JwtPayload`,
    stub: `throw new Error("not implemented");`,
    problem: "Verify signature and return parsed payload. Throw on invalid token.",
    hint: "Split token, recompute signature",
    extra: `export function base64url(data: string): string {
  return Buffer.from(data).toString("base64url");
}
export function simpleHmac(data: string, secret: string): string {
  return base64url(data + secret);
}`,
    tests: `import { describe, it, expect } from "vitest";
import { signJwt, verifyJwt } from "./exercise";

describe("nodejs/04-auth-security/04-verify-jwt", () => {
  it("round-trips with signJwt", () => {
    const token = signJwt({ sub: "42" }, "key");
    expect(verifyJwt(token, "key")).toEqual({ sub: "42" });
  });
});`,
    crossImport: ["03-sign-jwt"],
  },
  "01-in-memory-repo": {
    types: `export type Entity = { id: number; [key: string]: unknown };`,
    sig: `export class InMemoryRepository<T extends Entity> {
  constructor() {}
  create(data: Omit<T, "id">): T { throw new Error("TODO"); }
  findById(id: number): T | undefined { return undefined; }
  findAll(): T[] { return []; }
  update(id: number, data: Partial<Omit<T, "id">>): T | undefined { return undefined; }
  delete(id: number): boolean { return false; }
}`,
    stub: "",
    isClass: true,
    problem: "Auto-increment id starting at 1.",
    hint: "Private counter and Map or array",
    tests: `import { describe, it, expect } from "vitest";
import { InMemoryRepository } from "./exercise";

type User = { id: number; name: string };

describe("nodejs/05-data-layer/01-in-memory-repo", () => {
  it("creates and finds", () => {
    const repo = new InMemoryRepository<User>();
    const u = repo.create({ name: "Ada" });
    expect(u.id).toBe(1);
    expect(repo.findById(1)?.name).toBe("Ada");
  });
  it("deletes", () => {
    const repo = new InMemoryRepository<User>();
    repo.create({ name: "Bob" });
    expect(repo.delete(1)).toBe(true);
    expect(repo.findById(1)).toBeUndefined();
  });
});`,
  },
  "02-offset-pagination": {
    types: `export type PageResult<T> = { items: T[]; page: number; pageSize: number; total: number; totalPages: number };`,
    sig: `export function paginateOffset<T>(items: T[], page: number, pageSize: number): PageResult<T>`,
    stub: `return { items: [], page, pageSize, total: 0, totalPages: 0 };`,
    problem: "page is 1-based. totalPages = ceil(total/pageSize).",
    hint: "slice (page-1)*pageSize",
    tests: `import { describe, it, expect } from "vitest";
import { paginateOffset } from "./exercise";

describe("nodejs/05-data-layer/02-offset-pagination", () => {
  it("paginates", () => {
    const r = paginateOffset([1, 2, 3, 4, 5], 2, 2);
    expect(r.items).toEqual([3, 4]);
    expect(r.totalPages).toBe(3);
  });
});`,
  },
  "03-cursor-pagination": {
    types: `export type CursorPayload = { offset: number };`,
    sig: `export function encodeCursor(payload: CursorPayload): string
export function decodeCursor(cursor: string): CursorPayload`,
    stub: `return ""; / return { offset: 0 };`,
    problem: "Base64url JSON encode/decode. Throw on invalid cursor.",
    hint: "Buffer.from JSON",
    tests: `import { describe, it, expect } from "vitest";
import { encodeCursor, decodeCursor } from "./exercise";

describe("nodejs/05-data-layer/03-cursor-pagination", () => {
  it("round-trips cursor", () => {
    const c = encodeCursor({ offset: 10 });
    expect(decodeCursor(c)).toEqual({ offset: 10 });
  });
});`,
  },
  "04-find-or-throw": {
    types: `export class NotFoundError extends Error {
  constructor(message: string) { super(message); this.name = "NotFoundError"; }
}`,
    sig: `export function findOrThrow<T>(items: T[], predicate: (item: T) => boolean, message?: string): T`,
    stub: `throw new NotFoundError("not found");`,
    problem: "Return first match or throw NotFoundError.",
    hint: "Array.find",
    tests: `import { describe, it, expect } from "vitest";
import { findOrThrow, NotFoundError } from "./exercise";

describe("nodejs/05-data-layer/04-find-or-throw", () => {
  it("returns item", () => {
    expect(findOrThrow([{ id: 1 }], (x) => x.id === 1)).toEqual({ id: 1 });
  });
  it("throws when missing", () => {
    expect(() => findOrThrow([], () => true)).toThrow(NotFoundError);
  });
});`,
  },
  "01-token-bucket": {
    types: "",
    sig: `export class TokenBucket {
  constructor(capacity: number, refillPerMs: number) {}
  tryConsume(): boolean { return false; }
}`,
    isClass: true,
    problem: "Refill tokens over time. tryConsume returns false when empty.",
    hint: "Track last refill timestamp",
    tests: `import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TokenBucket } from "./exercise";

describe("nodejs/06-rate-limit-cache/01-token-bucket", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  it("allows up to capacity", () => {
    const b = new TokenBucket(2, 1);
    expect(b.tryConsume()).toBe(true);
    expect(b.tryConsume()).toBe(true);
    expect(b.tryConsume()).toBe(false);
  });
});`,
  },
  "02-response-cache": {
    types: "",
    sig: `export class ResponseCache<V> {
  constructor() {}
  get(key: string): V | undefined { return undefined; }
  set(key: string, value: V, ttlMs: number): void {}
}`,
    isClass: true,
    problem: "TTL per entry. Expired keys return undefined.",
    hint: "Store expiresAt with value",
    tests: `import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ResponseCache } from "./exercise";

describe("nodejs/06-rate-limit-cache/02-response-cache", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  it("caches and expires", () => {
    const c = new ResponseCache<string>();
    c.set("k", "v", 1000);
    expect(c.get("k")).toBe("v");
    vi.advanceTimersByTime(1001);
    expect(c.get("k")).toBeUndefined();
  });
});`,
  },
  "03-request-dedup": {
    types: "",
    sig: `export function dedupeRequests<T>(key: string, fn: () => Promise<T>): Promise<T>`,
    stub: `return fn();`,
    problem: "Same key in flight shares one promise.",
    hint: "Map key -> promise, delete on settle",
    tests: `import { describe, it, expect, vi } from "vitest";
import { dedupeRequests } from "./exercise";

describe("nodejs/06-rate-limit-cache/03-request-dedup", () => {
  it("dedupes concurrent calls", async () => {
    const fn = vi.fn().mockResolvedValue(42);
    const p1 = dedupeRequests("k", fn);
    const p2 = dedupeRequests("k", fn);
    expect(await p1).toBe(42);
    expect(await p2).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});`,
  },
  "04-sliding-window": {
    types: "",
    sig: `export class SlidingWindowLimiter {
  constructor(maxRequests: number, windowMs: number) {}
  tryAcquire(now?: number): boolean { return false; }
}`,
    isClass: true,
    problem: "Max N requests per rolling windowMs.",
    hint: "Queue of timestamps",
    tests: `import { describe, it, expect } from "vitest";
import { SlidingWindowLimiter } from "./exercise";

describe("nodejs/06-rate-limit-cache/04-sliding-window", () => {
  it("limits requests", () => {
    const l = new SlidingWindowLimiter(2, 1000);
    expect(l.tryAcquire(0)).toBe(true);
    expect(l.tryAcquire(100)).toBe(true);
    expect(l.tryAcquire(200)).toBe(false);
    expect(l.tryAcquire(1001)).toBe(true);
  });
});`,
  },
  "01-app-error": {
    types: "",
    sig: `export class AppError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}
export function isAppError(err: unknown): err is AppError`,
    stub: `return err instanceof AppError;`,
    problem: "Typed error with statusCode. isAppError type guard.",
    hint: "instanceof",
    tests: `import { describe, it, expect } from "vitest";
import { AppError, isAppError } from "./exercise";

describe("nodejs/07-error-handling/01-app-error", () => {
  it("creates error", () => {
    const e = new AppError("bad", 400);
    expect(e.statusCode).toBe(400);
    expect(isAppError(e)).toBe(true);
  });
});`,
  },
  "02-error-to-json": {
    types: `import type { AppError } from "./types";`,
    sig: `export function errorToJson(err: unknown): { status: number; body: { error: string } }`,
    stub: `return { status: 500, body: { error: "Internal error" } };`,
    problem: "AppError -> its status. Other -> 500.",
    hint: "isAppError check",
    tests: `import { describe, it, expect } from "vitest";
import { AppError } from "./exercise";
import { errorToJson } from "./exercise";

describe("nodejs/07-error-handling/02-error-to-json", () => {
  it("maps AppError", () => {
    expect(errorToJson(new AppError("nope", 404))).toEqual({
      status: 404,
      body: { error: "nope" },
    });
  });
});`,
    combined: true,
  },
  "03-http-errors": {
    types: "",
    sig: `export function badRequest(message: string): Error
export function notFound(message?: string): Error`,
    stub: `return new Error(message);`,
    problem: "Return errors with status property 400 and 404.",
    hint: "Attach status on Error object",
    tests: `import { describe, it, expect } from "vitest";
import { badRequest, notFound } from "./exercise";

describe("nodejs/07-error-handling/03-http-errors", () => {
  it("bad request", () => {
    const e = badRequest("invalid") as Error & { status: number };
    expect(e.status).toBe(400);
  });
  it("not found", () => {
    const e = notFound() as Error & { status: number };
    expect(e.status).toBe(404);
  });
});`,
  },
  "04-error-middleware": {
    types: `export type Req = Record<string, unknown>;
export type Res = { status: (code: number) => Res; json: (body: unknown) => void; statusCode?: number; body?: unknown };
export type Next = (err?: unknown) => void;`,
    sig: `export function errorMiddleware(err: unknown, _req: Req, res: Res, _next: Next): void`,
    stub: `res.status(500).json({ error: "Internal error" });`,
    problem: "Map err.status or AppError to JSON response.",
    hint: "Check status property",
    tests: `import { describe, it, expect, vi } from "vitest";
import { errorMiddleware } from "./exercise";

describe("nodejs/07-error-handling/04-error-middleware", () => {
  it("handles status errors", () => {
    const res = {
      statusCode: 0,
      body: undefined as unknown,
      status(code: number) { this.statusCode = code; return this; },
      json(b: unknown) { this.body = b; },
    };
    const err = Object.assign(new Error("missing"), { status: 404 });
    errorMiddleware(err, {}, res, () => {});
    expect(res.statusCode).toBe(404);
  });
});`,
  },
  "01-graceful-shutdown": {
    types: `export type CleanupFn = () => void | Promise<void>;`,
    sig: `export function createShutdownHandler(cleanups: CleanupFn[]): () => Promise<void>`,
    stub: `return async () => {};`,
    problem: "Return async fn that runs all cleanups in order.",
    hint: "for...of await cleanup()",
    tests: `import { describe, it, expect, vi } from "vitest";
import { createShutdownHandler } from "./exercise";

describe("nodejs/08-production-patterns/01-graceful-shutdown", () => {
  it("runs cleanups", async () => {
    const order: number[] = [];
    const shutdown = createShutdownHandler([
      () => { order.push(1); },
      async () => { order.push(2); },
    ]);
    await shutdown();
    expect(order).toEqual([1, 2]);
  });
});`,
  },
  "02-process-batch": {
    types: "",
    sig: `export async function processBatch<T, R>(items: T[], batchSize: number, fn: (item: T) => Promise<R>): Promise<R[]>`,
    stub: `return [];`,
    problem: "Process items in batches sequentially (batch fully done before next).",
    hint: "Chunk array, Promise.all per batch",
    tests: `import { describe, it, expect } from "vitest";
import { processBatch } from "./exercise";

describe("nodejs/08-production-patterns/02-process-batch", () => {
  it("processes in batches", async () => {
    const r = await processBatch([1, 2, 3, 4], 2, async (n) => n * 2);
    expect(r).toEqual([2, 4, 6, 8]);
  });
});`,
  },
  "03-health-check": {
    types: `export type HealthStatus = "up" | "down";
export type DependencyCheck = { name: string; status: HealthStatus };
export type HealthReport = { status: HealthStatus; checks: DependencyCheck[] };`,
    sig: `export async function buildHealthReport(checks: Array<() => Promise<DependencyCheck>>): Promise<HealthReport>`,
    stub: `return { status: "down", checks: [] };`,
    problem: "Overall status down if any check is down.",
    hint: "Promise.all checks",
    tests: `import { describe, it, expect } from "vitest";
import { buildHealthReport } from "./exercise";

describe("nodejs/08-production-patterns/03-health-check", () => {
  it("aggregates checks", async () => {
    const r = await buildHealthReport([
      async () => ({ name: "db", status: "up" }),
      async () => ({ name: "cache", status: "up" }),
    ]);
    expect(r.status).toBe("up");
    expect(r.checks).toHaveLength(2);
  });
  it("marks down when one fails", async () => {
    const r = await buildHealthReport([
      async () => ({ name: "db", status: "up" }),
      async () => ({ name: "api", status: "down" }),
    ]);
    expect(r.status).toBe("down");
  });
});`,
  },
  "04-retry-backoff": {
    types: `export type BackoffOptions = { retries: number; baseDelayMs: number };`,
    sig: `export async function retryWithBackoff<T>(fn: () => Promise<T>, options: BackoffOptions): Promise<T>`,
    stub: `throw new Error("TODO");`,
    problem: "Delay baseDelayMs * 2^attempt between retries.",
    hint: "Loop with exponential delay",
    tests: `import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { retryWithBackoff } from "./exercise";

describe("nodejs/08-production-patterns/04-retry-backoff", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
  it("retries with backoff", async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error("x")).mockResolvedValue("ok");
    const p = retryWithBackoff(fn, { retries: 2, baseDelayMs: 100 });
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});`,
  },
};

function writeExercise([section, slug, num, global, title, summary, pattern, fn]) {
  const detail = EXERCISE_DETAILS[slug];
  if (!detail) throw new Error(`Missing detail for ${slug}`);

  const dir = path.join(ROOT, "src/exercises/nodejs-backend", section, slug);
  fs.mkdirSync(dir, { recursive: true });

  const testCmd = `npm run node:${String(global).padStart(2, "0")}`;
  const describePath = `nodejs/${section}/${slug}`;

  let exerciseBody;
  if (detail.isClass) {
    exerciseBody = `/**
 * EXERCISE nodejs — ${title}
 *
 * ${detail.problem}
 *
 * Hint: ${detail.hint}
 * Run: ${testCmd}
 */

${detail.types ? detail.types + "\n" : ""}${detail.sig} {
  // TODO: your code here
}`;
  } else if (detail.combined && slug === "02-error-to-json") {
    exerciseBody = `/**
 * EXERCISE nodejs — ${title}
 *
 * ${detail.problem}
 *
 * Hint: ${detail.hint}
 * Run: ${testCmd}
 */

export class AppError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}

export function errorToJson(err: unknown): { status: number; body: { error: string } } {
  // TODO: your code here
  return { status: 500, body: { error: "Internal error" } };
}`;
  } else {
    const extra = detail.extra ? "\n" + detail.extra : "";
    const sigLines = detail.sig.split("\n");
    const exports = sigLines.map((line) => {
      if (line.includes("{")) return line;
      const name = line.match(/export (?:async )?function (\w+)/)?.[1]
        ?? line.match(/export class (\w+)/)?.[1];
      if (!name) return line;
      return `${line} {\n  // TODO: your code here\n  ${detail.stub}\n}`;
    }).join("\n");

    exerciseBody = `/**
 * EXERCISE nodejs — ${title}
 *
 * ${detail.problem}
 *
 * Hint: ${detail.hint}
 * Run: ${testCmd}
 */

${detail.types ? detail.types + extra + "\n" : extra ? extra + "\n" : ""}${exports}`;
  }

  // Fix verify-jwt to import signJwt from sibling - handle in tests only by duplicating sign in test
  // For 04-verify-jwt, tests import signJwt from same file - user must implement both or copy signJwt
  if (slug === "04-verify-jwt") {
    exerciseBody = `/**
 * EXERCISE nodejs — ${title}
 *
 * ${detail.problem}
 *
 * Hint: ${detail.hint}
 * Run: ${testCmd}
 */

export type JwtPayload = Record<string, string | number>;

export function base64url(data: string): string {
  return Buffer.from(data).toString("base64url");
}

export function simpleHmac(data: string, secret: string): string {
  return base64url(data + secret);
}

export function signJwt(payload: JwtPayload, secret: string): string {
  // TODO: implement (same as exercise 03) or import after solving 03
  return "";
}

export function verifyJwt(token: string, secret: string): JwtPayload {
  // TODO: your code here
  throw new Error("not implemented");
}`;
  }

  if (slug === "03-sign-jwt") {
    exerciseBody = `/**
 * EXERCISE nodejs — ${title}
 *
 * ${detail.problem}
 *
 * Hint: ${detail.hint}
 * Run: ${testCmd}
 */

export type JwtPayload = Record<string, string | number>;

export function base64url(data: string): string {
  return Buffer.from(data).toString("base64url");
}

export function simpleHmac(data: string, secret: string): string {
  return base64url(data + secret);
}

export function signJwt(payload: JwtPayload, secret: string): string {
  // TODO: your code here
  return "";
}`;
  }

  fs.writeFileSync(path.join(dir, "exercise.ts"), exerciseBody);

  let tests = detail.tests.replace(/describe\("[^"]+"/, `describe("${describePath}"`);
  fs.writeFileSync(path.join(dir, "exercise.test.ts"), tests);

  const lessonDir = path.join(ROOT, "lessons/nodejs-backend", section);
  fs.mkdirSync(lessonDir, { recursive: true });
  const lesson = `# Node.js ${String(global).padStart(2, "0")} — ${title}

> **Pattern:** ${pattern}  
> **Function:** \`${fn}\`  
> **Exercise:** \`src/exercises/nodejs-backend/${section}/${slug}/\`

## Problem

${detail.problem}

## Hint

${detail.hint}

## Run locally

\`\`\`bash
${testCmd}
\`\`\`
`;
  fs.writeFileSync(path.join(lessonDir, `${slug}.md`), lesson);

  return { section, slug, num, global, title, summary, pattern, fn, testCmd };
}

const meta = EXERCISES.map(writeExercise);
fs.writeFileSync(
  path.join(ROOT, "scripts/nodejs-exercises-meta.json"),
  JSON.stringify(meta, null, 2)
);
console.log(`Generated ${meta.length} exercises`);
