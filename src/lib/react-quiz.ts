export type QuizLevel = "basic" | "intermediate" | "advanced" | "pro";

export type QuizItem = {
  id: number;
  level: QuizLevel;
  title: string;
  question: string;
  solution: string;
};

export const quizLevelLabels: Record<QuizLevel, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced",
  pro: "Pro",
};

export const reactQuizItems: QuizItem[] = [
  {
    id: 1,
    level: "basic",
    title: "What is JSX?",
    question:
      "Explain what JSX is and what happens to it before the browser runs your code.",
    solution:
      "JSX is a syntax extension that looks like HTML inside JavaScript. It is not run by the browser as-is. A compiler transforms JSX into React.createElement (or the JSX runtime), which builds a tree of plain objects (React elements). React reconciles that tree with the DOM.",
  },
  {
    id: 2,
    level: "basic",
    title: "Props vs state",
    question:
      "What is the difference between props and state? Who owns each?",
    solution:
      "Props are owned by the parent, read-only for the child, and configure the component. State is owned by the component itself and updated via setState or dispatch. Props flow down; state is local unless lifted, or stored in context / an external store.",
  },
  {
    id: 3,
    level: "basic",
    title: "Rules of Hooks",
    question: "List the two main rules of hooks and why they exist.",
    solution:
      "1) Only call hooks at the top level — not in loops, conditions, or nested functions. 2) Only call hooks from React function components or custom hooks. React relies on call order to match each hook with its state slot; conditional calls would break that mapping.",
  },
  {
    id: 4,
    level: "basic",
    title: "useState updater",
    question:
      "When should you use setState(prev => ...) instead of setState(newValue)?",
    solution:
      "When the next state depends on the previous state — especially in async callbacks (stale closure risk) or when multiple updates are batched. For a simple absolute value like setName('Ada'), the direct form is fine.",
  },
  {
    id: 5,
    level: "basic",
    title: "Controlled vs uncontrolled inputs",
    question:
      "What is a controlled input? How does it differ from an uncontrolled input?",
    solution:
      "Controlled: React state is the source of truth (value + onChange). Uncontrolled: the DOM holds the value (defaultValue + ref to read on submit). Controlled is standard when you validate on every keystroke.",
  },
  {
    id: 6,
    level: "intermediate",
    title: "useEffect dependency array",
    question:
      "What happens if you omit the dependency array? What about [] vs [userId]?",
    solution:
      "Omitted: runs after every render. []: runs once after mount (cleanup on unmount). [userId]: runs on mount and when userId changes. Include every value from the component scope that the effect reads.",
  },
  {
    id: 7,
    level: "intermediate",
    title: "Stale closure",
    question:
      "What is a stale closure in useEffect or an event handler? Give one fix.",
    solution:
      "A handler or effect captures old props/state from an earlier render. Example: effect with [] that always logs count === 0. Fixes: correct dependency array, functional updates setCount(c => c + 1), or a ref holding the latest value.",
  },
  {
    id: 8,
    level: "intermediate",
    title: "useContext trade-offs",
    question: "When is useContext a good fit? Name one performance pitfall.",
    solution:
      "Good for shared data many components need (theme, auth, locale) without prop drilling. Pitfall: when the provider value changes, all consumers re-render even if they only need one field — split contexts or memoize.",
  },
  {
    id: 9,
    level: "intermediate",
    title: "useReducer vs useState",
    question: "When do you prefer useReducer over useState?",
    solution:
      "When state has multiple related fields, transitions are modeled as actions, or next state depends on action type (discriminated union). useState is enough for simple independent values.",
  },
  {
    id: 10,
    level: "intermediate",
    title: "List keys",
    question:
      "Why does React need a key on list items? When is index as key dangerous?",
    solution:
      "Keys help React match items across renders when lists reorder, add, or remove items. Index as key is dangerous when the list can reorder or filter — wrong component state and DOM reuse. Use stable ids from data.",
  },
  {
    id: 11,
    level: "advanced",
    title: "useMemo / useCallback",
    question: "What problem do they solve? When is memoization not worth it?",
    solution:
      "They cache a computed value (useMemo) or function reference (useCallback) until deps change — useful for memo children and expensive pure work. Not worth it for cheap work or deps that change every render; profile first.",
  },
  {
    id: 12,
    level: "advanced",
    title: "useRef vs useState",
    question:
      "Why update ref.current instead of state when you do not need a re-render?",
    solution:
      "ref.current updates do not schedule a re-render. Use refs for DOM nodes, timer ids, AbortController, or latest-value boxes. Use state when the UI must show the new value.",
  },
  {
    id: 13,
    level: "advanced",
    title: "useTransition",
    question: "What does startTransition do? Give one UX example.",
    solution:
      "Marks updates as non-urgent so React can keep the UI responsive and expose isPending. Example: filtering a large list while typing stays instant in the search field.",
  },
  {
    id: 14,
    level: "advanced",
    title: "Error boundaries",
    question:
      "Can you implement an error boundary with a hook? If not, what do you use?",
    solution:
      "No hook for error boundaries. Use a class component with getDerivedStateFromError / componentDidCatch, or a small wrapper library. useEffect cannot catch render errors in children.",
  },
  {
    id: 15,
    level: "advanced",
    title: "Custom hooks",
    question: "What makes a function a valid custom hook?",
    solution:
      "Name starts with use, may call other hooks, reuses stateful logic (not JSX). Same rules of hooks apply — top level only, called from components or other custom hooks.",
  },
  {
    id: 16,
    level: "pro",
    title: "useSyncExternalStore",
    question:
      "Why did React add this hook? What problem vs useState + useEffect subscribe?",
    solution:
      "Safe subscription to external stores during concurrent rendering — avoids tearing. useState + useEffect can read inconsistent snapshots mid-render. getServerSnapshot helps SSR.",
  },
  {
    id: 17,
    level: "pro",
    title: "use (React 19)",
    question: "How is use different from other hooks regarding where you call it?",
    solution:
      "use(promise) or use(context) can be called conditionally when used with Suspense (promises) or under a Provider (context). Integrates loading states without manual loading booleans in many cases.",
  },
  {
    id: 18,
    level: "pro",
    title: "useOptimistic / useActionState",
    question: "One use case for useOptimistic and one for useActionState.",
    solution:
      "useOptimistic: instant UI while a mutation runs (message sent, cart item), reconcile or rollback after. useActionState: form actions with pending state and returned errors/success — common with Server Actions in Next.js.",
  },
  {
    id: 19,
    level: "pro",
    title: "Server vs Client Components",
    question: "Can you use useState in a Server Component? Why or why not?",
    solution:
      "No. Server Components run on the server with no instance state and no hooks. useState and other hooks require a client component ('use client' in Next.js). Server fetches data with async/await and passes serializable props to clients.",
  },
  {
    id: 20,
    level: "pro",
    title: "Hydration mismatch",
    question: "What is a hydration mismatch? Give two common causes.",
    solution:
      "Server HTML does not match the client first render. Causes: non-deterministic render (Date.now, Math.random), browser-only APIs during first client render, invalid HTML nesting, locale differences. Fix: stable server markup, client-only logic in useEffect or client components.",
  },
];

export const quizLevels: QuizLevel[] = ["basic", "intermediate", "advanced", "pro"];
