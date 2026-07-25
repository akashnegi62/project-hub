"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Icon from "./Icon";
import { sectionRows, type SectionStatus } from "@/lib/data";

const statusStyles: Record<SectionStatus, { dot: string; text: string }> = {
  Draft: { dot: "#71717A", text: "#A1A1AA" },
  "In Review": { dot: "#FBBF24", text: "#FAFAFA" },
  Approved: { dot: "#4ADE80", text: "#FAFAFA" },
};

const columns = [
  { key: "header", label: "Header" },
  { key: "sectionType", label: "Section Type" },
  { key: "status", label: "Status" },
  { key: "target", label: "Target" },
  { key: "limit", label: "Limit" },
  { key: "reviewer", label: "Reviewer" },
] as const;

export default function DataTable() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [allChecked, setAllChecked] = useState(false);

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    const map: Record<string, boolean> = {};
    sectionRows.forEach((r) => (map[r.id] = next));
    setChecked(map);
  };

  const toggleOne = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-lg border border-card-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-190 border-collapse">
          <thead>
            <tr className="bg-card-bg border-b border-border-subtle">
              <th className="w-10 px-4 py-2.5">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allChecked}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded-sm accent-[#FAFAFA]"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-2.5 text-micro font-medium text-text-secondary"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sectionRows.map((row, i) => {
              const style = statusStyles[row.status];
              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="border-b border-border-subtle last:border-0 hover:bg-hover-tint transition-colors"
                >
                  <td className="px-4 py-2.5">
                    <input
                      type="checkbox"
                      aria-label={`Select ${row.header}`}
                      checked={!!checked[row.id]}
                      onChange={() => toggleOne(row.id)}
                      className="w-3.5 h-3.5 rounded-sm accent-[#FAFAFA]"
                    />
                  </td>
                  <td className="px-4 py-2.5 text-nav text-text-primary flex items-center gap-2">
                    <Icon name="document-text" size={14} color="#71717A" />
                    {row.header}
                  </td>
                  <td className="px-4 py-2.5 text-nav text-text-secondary">{row.sectionType}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-pill border border-card-border px-2 py-0.5 text-badge"
                      style={{ color: style.text }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: style.dot }}
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-nav font-mono text-text-primary">{row.target}</td>
                  <td className="px-4 py-2.5 text-nav font-mono text-text-primary">{row.limit}</td>
                  <td className="px-4 py-2.5">
                    {row.reviewer === "Assign reviewer" ? (
                      <button className="text-nav text-text-muted hover:text-text-primary transition-colors">
                        {row.reviewer}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-accent-pill flex items-center justify-center text-[10px] text-text-primary shrink-0">
                          {row.reviewer.charAt(0)}
                        </div>
                        <span className="text-nav text-text-primary">{row.reviewer}</span>
                      </div>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
