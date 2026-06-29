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
    slug: "monday-com-e2e",
    company: "monday.com",
    role: "Frontend Engineer — End2End interview",
    date: "Étape 2 — après Coding",
    location: "Tel Aviv — Virtual",
    summary:
      "6 cas pratiques · pseudo-code · réponses modèles · tradeoffs · edge cases",
    markdownPath: "lessons/interviews/monday-com-e2e.md",
  },
];

export function getInterview(slug: string): InterviewPrep | undefined {
  return interviews.find((i) => i.slug === slug);
}

export function interviewHref(slug: string): string {
  return `/interviews/${slug}`;
}
