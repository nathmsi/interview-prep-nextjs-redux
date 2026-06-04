export type LessonLevel = "easy" | "medium" | "hard";

export type LessonMeta = {
  slug: string;
  level: LessonLevel;
  number: number;
  title: string;
  summary: string;
  exercisePath: string;
  lessonPath: string;
};

export const lessons: LessonMeta[] = [
  {
    slug: "01-server-vs-client",
    level: "easy",
    number: 1,
    title: "Server vs Client Components",
    summary: "When to use 'use client', server fetch, serializable props.",
    exercisePath: "src/exercises/easy/01-server-vs-client",
    lessonPath: "lessons/easy/01-server-vs-client.md",
  },
  {
    slug: "02-redux-provider",
    level: "easy",
    number: 2,
    title: "Redux + Provider (App Router)",
    summary: "Typed store, useAppDispatch / useAppSelector, client Provider in layout.",
    exercisePath: "src/exercises/easy/02-redux-provider",
    lessonPath: "lessons/easy/02-redux-provider.md",
  },
  {
    slug: "01-async-thunk",
    level: "medium",
    number: 1,
    title: "createAsyncThunk + API Route",
    summary: "Load products from /api/products with pending/fulfilled/rejected states.",
    exercisePath: "src/exercises/medium/01-async-thunk",
    lessonPath: "lessons/medium/01-async-thunk.md",
  },
  {
    slug: "02-cart-slice",
    level: "medium",
    number: 2,
    title: "Cart slice + POST /api/cart",
    summary: "Sync actions, extraReducers, sync cart with the server.",
    exercisePath: "src/exercises/medium/02-cart-slice",
    lessonPath: "lessons/medium/02-cart-slice.md",
  },
  {
    slug: "03-route-handlers",
    level: "medium",
    number: 3,
    title: "Route Handlers (REST)",
    summary: "Typed GET/POST, validation, HTTP status codes — classic Next.js interview pattern.",
    exercisePath: "src/exercises/medium/03-route-handlers",
    lessonPath: "lessons/medium/03-route-handlers.md",
  },
  {
    slug: "04-selectors-memo",
    level: "medium",
    number: 4,
    title: "Selectors & createSelector",
    summary: "Derive cart total and enriched lines without unnecessary re-renders.",
    exercisePath: "src/exercises/medium/04-selectors-memo",
    lessonPath: "lessons/medium/04-selectors-memo.md",
  },
  {
    slug: "01-rtk-query",
    level: "hard",
    number: 1,
    title: "RTK Query + baseUrl",
    summary: "Cache, tags, invalidation — modern alternative to manual thunks.",
    exercisePath: "src/exercises/hard/01-rtk-query",
    lessonPath: "lessons/hard/01-rtk-query.md",
  },
  {
    slug: "02-optimistic-cart",
    level: "hard",
    number: 2,
    title: "Optimistic updates",
    summary: "Instant UI + rollback when the API fails (senior pattern).",
    exercisePath: "src/exercises/hard/02-optimistic-cart",
    lessonPath: "lessons/hard/02-optimistic-cart.md",
  },
  {
    slug: "03-hydration-redux",
    level: "hard",
    number: 3,
    title: "Avoid SSR mismatches",
    summary: "Client-only store, no Redux in Server Components — classic pitfall.",
    exercisePath: "src/exercises/hard/03-hydration-redux",
    lessonPath: "lessons/hard/03-hydration-redux.md",
  },
];

export function getLessonsByLevel(level: LessonLevel): LessonMeta[] {
  return lessons.filter((l) => l.level === level);
}

export function getLesson(level: LessonLevel, slug: string): LessonMeta | undefined {
  return lessons.find((l) => l.level === level && l.slug === slug);
}
