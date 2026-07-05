import { exercisePath, lessonPath } from "./content-paths";

export type ExpressExercise = {
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

export type ExpressSubsection = {
  slug: string;
  title: string;
  description: string;
  exercises: ExpressExercise[];
};

export type ExpressSection = {
  slug: string;
  number: number;
  title: string;
  description: string;
  available: boolean;
  folder: string;
  subsections: ExpressSubsection[];
};

function exerciseMeta(
  categoryFolder: string,
  slug: string,
  number: number,
  title: string,
  summary: string,
  pattern: string,
  testCommand: string
): ExpressExercise {
  return {
    slug,
    number,
    title,
    summary,
    pattern,
    functionName: "createApp",
    exercisePath: exercisePath("nodejs-express", categoryFolder, slug),
    testCommand,
    lessonPath: lessonPath("nodejs-express", categoryFolder, `${slug}.md`),
  };
}

const basicsExercises: ExpressExercise[] = [
  exerciseMeta("01-basics", "01-hello-express", 1, "Hello Express", "Create an Express app with a health check route.", "Express app", "npm run server:01"),
  exerciseMeta("01-basics", "02-json-body", 2, "JSON Body Parser", "Parse JSON bodies with express.json() and echo them back.", "express.json()", "npm run server:02"),
  exerciseMeta("01-basics", "03-route-params", 3, "Route Params", "Read :id from URL params and return a user object.", "req.params", "npm run server:03"),
];

const routingExercises: ExpressExercise[] = [
  exerciseMeta("02-routing", "01-query-string", 1, "Query String Filters", "Filter items by category query param.", "req.query", "npm run server:04"),
  exerciseMeta("02-routing", "02-express-router", 2, "Express Router", "Mount a /api router with separate route module.", "express.Router", "npm run server:05"),
  exerciseMeta("02-routing", "03-not-found", 3, "404 Handler", "Return JSON 404 for unknown routes.", "404 middleware", "npm run server:06"),
];

const middlewareExercises: ExpressExercise[] = [
  exerciseMeta("03-middleware", "01-request-logger", 1, "Request Logger", "Custom middleware that logs method and path.", "app.use middleware", "npm run server:07"),
  exerciseMeta("03-middleware", "02-async-handler", 2, "Async Route Handler", "Wrap async handlers so errors reach error middleware.", "async + next(err)", "npm run server:08"),
  exerciseMeta("03-middleware", "03-error-middleware", 3, "Error Middleware", "Central error handler with status codes.", "4-arg middleware", "npm run server:09"),
];

const validationExercises: ExpressExercise[] = [
  exerciseMeta("04-validation", "01-zod-body", 1, "Zod Body Validation", "Validate POST body with Zod safeParse.", "Zod", "npm run server:10"),
];

const crudExercises: ExpressExercise[] = [
  exerciseMeta("05-crud", "01-todos-api", 1, "Todos CRUD API", "Full in-memory CRUD for todos.", "REST CRUD", "npm run server:11"),
];

const authExercises: ExpressExercise[] = [
  exerciseMeta("06-auth", "01-jwt-auth", 1, "JWT Auth Flow", "Register, login, and protected /me route with bcrypt + JWT.", "bcrypt + jsonwebtoken", "npm run server:12"),
];

export const expressSections: ExpressSection[] = [
  {
    slug: "01-basics",
    number: 1,
    title: "Express basics",
    description: "Health check, JSON body parser, and route params — your first real Express apps.",
    available: true,
    folder: "01-basics",
    subsections: [{ slug: "basics", title: "Core routes", description: "GET routes, express.json(), req.params.", exercises: basicsExercises }],
  },
  {
    slug: "02-routing",
    number: 2,
    title: "Routing",
    description: "Query strings, express.Router, and 404 handling.",
    available: true,
    folder: "02-routing",
    subsections: [{ slug: "routing", title: "URLs & routers", description: "req.query, modular routers, fallthrough.", exercises: routingExercises }],
  },
  {
    slug: "03-middleware",
    number: 3,
    title: "Middleware",
    description: "Logging, async error handling, and central error middleware.",
    available: true,
    folder: "03-middleware",
    subsections: [{ slug: "middleware", title: "Middleware chain", description: "Custom middleware, asyncHandler, error handler.", exercises: middlewareExercises }],
  },
  {
    slug: "04-validation",
    number: 4,
    title: "Validation",
    description: "Request body validation with Zod — standard in modern TypeScript APIs.",
    available: true,
    folder: "04-validation",
    subsections: [{ slug: "validation", title: "Zod", description: "safeParse, 400 responses, typed bodies.", exercises: validationExercises }],
  },
  {
    slug: "05-crud",
    number: 5,
    title: "CRUD API",
    description: "Build a complete REST todos API in memory — classic interview exercise.",
    available: true,
    folder: "05-crud",
    subsections: [{ slug: "crud", title: "REST", description: "GET, POST, DELETE with status codes.", exercises: crudExercises }],
  },
  {
    slug: "06-auth",
    number: 6,
    title: "Authentication",
    description: "Register, login, JWT bearer token, and protected routes with bcrypt.",
    available: true,
    folder: "06-auth",
    subsections: [{ slug: "auth", title: "JWT auth", description: "bcrypt hash, jwt.sign, requireAuth middleware.", exercises: authExercises }],
  },
];

export const expressGettingStartedLesson = lessonPath(
  "nodejs-express",
  "00-getting-started.md"
);

export function expressHref(sectionSlug: string, exerciseSlug?: string): string {
  if (exerciseSlug) return `/express/${sectionSlug}/${exerciseSlug}`;
  return `/express/${sectionSlug}`;
}

export function getExpressSection(sectionSlug: string): ExpressSection | undefined {
  return expressSections.find((s) => s.slug === sectionSlug);
}

export function getExpressExercise(
  sectionSlug: string,
  exerciseSlug: string
): ExpressExercise | undefined {
  const section = getExpressSection(sectionSlug);
  if (!section) return undefined;
  for (const subsection of section.subsections) {
    const exercise = subsection.exercises.find((e) => e.slug === exerciseSlug);
    if (exercise) return exercise;
  }
  return undefined;
}

export function getAllExercisesInExpressSection(sectionSlug: string): ExpressExercise[] {
  const section = getExpressSection(sectionSlug);
  if (!section) return [];
  return section.subsections.flatMap((s) => s.exercises);
}

export function getAdjacentExpressExercises(
  sectionSlug: string,
  exerciseSlug: string
): { prev?: ExpressExercise; next?: ExpressExercise } {
  const exercises = getAllExercisesInExpressSection(sectionSlug);
  const index = exercises.findIndex((e) => e.slug === exerciseSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? exercises[index - 1] : undefined,
    next: index < exercises.length - 1 ? exercises[index + 1] : undefined,
  };
}

export function exerciseCountForExpressSection(section: ExpressSection): number {
  return section.subsections.reduce((n, s) => n + s.exercises.length, 0);
}

export function totalAvailableExpressExercises(): number {
  return expressSections
    .filter((s) => s.available)
    .reduce((n, s) => n + exerciseCountForExpressSection(s), 0);
}
