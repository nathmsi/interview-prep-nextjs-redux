export type InterviewStage = {
  id: string;
  label: string;
  format: string;
  status: "done" | "current" | "upcoming";
};

export type MondayCase = {
  id: string;
  title: string;
  subtitle: string;
  probability: "très probable" | "probable" | "possible";
  prompt: string;
  tags: string[];
};

export const mondayStages: InterviewStage[] = [
  {
    id: "coding",
    label: "Coding",
    format: "Coderpad",
    status: "done",
  },
  {
    id: "e2e",
    label: "End2End",
    format: "Pseudo-code + discussion",
    status: "current",
  },
  {
    id: "system-design",
    label: "System design",
    format: "Architecture large",
    status: "upcoming",
  },
  {
    id: "management",
    label: "Management",
    format: "Fit équipe",
    status: "upcoming",
  },
  {
    id: "hr",
    label: "HR",
    format: "Culture",
    status: "upcoming",
  },
];

export const mondayCases: MondayCase[] = [
  {
    id: "cas-1-automations",
    title: "Automations",
    subtitle: "When → Do",
    probability: "très probable",
    prompt:
      "Quand Status passe à Done → notifier le PM et assigner à quelqu'un.",
    tags: ["queue", "boucles", "permissions"],
  },
  {
    id: "cas-2-vue-kanban",
    title: "Vue Kanban",
    subtitle: "Drag & drop + vues multiples",
    probability: "très probable",
    prompt: "Board 10K items — Table, Kanban, Calendar sur les mêmes données.",
    tags: ["optimistic UI", "virtualisation", "real-time"],
  },
  {
    id: "cas-3-workforms",
    title: "Workforms",
    subtitle: "Formulaire externe → item",
    probability: "probable",
    prompt: "Formulaire public qui crée un item dans un board.",
    tags: ["validation", "spam", "mapping colonnes"],
  },
  {
    id: "cas-4-collaboration-temps-reel",
    title: "Temps réel",
    subtitle: "2 users, même item",
    probability: "probable",
    prompt: "Conflit : un change le status, l'autre le titre en même temps.",
    tags: ["websockets", "conflits", "présence"],
  },
  {
    id: "cas-5-dashboard-widgets",
    title: "Dashboard",
    subtitle: "Widgets multi-boards",
    probability: "possible",
    prompt: "Widget « nombre d'items Done par personne » sur 3 boards.",
    tags: ["agrégation", "cache", "permissions"],
  },
  {
    id: "cas-6-connect-boards",
    title: "Connect boards",
    subtitle: "Relations + mirror columns",
    probability: "possible",
    prompt: "Lier un projet à plusieurs clients, afficher le nom client en miroir.",
    tags: ["relations", "N+1", "cascade"],
  },
];
