"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Icon, { IconName } from "./Icon";

type DropdownCategoryItem = {
  id: string;
  label: string;
};

type DropdownCategory = {
  id: string;
  label: string;
  icon: IconName;
  items: DropdownCategoryItem[];
};

// Custom categories configuration
const dropdownCategories: DropdownCategory[] = [
  {
    id: "languages",
    label: "Languages",
    icon: "code",
    items: [
      { id: "python", label: "Python" },
      { id: "java", label: "Java" },
      { id: "node", label: "Node" },
      { id: "cpp", label: "C++" },
      { id: "cpp", label: "C" },
    ],
  },
  {
    id: "framework",
    label: "Framework",
    icon: "layers",
    items: [
      { id: "react", label: "React" },
      { id: "next", label: "Next" },
    ],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    icon: "cpu",
    items: [
      { id: "langchain", label: "Langchain" },
      { id: "langgraph", label: "Langgraph" },
      { id: "langsmith", label: "Langsmith" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    items: [
      { id: "mongodb", label: "MongoDB" },
      { id: "sql", label: "SQL" },
      { id: "oracle", label: "Oracle" },
    ],
  },
];

export default function Sidebar() {
  const [active, setActive] = useState<string>("languages");
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  // Track open dropdown states
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    languages: true,
    framework: false,
    ai: false,
    databases: false,
  });

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="hidden md:flex flex-col w-62.5 shrink-0 h-screen sticky top-0 bg-sidebar-bg border-r border-border-subtle overflow-y-auto">
      {/* Brand Header */}
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border-subtle shrink-0">
        <div className="w-6 h-6 rounded-full bg-text-primary text-background flex items-center justify-center text-[15px] font-bold">
          P
        </div>
        <span className="text-h3 font-semibold text-text-primary">
          Project Hub
        </span>
      </div>

      {/* Categorized Main Dropdown Navigation */}
      <nav className="px-3 flex flex-col gap-1 shrink-0 mt-8">
        <p className="text-micro text-text-muted uppercase tracking-wide px-2.5 mb-1 font-medium">
          Tech Stack
        </p>

        {dropdownCategories.map((category) => {
          const isActive = active === category.id;
          const isOpen = openDropdowns[category.id];

          return (
            <div key={category.id} className="flex flex-col">
              {/* Main Nav Category Button with Animated Active State */}
              <button
                key={category.id}
                onClick={() => {
                  setActive(category.id);
                  setActiveSubItem(null);
                  toggleDropdown(category.id);
                }}
                className={`relative flex items-center justify-between h-8 px-2.5 rounded-md text-nav transition-colors ${
                  isActive
                    ? "text-text-primary font-semibold"
                    : "text-text-secondary hover:bg-hover-tint"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-md bg-accent-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5 truncate">
                  <Icon
                    name={category.icon || "folder"}
                    size={16}
                    color={isActive ? "#FAFAFA" : "#A1A1AA"}
                  />
                  {category.label}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 shrink-0 text-text-muted ml-2"
                >
                  <Icon name="chevron-down" size={14} />
                </motion.span>
              </button>

              {/* Sub-items List */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden flex flex-col gap-0.5 pl-3 mt-0.5 border-l border-border-subtle ml-3"
                  >
                    {category.items.map((subItem) => {
                      const isSubActive = activeSubItem === subItem.id;

                      return (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            setActiveSubItem(subItem.id);
                            setActive(category.id);
                          }}
                          className={`flex items-center h-7 px-2.5 rounded-md text-micro transition-colors text-left ${
                            isSubActive
                              ? "text-text-primary font-medium bg-accent-pill"
                              : "text-text-muted hover:text-text-primary hover:bg-hover-tint"
                          }`}
                        >
                          {subItem.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className="flex-1 min-h-4" />

      {/* Footer Utilities */}
      <div className="px-3 pb-2 flex flex-col gap-0.5 border-t border-border-subtle pt-3 shrink-0">
        <button className="flex items-center gap-2.5 h-8 px-2.5 rounded-md text-nav text-text-secondary hover:bg-hover-tint hover:text-text-primary transition-colors">
          <Icon name="settings" size={16} />
          Settings
        </button>
        <button className="flex items-center gap-2.5 h-8 px-2.5 rounded-md text-nav text-text-secondary hover:bg-hover-tint hover:text-text-primary transition-colors">
          <Icon name="help-circle" size={16} />
          Get Help
        </button>
        <button className="flex items-center gap-2.5 h-8 px-2.5 rounded-md text-nav text-text-secondary hover:bg-hover-tint hover:text-text-primary transition-colors">
          <Icon name="search" size={16} />
          Search
        </button>
      </div>

      {/* User Card */}
      <div className="flex items-center gap-2.5 px-3 py-3 border-t border-border-subtle shrink-0">
        <div className="w-8 h-8 rounded-full bg-accent-pill shrink-0 flex items-center justify-center text-text-primary text-h3 font-medium">
          S
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-h3 text-text-primary truncate">ProjectHub</p>
          <p className="text-micro text-text-muted truncate">[EMAIL_ADDRESS]</p>
        </div>
        <button
          aria-label="Account menu"
          className="shrink-0 text-text-secondary hover:text-text-primary"
        >
          <Icon name="ellipsis-vertical" size={16} />
        </button>
      </div>
    </aside>
  );
}
