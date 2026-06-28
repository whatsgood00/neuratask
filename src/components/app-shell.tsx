"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { ActivityFeed } from "@/components/activity/activity-feed";
import { AIChatWidget } from "@/components/ai/ai-chat-widget";
import { AISuggestions } from "@/components/ai/ai-suggestions";
import { DailySummary } from "@/components/ai/daily-summary";
import { CalendarView } from "@/components/calendar/calendar-view";
import { StatsDashboard } from "@/components/dashboard/stats-dashboard";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { TaskDetailPanel } from "@/components/kanban/task-detail-panel";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { CommandPalette } from "@/components/search/command-palette";
import { useStoreReady } from "@/hooks/use-store-ready";
import { pathToView } from "@/lib/routes";
import { useAppStore } from "@/store/use-app-store";

function AppLoader() {
  return (
    <div className="app-bg flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-xl font-semibold tracking-tight text-white">NeuraTask</p>
        <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Loading workspace</p>
      </div>
    </div>
  );
}

export function AppShell() {
  const ready = useStoreReady();
  const pathname = usePathname();
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);
  const currentView = useAppStore((s) => s.currentView);
  const setCurrentView = useAppStore((s) => s.setCurrentView);
  const setCommandPaletteOpen = useAppStore((s) => s.setCommandPaletteOpen);

  useEffect(() => {
    setCurrentView(pathToView(pathname));
  }, [pathname, setCurrentView]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCommandPaletteOpen]);

  if (!ready) {
    return <AppLoader />;
  }

  if (!onboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <div className="app-bg flex h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 app-grid opacity-40" />
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden p-4 sm:p-6">
            {currentView === "board" && <KanbanBoard />}
            {currentView === "calendar" && <CalendarView />}
            {currentView === "dashboard" && <StatsDashboard />}
            {currentView === "activity" && <ActivityFeed />}
          </div>
          {currentView === "board" && (
            <aside className="hidden w-80 shrink-0 flex-col gap-4 overflow-y-auto border-l border-white/[0.06] bg-black/20 p-4 backdrop-blur-xl xl:flex">
              <DailySummary />
              <AISuggestions />
            </aside>
          )}
        </main>
      </div>
      <CommandPalette />
      <AIChatWidget />
      <TaskDetailPanel />
    </div>
  );
}
