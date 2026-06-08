export type InterviewPrep = {
  slug: string;
  company: string;
  role: string;
  date: string;
  interviewer?: string;
  location: string;
  summary: string;
  markdownPath: string;
};

export const interviews: InterviewPrep[] = [
  {
    slug: "palo-alto-networks-cortex",
    company: "Palo Alto Networks",
    role: "Senior Frontend Engineer — Cortex Platform",
    date: "9 juin 2025 — 15:00 IDT",
    interviewer: "Shai Tubul (Principal Software Engineer)",
    location: "Tel Aviv — Virtual",
    summary:
      "Round 1 · React/TS · dashboards & data viz · AI workflow · sortie Wix (layoffs)",
    markdownPath: "lessons/interviews/palo-alto-networks-cortex.md",
  },
];

export function getInterview(slug: string): InterviewPrep | undefined {
  return interviews.find((i) => i.slug === slug);
}

export function interviewHref(slug: string): string {
  return `/interviews/${slug}`;
}
