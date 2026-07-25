import { kpiMetrics } from "@/lib/data";
import KpiCard from "./KpiCard";

export default function KpiGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpiMetrics.map((metric, i) => (
        <KpiCard key={metric.id} metric={metric} index={i} />
      ))}
    </section>
  );
}
