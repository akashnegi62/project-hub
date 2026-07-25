"use client";

import { motion } from "motion/react";
import Icon from "./Icon";
import type { KpiMetric } from "@/lib/data";

export default function KpiCard({ metric, index }: { metric: KpiMetric; index: number }) {
  const isUp = metric.trend === "up";
  const trendColor = isUp ? "#4ADE80" : "#F87171";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ borderColor: "#3F3F46" }}
      className="rounded-lg border border-card-border bg-card-bg p-4 transition-colors"
      style={{ transitionProperty: "border-color" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-h3 text-text-secondary">{metric.label}</span>
        <span
          className="inline-flex items-center gap-1 rounded-pill border px-2 py-0.5 text-badge"
          style={{
            borderColor: isUp ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)",
            color: trendColor,
            backgroundColor: "#18181B",
          }}
        >
          <Icon name={isUp ? "trending-up" : "trending-down"} size={11} color={trendColor} />
          {metric.badgeValue}
        </span>
      </div>

      <p className="text-kpi font-mono text-text-primary mb-2">{metric.value}</p>

      <p className="text-h3 font-medium text-text-primary flex items-center gap-1">
        {metric.callout}
        <Icon name={isUp ? "trending-up" : "trending-down"} size={13} color="#FAFAFA" />
      </p>
      <p className="text-micro text-text-muted mt-1">{metric.subtext}</p>
    </motion.div>
  );
}
