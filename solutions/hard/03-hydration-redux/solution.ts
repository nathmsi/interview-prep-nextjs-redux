export type ComponentKind = "server-safe" | "client-redux" | "unsafe";

export type ComponentSpec = {
  id: string;
  usesUseState: boolean;
  usesRedux: boolean;
  usesWindow: boolean;
  isAsyncServer: boolean;
};

export function classifyComponent(spec: ComponentSpec): ComponentKind {
  if (spec.usesWindow && spec.isAsyncServer) return "unsafe";
  if (spec.usesWindow && !spec.usesUseState) return "unsafe";
  if (spec.isAsyncServer && (spec.usesRedux || spec.usesUseState)) return "unsafe";
  if (spec.usesRedux || spec.usesUseState) return "client-redux";
  if (spec.isAsyncServer) return "server-safe";
  return "server-safe";
}
