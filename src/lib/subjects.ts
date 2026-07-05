import { getLessonsByTrack, type LessonTrack } from "@/lib/lessons";

export type SubjectId =
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "css"
  | "tailwind"
  | "libraries"
  | "ai";

export type Subject = {
  id: SubjectId;
  label: string;
  description: string;
  tracks: LessonTrack[];
  /** First lesson to start the subject */
  entryHref: string;
};

export function subjectPageHref(id: SubjectId): string {
  return `/subjects/${id}`;
}

export const subjectIds: SubjectId[] = [
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "css",
  "tailwind",
  "libraries",
  "ai",
];

export function isSubjectId(value: string): value is SubjectId {
  return (subjectIds as string[]).includes(value);
}

/** Tracks shown on home, nav, and /lessons (interview prep only). */
export const interviewTracks: LessonTrack[] = [
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "css",
  "tailwind",
  "libraries",
  "ai",
];

export const subjects: Subject[] = [
  {
    id: "javascript",
    label: "JavaScript",
    description: "Core language — basic, medium & hard interview Q&A with TypeScript tie-ins.",
    tracks: ["javascript"],
    entryHref: "/lessons/javascript/01-basic-interview",
  },
  {
    id: "typescript",
    label: "TypeScript",
    description: "Types, narrowing, generics, utilities — 3 lessons + 20-question quiz.",
    tracks: ["typescript"],
    entryHref: "/lessons/typescript/01-types-and-narrowing",
  },
  {
    id: "react",
    label: "React",
    description: "Hooks (React 19), 10 hands-on exercises, patterns, and a 20-question quiz.",
    tracks: ["react"],
    entryHref: "/lessons/react/01-use-state",
  },
  {
    id: "nextjs",
    label: "Next.js",
    description: "App Router, RSC, API routes, caching, Server Actions, deploy.",
    tracks: ["nextjs"],
    entryHref: "/lessons/nextjs/01-overview-and-tooling",
  },
  {
    id: "css",
    label: "CSS",
    description: "Layout, responsive, a11y, and styling libraries (Tailwind, CSS Modules…).",
    tracks: ["css"],
    entryHref: "/lessons/css/01-interview-questions",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    description:
      "Utility-first CSS with React & Next.js — setup, layout, responsive, dark mode, RSC.",
    tracks: ["tailwind"],
    entryHref: "/lessons/tailwind/01-setup-nextjs",
  },
  {
    id: "libraries",
    label: "Libraries",
    description: "Essential npm ecosystem — what to use, when, and why (interview angle).",
    tracks: ["libraries"],
    entryHref: "/lessons/libraries/01-essential-libraries",
  },
  {
    id: "ai",
    label: "AI & coding",
    description:
      "Use AI well: prompts, Cursor Skills & Rules, docs for context, review & security.",
    tracks: ["ai"],
    entryHref: "/lessons/ai/01-mindset-and-workflow",
  },
];

export function getSubject(id: SubjectId): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function lessonCountForSubject(subject: Subject): number {
  return subject.tracks.reduce(
    (n, track) => n + getLessonsByTrack(track).length,
    0
  );
}

/** Map lesson track to subject hub (interview tracks only). */
export function subjectIdForTrack(track: LessonTrack): SubjectId | undefined {
  return isSubjectId(track) ? track : undefined;
}
