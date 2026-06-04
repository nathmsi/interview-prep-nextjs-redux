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
    summary: "Quand utiliser 'use client', fetch côté serveur, passer des props sérialisables.",
    exercisePath: "src/exercises/easy/01-server-vs-client",
    lessonPath: "lessons/easy/01-server-vs-client.md",
  },
  {
    slug: "02-redux-provider",
    level: "easy",
    number: 2,
    title: "Redux + Provider (App Router)",
    summary: "Store typé, hooks useAppDispatch / useAppSelector, Provider client dans layout.",
    exercisePath: "src/exercises/easy/02-redux-provider",
    lessonPath: "lessons/easy/02-redux-provider.md",
  },
  {
    slug: "01-async-thunk",
    level: "medium",
    number: 1,
    title: "createAsyncThunk + API Route",
    summary: "Charger des produits depuis /api/products avec états pending/fulfilled/rejected.",
    exercisePath: "src/exercises/medium/01-async-thunk",
    lessonPath: "lessons/medium/01-async-thunk.md",
  },
  {
    slug: "02-cart-slice",
    level: "medium",
    number: 2,
    title: "Slice panier + POST /api/cart",
    summary: "Actions synchrones, extraReducers, synchroniser le panier avec le serveur.",
    exercisePath: "src/exercises/medium/02-cart-slice",
    lessonPath: "lessons/medium/02-cart-slice.md",
  },
  {
    slug: "03-route-handlers",
    level: "medium",
    number: 3,
    title: "Route Handlers (REST)",
    summary: "GET/POST typés, validation, codes HTTP — pattern entretien Next.js.",
    exercisePath: "src/exercises/medium/03-route-handlers",
    lessonPath: "lessons/medium/03-route-handlers.md",
  },
  {
    slug: "04-selectors-memo",
    level: "medium",
    number: 4,
    title: "Selectors & createSelector",
    summary: "Dériver total panier et liste enrichie sans re-renders inutiles.",
    exercisePath: "src/exercises/medium/04-selectors-memo",
    lessonPath: "lessons/medium/04-selectors-memo.md",
  },
  {
    slug: "01-rtk-query",
    level: "hard",
    number: 1,
    title: "RTK Query + baseUrl",
    summary: "Cache, tags, invalidation — alternative moderne aux thunks manuels.",
    exercisePath: "src/exercises/hard/01-rtk-query",
    lessonPath: "lessons/hard/01-rtk-query.md",
  },
  {
    slug: "02-optimistic-cart",
    level: "hard",
    number: 2,
    title: "Mises à jour optimistes",
    summary: "UI instantanée + rollback si l'API échoue (pattern senior).",
    exercisePath: "src/exercises/hard/02-optimistic-cart",
    lessonPath: "lessons/hard/02-optimistic-cart.md",
  },
  {
    slug: "03-hydration-redux",
    level: "hard",
    number: 3,
    title: "Éviter les mismatches SSR",
    summary: "Store client-only, pas de Redux sur le Server Component — piège classique.",
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
