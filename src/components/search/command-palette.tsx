"use client";

import { useRouter } from "next/navigation";

import { useAppStore } from "@/store/use-app-store";
import { VIEW_PATHS } from "@/lib/routes";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, Command } from "@/components/ui/command";
import { Activity, BarChart3, Calendar, LayoutGrid, Plus, Sparkles } from "lucide-react";
import type { ViewMode } from "@/types";

export function CommandPalette() {
  const router = useRouter();
  const open = useAppStore((s) => s.commandPaletteOpen);
  const setOpen = useAppStore((s) => s.setCommandPaletteOpen);
  const setAiChatOpen = useAppStore((s) => s.setAiChatOpen);
  const tasks = useAppStore((s) => s.tasks);
  const setSelectedTaskId = useAppStore((s) => s.setSelectedTaskId);
  const addTask = useAppStore((s) => s.addTask);
  const activeProjectId = useAppStore((s) => s.activeProjectId);

  const navigate = (view: ViewMode) => {
    router.push(VIEW_PATHS[view]);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-xl">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate("board")}>
            <LayoutGrid className="mr-2 h-4 w-4" /> Kanban Board
          </CommandItem>
          <CommandItem onSelect={() => navigate("calendar")}>
            <Calendar className="mr-2 h-4 w-4" /> Calendar
          </CommandItem>
          <CommandItem onSelect={() => navigate("dashboard")}>
            <BarChart3 className="mr-2 h-4 w-4" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => navigate("activity")}>
            <Activity className="mr-2 h-4 w-4" /> Activity Feed
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              addTask({
                title: "New Task",
                description: "",
                status: "todo",
                priority: "medium",
                projectId: activeProjectId,
                tags: [],
              });
              setOpen(false);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Create new task
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setAiChatOpen(true);
              setOpen(false);
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Open AI Assistant
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tasks">
          {tasks.map((task) => (
            <CommandItem
              key={task.id}
              onSelect={() => {
                setSelectedTaskId(task.id);
                router.push(VIEW_PATHS.board);
                setOpen(false);
              }}
            >
              {task.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      </Command>
    </CommandDialog>
  );
}
