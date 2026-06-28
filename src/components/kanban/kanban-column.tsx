"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./task-card";
import type { Task, TaskStatus } from "@/types";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

export function KanbanColumn({ id, title, color, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const addTask = useAppStore((s) => s.addTask);
  const activeProjectId = useAppStore((s) => s.activeProjectId);

  return (
    <div
      ref={setNodeRef}
      className={`flex w-80 shrink-0 flex-col rounded-xl border transition-colors ${
        isOver ? "border-teal-500/50 bg-teal-500/5" : "border-white/5 bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
        <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-xs text-zinc-500">
          {tasks.length}
        </span>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>

      <div className="px-3 pb-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-zinc-500 hover:text-zinc-300"
          onClick={() =>
            addTask({
              title: "New Task",
              description: "",
              status: id,
              priority: "medium",
              projectId: activeProjectId,
              tags: [],
            })
          }
        >
          <Plus className="h-3.5 w-3.5" />
          Add task
        </Button>
      </div>
    </div>
  );
}
