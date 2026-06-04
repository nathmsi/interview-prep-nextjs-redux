import { CounterPanel } from "@/components/demo/CounterPanel";
import { ProductCatalog } from "@/components/demo/ProductCatalog";
import { RtkQueryPanel } from "@/components/demo/RtkQueryPanel";

export default function DemoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Live demo</h1>
        <p className="mt-1 text-sm text-zinc-500">
          The server runs inside Next.js (Route Handlers). Redux is client-only via{" "}
          <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">StoreProvider</code>.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CounterPanel />
        <RtkQueryPanel />
      </div>
      <ProductCatalog />
    </div>
  );
}
