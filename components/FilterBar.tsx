"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Icon from "./Icon";
import { filterTabs } from "@/lib/data";

export default function FilterBar() {
  const [activeTab, setActiveTab] = useState<string>("outline");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Left: segmented filter tabs */}
      <div className="flex items-center gap-1 rounded-md bg-card-bg border border-card-border p-1 w-fit overflow-x-auto">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-3 h-7 rounded text-nav whitespace-nowrap transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="filter-active-pill"
                  className="absolute inset-0 rounded bg-[#FAFAFA]"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 ${
                  isActive ? "text-[#09090B] font-medium" : "text-text-secondary"
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span
                    className={`text-[10px] leading-none rounded-pill px-1.5 py-0.5 ${
                      isActive ? "bg-[#09090B]/10 text-[#09090B]" : "bg-accent-pill text-text-secondary"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-card-border text-nav text-text-secondary hover:border-card-border-hover hover:text-text-primary transition-colors active:scale-[0.98]">
          Customize Columns
          <Icon name="chevron-down" size={13} />
        </button>
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-card-border text-nav text-text-primary hover:border-card-border-hover transition-colors active:scale-[0.98]">
          <Icon name="add" size={14} />
          Add Section
        </button>
      </div>
    </div>
  );
}
