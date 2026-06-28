"use client";

import { useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { KanbanColumn } from "./kanban-column";
import { TaskCardOverlay } from "./task-card";
import type { Task, TaskStatus } from "@/types";

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: "todo", title: "To Do", color: "#71717a" },
  { id: "in_progress", title: "In Progress", color: "#14b8a6" },
  { id: "done", title: "Done", color: "#22c55e" },
];

export function KanbanBoard() {
  const tasks = useAppStore((s) => s.tasks);
  const activeProjectId = useAppStore((s) => s.activeProjectId);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const moveTask = useAppStore((s) => s.moveTask);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const filteredTasks = useMemo(() => {
    let result = tasks.filter((t) => t.projectId === activeProjectId);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [tasks, activeProjectId, searchQuery]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    let newStatus: TaskStatus | undefined;

    if (columns.some((c) => c.id === over.id)) {
      newStatus = over.id as TaskStatus;
    } else {
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask) newStatus = overTask.status;
    }

    if (newStatus) moveTask(taskId, newStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {filteredTasks.length === 0 && searchQuery.trim() ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-sm text-zinc-400">No results for &ldquo;{searchQuery}&rdquo;</p>
          <p className="mt-1 text-xs text-zinc-600">Try different keywords</p>
        </div>
      ) : (
        <div className="flex h-full gap-4 overflow-x-auto pb-2">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              color={col.color}
              tasks={filteredTasks.filter((t) => t.status === col.id)}
            />
          ))}
        </div>
      )}
      <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
        {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
