"use client";

import Icon from "./Icon";

export default function HeaderBar() {
  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border-subtle sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="flex items-center gap-3">
        <button
          aria-label="Toggle sidebar"
          className="text-text-secondary hover:text-text-primary transition-colors md:hidden"
        >
          <Icon name="menu" size={18} />
        </button>
        <span className="text-h3 text-text-primary font-medium">Documents</span>
      </div>
      <a
        href="#"
        className="flex items-center gap-1.5 text-nav text-text-secondary hover:text-text-primary transition-colors"
      >
        <Icon name="logo-github" size={16} />
        GitHub
      </a>
    </header>
  );
}
