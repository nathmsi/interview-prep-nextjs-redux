import { exercisePath, lessonPath } from "./content-paths";

export type NodeExercise = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  pattern: string;
  functionName: string;
  exercisePath: string;
  testCommand: string;
  lessonPath: string;
};

export type NodeSubsection = {
  slug: string;
  title: string;
  description: string;
  exercises: NodeExercise[];
};

export type NodeSection = {
  slug: string;
  number: number;
  title: string;
  description: string;
  available: boolean;
  folder: string;
  subsections: NodeSubsection[];
};

function exerciseMeta(
  categoryFolder: string,
  slug: string,
  number: number,
  title: string,
  summary: string,
  pattern: string,
  functionName: string,
  testCommand: string
): NodeExercise {
  return {
    slug,
    number,
    title,
    summary,
    pattern,
    functionName,
    exercisePath: exercisePath("nodejs-backend", categoryFolder, slug),
    testCommand,
    lessonPath: lessonPath("nodejs-backend", categoryFolder, `${slug}.md`),
  };
}

const httpExercises: NodeExercise[] = [
  exerciseMeta("01-http-fundamentals", "01-parse-url", 1, "Parse URL", "Extract pathname and query params from a request path.", "URL parsing", "parseUrl", "npm run node:01"),
  exerciseMeta("01-http-fundamentals", "02-match-route", 2, "Match Route", "Match path patterns with :param segments.", "Routing", "matchRoute", "npm run node:02"),
  exerciseMeta("01-http-fundamentals", "03-build-response", 3, "Build HTTP Response", "Build status, headers, and JSON body.", "HTTP response", "buildResponse", "npm run node:03"),
  exerciseMeta("01-http-fundamentals", "04-parse-headers", 4, "Parse Headers", "Parse raw header block into lowercase map.", "HTTP parsing", "parseHeaders", "npm run node:04"),
];

const middlewareExercises: NodeExercise[] = [
  exerciseMeta("02-middleware", "01-compose-middleware", 1, "Compose Middleware", "Chain Express-style middleware functions.", "Middleware chain", "composeMiddleware", "npm run node:05"),
  exerciseMeta("02-middleware", "02-async-handler", 2, "Async Handler", "Wrap async handlers; forward rejections to next(err).", "Error forwarding", "asyncHandler", "npm run node:06"),
  exerciseMeta("02-middleware", "03-cors-middleware", 3, "CORS Middleware", "Set CORS headers for allowed origins.", "CORS", "createCorsMiddleware", "npm run node:07"),
  exerciseMeta("02-middleware", "04-request-id", 4, "Request ID Middleware", "Attach unique X-Request-Id to req and res.", "Observability", "requestIdMiddleware", "npm run node:08"),
];

const validationExercises: NodeExercise[] = [
  exerciseMeta("03-validation", "01-parse-json-body", 1, "Parse JSON Body", "Parse JSON with max size and typed errors.", "Body parsing", "parseJsonBody", "npm run node:09"),
  exerciseMeta("03-validation", "02-validate-fields", 2, "Validate Fields", "Validate required fields and basic types.", "Schema validation", "validateFields", "npm run node:10"),
  exerciseMeta("03-validation", "03-sanitize-user", 3, "Sanitize User Input", "Trim, lowercase email, cap name length.", "Sanitization", "sanitizeUserInput", "npm run node:11"),
  exerciseMeta("03-validation", "04-strip-html", 4, "Strip HTML Tags", "Remove HTML tags from user content.", "Sanitization", "stripHtmlTags", "npm run node:12"),
];

const authExercises: NodeExercise[] = [
  exerciseMeta("04-auth-security", "01-hash-password", 1, "Hash Password", "Hash password with salt (no external libs).", "Password hashing", "hashPassword", "npm run node:13"),
  exerciseMeta("04-auth-security", "02-verify-password", 2, "Verify Password", "Compare plaintext against stored hash.", "Password verify", "verifyPassword", "npm run node:14"),
  exerciseMeta("04-auth-security", "03-sign-jwt", 3, "Sign JWT", "Create a minimal HMAC-signed JWT string.", "JWT", "signJwt", "npm run node:15"),
  exerciseMeta("04-auth-security", "04-verify-jwt", 4, "Verify JWT", "Verify signature and decode JWT payload.", "JWT", "verifyJwt", "npm run node:16"),
];

const dataExercises: NodeExercise[] = [
  exerciseMeta("05-data-layer", "01-in-memory-repo", 1, "In-Memory Repository", "Generic CRUD store with numeric ids.", "Repository", "InMemoryRepository", "npm run node:17"),
  exerciseMeta("05-data-layer", "02-offset-pagination", 2, "Offset Pagination", "Slice a list with page and pageSize.", "Pagination", "paginateOffset", "npm run node:18"),
  exerciseMeta("05-data-layer", "03-cursor-pagination", 3, "Cursor Pagination", "Encode/decode cursor for stable paging.", "Pagination", "encodeCursor / decodeCursor", "npm run node:19"),
  exerciseMeta("05-data-layer", "04-find-or-throw", 4, "Find Or Throw", "Return entity or throw NotFoundError.", "Repository", "findOrThrow", "npm run node:20"),
];

const rateLimitExercises: NodeExercise[] = [
  exerciseMeta("06-rate-limit-cache", "01-token-bucket", 1, "Token Bucket Limiter", "Allow N requests per refill interval.", "Rate limiting", "TokenBucket", "npm run node:21"),
  exerciseMeta("06-rate-limit-cache", "02-response-cache", 2, "Response Cache", "In-memory GET cache with TTL per key.", "Caching", "ResponseCache", "npm run node:22"),
  exerciseMeta("06-rate-limit-cache", "03-request-dedup", 3, "Request Dedup", "Coalesce concurrent identical async calls.", "Concurrency", "dedupeRequests", "npm run node:23"),
  exerciseMeta("06-rate-limit-cache", "04-sliding-window", 4, "Sliding Window Limiter", "Max N requests per rolling time window.", "Rate limiting", "SlidingWindowLimiter", "npm run node:24"),
];

const errorExercises: NodeExercise[] = [
  exerciseMeta("07-error-handling", "01-app-error", 1, "App Error", "Custom error with HTTP status code.", "Errors", "AppError", "npm run node:25"),
  exerciseMeta("07-error-handling", "02-error-to-json", 2, "Error To JSON", "Map errors to API JSON shape.", "Errors", "errorToJson", "npm run node:26"),
  exerciseMeta("07-error-handling", "03-http-errors", 3, "HTTP Error Helpers", "Factory helpers for 400/404/500.", "Errors", "badRequest / notFound", "npm run node:27"),
  exerciseMeta("07-error-handling", "04-error-middleware", 4, "Error Middleware", "Central error handler middleware.", "Errors", "errorMiddleware", "npm run node:28"),
];

const productionExercises: NodeExercise[] = [
  exerciseMeta("08-production-patterns", "01-graceful-shutdown", 1, "Graceful Shutdown", "Register cleanup handlers on shutdown signal.", "Lifecycle", "createShutdownHandler", "npm run node:29"),
  exerciseMeta("08-production-patterns", "02-process-batch", 2, "Process Batch", "Process items in fixed-size async batches.", "Batching", "processBatch", "npm run node:30"),
  exerciseMeta("08-production-patterns", "03-health-check", 3, "Health Check", "Aggregate dependency health statuses.", "Observability", "buildHealthReport", "npm run node:31"),
  exerciseMeta("08-production-patterns", "04-retry-backoff", 4, "Retry With Backoff", "Retry async fn with exponential backoff.", "Resilience", "retryWithBackoff", "npm run node:32"),
];

export const nodeSections: NodeSection[] = [
  {
    slug: "01-http-fundamentals",
    number: 1,
    title: "HTTP fundamentals",
    description: "Parse URLs, match routes, build responses — the building blocks of any Node.js API.",
    available: true,
    folder: "01-http-fundamentals",
    subsections: [
      {
        slug: "http-fundamentals",
        title: "Request & response",
        description: "Routing, headers, and response shaping without a framework.",
        exercises: httpExercises,
      },
    ],
  },
  {
    slug: "02-middleware",
    number: 2,
    title: "Middleware",
    description: "Compose middleware, async handlers, CORS, and request tracing — Express-style patterns.",
    available: true,
    folder: "02-middleware",
    subsections: [
      {
        slug: "middleware",
        title: "Middleware patterns",
        description: "Chain handlers, forward errors, and add cross-cutting concerns.",
        exercises: middlewareExercises,
      },
    ],
  },
  {
    slug: "03-validation",
    number: 3,
    title: "Validation & sanitization",
    description: "Parse JSON bodies safely, validate fields, and sanitize user input.",
    available: true,
    folder: "03-validation",
    subsections: [
      {
        slug: "validation",
        title: "Input handling",
        description: "Size limits, schema checks, and content cleanup.",
        exercises: validationExercises,
      },
    ],
  },
  {
    slug: "04-auth-security",
    number: 4,
    title: "Auth & security",
    description: "Password hashing, JWT sign/verify — common backend interview topics.",
    available: true,
    folder: "04-auth-security",
    subsections: [
      {
        slug: "auth-security",
        title: "Authentication",
        description: "Hashing, verification, and token-based auth primitives.",
        exercises: authExercises,
      },
    ],
  },
  {
    slug: "05-data-layer",
    number: 5,
    title: "Data layer",
    description: "In-memory repositories, pagination, and find-or-throw patterns.",
    available: true,
    folder: "05-data-layer",
    subsections: [
      {
        slug: "data-layer",
        title: "Persistence patterns",
        description: "CRUD abstractions and pagination strategies.",
        exercises: dataExercises,
      },
    ],
  },
  {
    slug: "06-rate-limit-cache",
    number: 6,
    title: "Rate limiting & cache",
    description: "Token bucket, sliding window, response cache, and request deduplication.",
    available: true,
    folder: "06-rate-limit-cache",
    subsections: [
      {
        slug: "rate-limit-cache",
        title: "Performance & protection",
        description: "Limit abuse and avoid redundant work.",
        exercises: rateLimitExercises,
      },
    ],
  },
  {
    slug: "07-error-handling",
    number: 7,
    title: "Error handling",
    description: "Typed errors, JSON error responses, and central error middleware.",
    available: true,
    folder: "07-error-handling",
    subsections: [
      {
        slug: "error-handling",
        title: "API errors",
        description: "Consistent error shapes across your API.",
        exercises: errorExercises,
      },
    ],
  },
  {
    slug: "08-production-patterns",
    number: 8,
    title: "Production patterns",
    description: "Graceful shutdown, batch processing, health checks, and retry with backoff.",
    available: true,
    folder: "08-production-patterns",
    subsections: [
      {
        slug: "production-patterns",
        title: "Reliability",
        description: "Patterns you'll discuss in system design and live coding rounds.",
        exercises: productionExercises,
      },
    ],
  },
];

export function nodeHref(sectionSlug: string, exerciseSlug?: string): string {
  if (exerciseSlug) return `/nodejs/${sectionSlug}/${exerciseSlug}`;
  return `/nodejs/${sectionSlug}`;
}

export function getNodeSection(sectionSlug: string): NodeSection | undefined {
  return nodeSections.find((s) => s.slug === sectionSlug);
}

export function getNodeExercise(
  sectionSlug: string,
  exerciseSlug: string
): NodeExercise | undefined {
  const section = getNodeSection(sectionSlug);
  if (!section) return undefined;
  for (const subsection of section.subsections) {
    const exercise = subsection.exercises.find((e) => e.slug === exerciseSlug);
    if (exercise) return exercise;
  }
  return undefined;
}

export function getAllExercisesInNodeSection(sectionSlug: string): NodeExercise[] {
  const section = getNodeSection(sectionSlug);
  if (!section) return [];
  return section.subsections.flatMap((s) => s.exercises);
}

export function getAdjacentNodeExercises(
  sectionSlug: string,
  exerciseSlug: string
): { prev?: NodeExercise; next?: NodeExercise } {
  const exercises = getAllExercisesInNodeSection(sectionSlug);
  const index = exercises.findIndex((e) => e.slug === exerciseSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? exercises[index - 1] : undefined,
    next: index < exercises.length - 1 ? exercises[index + 1] : undefined,
  };
}

export function exerciseCountForNodeSection(section: NodeSection): number {
  return section.subsections.reduce((n, s) => n + s.exercises.length, 0);
}

export function totalAvailableNodeExercises(): number {
  return nodeSections
    .filter((s) => s.available)
    .reduce((n, s) => n + exerciseCountForNodeSection(s), 0);
}
