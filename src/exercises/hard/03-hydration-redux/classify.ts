/**
 * EXERCISE hard/03 — classify components for Redux + RSC
 * Lesson: lessons/hard/03-hydration-redux.md
 */

export type ComponentKind = "server-safe" | "client-redux" | "unsafe";

export type ComponentSpec = {
  id: string;
  usesUseState: boolean;
  usesRedux: boolean;
  usesWindow: boolean;
  isAsyncServer: boolean;
};

export function classifyComponent(spec: ComponentSpec): ComponentKind {
  throw new Error("TODO");
}
