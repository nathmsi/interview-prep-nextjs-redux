import { getLessonsByTrack, type LessonTrack } from "@/lib/lessons";

export type SubjectId =
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "css"
  | "libraries";

export type Subject = {
  id: SubjectId;
  label: string;
  description: string;
  tracks: LessonTrack[];
  entryHref: string;
};

/** Tracks shown on home, nav, and /lessons (interview prep only). */
export const interviewTracks: LessonTrack[] = [
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "css",
  "libraries",
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
    description: "Types, generics, utilities — interactive 20-question quiz.",
    tracks: ["typescript"],
    entryHref: "/lessons/typescript/quiz-questions",
  },
  {
    id: "react",
    label: "React",
    description: "Hooks (React 19), patterns, and a 20-question interview quiz.",
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
    id: "libraries",
    label: "Libraries",
    description: "Essential npm ecosystem — what to use, when, and why (interview angle).",
    tracks: ["libraries"],
    entryHref: "/lessons/libraries/01-essential-libraries",
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
