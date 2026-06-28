"use client";

import { useAppStore } from "@/store/use-app-store";
import { SearchBar } from "@/components/search/search-bar";
import { TeamMembers } from "@/components/collaboration/team-members";
import { Bell, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const setCommandPaletteOpen = useAppStore((s) => s.setCommandPaletteOpen);
  const projects = useAppStore((s) => s.projects);
  const activeProjectId = useAppStore((s) => s.activeProjectId);
  const currentView = useAppStore((s) => s.currentView);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const viewTitles: Record<string, string> = {
    board: "Kanban Board",
    calendar: "Calendar",
    dashboard: "Productivity Dashboard",
    activity: "Activity Feed",
  };

  return (
    <header className="relative z-10 flex items-center gap-4 border-b border-white/[0.06] bg-black/30 px-6 py-3.5 backdrop-blur-xl">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold tracking-tight text-white">
          {viewTitles[currentView]}
        </h1>
        <p className="truncate text-xs text-zinc-500">
          {activeProject?.icon} {activeProject?.name} · {activeProject?.description}
        </p>
      </div>

      <div className="mx-auto w-full max-w-md">
        <SearchBar />
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="hidden gap-1.5 text-zinc-400 hover:bg-white/[0.04] hover:text-white sm:flex"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Command className="h-3.5 w-3.5" />
          <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-400">
            ⌘K
          </kbd>
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:bg-white/[0.04] hover:text-white">
          <Bell className="h-4 w-4" />
        </Button>
        <TeamMembers />
      </div>
    </header>
  );
}
