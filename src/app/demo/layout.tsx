import { StoreProvider } from "@/components/providers/StoreProvider";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
