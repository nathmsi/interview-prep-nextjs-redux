export type LessonLevel = "easy" | "medium" | "hard";
export type LessonTrack = LessonLevel | "react";

export type LessonKind = "exercise" | "course";

export type LessonMeta = {
  slug: string;
  track: LessonTrack;
  number: number;
  title: string;
  summary: string;
  lessonPath: string;
  kind: LessonKind;
  /** @deprecated use track — kept for URLs */
  level: LessonTrack;
  exercisePath?: string;
};

const exerciseLessons: LessonMeta[] = [
  {
    slug: "01-server-vs-client",
    track: "easy",
    level: "easy",
    number: 1,
    kind: "exercise",
    title: "Server vs Client Components",
    summary: "When to use 'use client', server fetch, serializable props.",
    exercisePath: "src/exercises/easy/01-server-vs-client",
    lessonPath: "lessons/easy/01-server-vs-client.md",
  },
  {
    slug: "02-redux-provider",
    track: "easy",
    level: "easy",
    number: 2,
    kind: "exercise",
    title: "Redux + Provider (App Router)",
    summary: "Typed store, useAppDispatch / useAppSelector, client Provider in layout.",
    exercisePath: "src/exercises/easy/02-redux-provider",
    lessonPath: "lessons/easy/02-redux-provider.md",
  },
  {
    slug: "01-async-thunk",
    track: "medium",
    level: "medium",
    number: 1,
    kind: "exercise",
    title: "createAsyncThunk + API Route",
    summary: "Load products from /api/products with pending/fulfilled/rejected states.",
    exercisePath: "src/exercises/medium/01-async-thunk",
    lessonPath: "lessons/medium/01-async-thunk.md",
  },
  {
    slug: "02-cart-slice",
    track: "medium",
    level: "medium",
    number: 2,
    kind: "exercise",
    title: "Cart slice + POST /api/cart",
    summary: "Sync actions, extraReducers, sync cart with the server.",
    exercisePath: "src/exercises/medium/02-cart-slice",
    lessonPath: "lessons/medium/02-cart-slice.md",
  },
  {
    slug: "03-route-handlers",
    track: "medium",
    level: "medium",
    number: 3,
    kind: "exercise",
    title: "Route Handlers (REST)",
    summary: "Typed GET/POST, validation, HTTP status codes — classic Next.js interview pattern.",
    exercisePath: "src/exercises/medium/03-route-handlers",
    lessonPath: "lessons/medium/03-route-handlers.md",
  },
  {
    slug: "04-selectors-memo",
    track: "medium",
    level: "medium",
    number: 4,
    kind: "exercise",
    title: "Selectors & createSelector",
    summary: "Derive cart total and enriched lines without unnecessary re-renders.",
    exercisePath: "src/exercises/medium/04-selectors-memo",
    lessonPath: "lessons/medium/04-selectors-memo.md",
  },
  {
    slug: "01-rtk-query",
    track: "hard",
    level: "hard",
    number: 1,
    kind: "exercise",
    title: "RTK Query + baseUrl",
    summary: "Cache, tags, invalidation — modern alternative to manual thunks.",
    exercisePath: "src/exercises/hard/01-rtk-query",
    lessonPath: "lessons/hard/01-rtk-query.md",
  },
  {
    slug: "02-optimistic-cart",
    track: "hard",
    level: "hard",
    number: 2,
    kind: "exercise",
    title: "Optimistic updates",
    summary: "Instant UI + rollback when the API fails (senior pattern).",
    exercisePath: "src/exercises/hard/02-optimistic-cart",
    lessonPath: "lessons/hard/02-optimistic-cart.md",
  },
  {
    slug: "03-hydration-redux",
    track: "hard",
    level: "hard",
    number: 3,
    kind: "exercise",
    title: "Avoid SSR mismatches",
    summary: "Client-only store, no Redux in Server Components — classic pitfall.",
    exercisePath: "src/exercises/hard/03-hydration-redux",
    lessonPath: "lessons/hard/03-hydration-redux.md",
  },
];

const reactHookLessons: LessonMeta[] = [
  {
    slug: "01-use-state",
    track: "react",
    level: "react",
    number: 1,
    kind: "course",
    title: "useState",
    summary: "Local state, updates, functional updaters, lazy init.",
    lessonPath: "lessons/react/01-use-state.md",
  },
  {
    slug: "02-use-effect",
    track: "react",
    level: "react",
    number: 2,
    kind: "course",
    title: "useEffect",
    summary: "Side effects, cleanup, dependency array pitfalls.",
    lessonPath: "lessons/react/02-use-effect.md",
  },
  {
    slug: "03-use-ref",
    track: "react",
    level: "react",
    number: 3,
    kind: "course",
    title: "useRef",
    summary: "DOM refs, mutable values without re-render.",
    lessonPath: "lessons/react/03-use-ref.md",
  },
  {
    slug: "04-use-context",
    track: "react",
    level: "react",
    number: 4,
    kind: "course",
    title: "useContext",
    summary: "Avoid prop drilling, provider pattern, when not to use context.",
    lessonPath: "lessons/react/04-use-context.md",
  },
  {
    slug: "05-use-reducer",
    track: "react",
    level: "react",
    number: 5,
    kind: "course",
    title: "useReducer",
    summary: "Complex state, actions, dispatch, vs useState.",
    lessonPath: "lessons/react/05-use-reducer.md",
  },
  {
    slug: "06-use-memo-callback",
    track: "react",
    level: "react",
    number: 6,
    kind: "course",
    title: "useMemo & useCallback",
    summary: "Referential stability, when memoization helps (and when it does not).",
    lessonPath: "lessons/react/06-use-memo-callback.md",
  },
  {
    slug: "07-use-id-layout-effect",
    track: "react",
    level: "react",
    number: 7,
    kind: "course",
    title: "useId & useLayoutEffect",
    summary: "SSR-safe IDs, measure DOM before paint.",
    lessonPath: "lessons/react/07-use-id-layout-effect.md",
  },
  {
    slug: "08-use-transition-deferred",
    track: "react",
    level: "react",
    number: 8,
    kind: "course",
    title: "useTransition & useDeferredValue",
    summary: "Non-blocking updates, keep UI responsive during heavy work.",
    lessonPath: "lessons/react/08-use-transition-deferred.md",
  },
  {
    slug: "09-use-sync-external-store",
    track: "react",
    level: "react",
    number: 9,
    kind: "course",
    title: "useSyncExternalStore",
    summary: "Subscribe to external stores (browser APIs, Redux-like).",
    lessonPath: "lessons/react/09-use-sync-external-store.md",
  },
  {
    slug: "10-use-action-state",
    track: "react",
    level: "react",
    number: 10,
    kind: "course",
    title: "useActionState (React 19)",
    summary: "Form actions, pending state, return value from server action.",
    lessonPath: "lessons/react/10-use-action-state.md",
  },
  {
    slug: "11-use-optimistic",
    track: "react",
    level: "react",
    number: 11,
    kind: "course",
    title: "useOptimistic (React 19)",
    summary: "Show optimistic UI while an async mutation runs.",
    lessonPath: "lessons/react/11-use-optimistic.md",
  },
  {
    slug: "12-use-hook",
    track: "react",
    level: "react",
    number: 12,
    kind: "course",
    title: "use (React 19)",
    summary: "Read promises and context in render — Suspense-friendly.",
    lessonPath: "lessons/react/12-use-hook.md",
  },
  {
    slug: "13-use-imperative-handle",
    track: "react",
    level: "react",
    number: 13,
    kind: "course",
    title: "useImperativeHandle",
    summary: "Expose a limited API from a child ref (forms, focus).",
    lessonPath: "lessons/react/13-use-imperative-handle.md",
  },
  {
    slug: "14-interview-questions",
    track: "react",
    level: "react",
    number: 14,
    kind: "course",
    title: "React hooks — interview Q&A",
    summary: "Classic questions with short answers (rules, stale closure, keys).",
    lessonPath: "lessons/react/14-interview-questions.md",
  },
  {
    slug: "quiz-questions",
    track: "react",
    level: "react",
    number: 15,
    kind: "course",
    title: "Quiz — 20 questions (basic → pro)",
    summary: "Interactive quiz: your answer + accordion solution under each question.",
    lessonPath: "lessons/react/quiz/questions.md",
  },
  {
    slug: "quiz-solutions",
    track: "react",
    level: "react",
    number: 16,
    kind: "course",
    title: "Quiz — solutions (spoilers)",
    summary: "Answers for the 20-question React quiz. Open after attempting.",
    lessonPath: "lessons/react/quiz/solutions.md",
  },
];

export const lessons: LessonMeta[] = [...exerciseLessons, ...reactHookLessons];

export function getLessonsByTrack(track: LessonTrack): LessonMeta[] {
  return lessons.filter((l) => l.track === track);
}

/** @deprecated use getLessonsByTrack */
export function getLessonsByLevel(level: LessonLevel): LessonMeta[] {
  return getLessonsByTrack(level);
}

export function getLesson(track: LessonTrack, slug: string): LessonMeta | undefined {
  return lessons.find((l) => l.track === track && l.slug === slug);
}

export const lessonTracks: LessonTrack[] = ["easy", "medium", "hard", "react"];
