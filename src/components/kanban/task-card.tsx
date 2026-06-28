"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";
import type { Task, User } from "@/types";
import { Calendar, GripVertical, Paperclip, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";

const priorityColors = {
  low: "bg-zinc-500/20 text-zinc-400",
  medium: "bg-amber-500/20 text-amber-400",
  high: "bg-red-500/20 text-red-400",
};

function TaskCardContent({
  task,
  assignee,
  showHandle,
  dragHandleProps,
  className,
  onClick,
}: {
  task: Task;
  assignee?: User;
  showHandle?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg border border-white/5 bg-[#12121a] p-3 transition-all hover:border-white/10 hover:shadow-lg hover:shadow-teal-500/5",
        className
      )}
      onClick={onClick}
    >
      <div className="mb-2 flex items-start gap-2">
        {showHandle && (
          <button
            {...dragHandleProps}
            className="mt-0.5 cursor-grab text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-3.5 w-3.5" />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {task.aiSuggested && <Sparkles className="h-3 w-3 shrink-0 text-teal-400" />}
            <p className="truncate text-sm font-medium text-zinc-200">{task.title}</p>
          </div>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{task.description}</p>
          )}
        </div>
      </div>

      <div className="mb-2 flex flex-wrap gap-1">
        {task.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="border-0 bg-white/5 text-[10px] text-zinc-400">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", priorityColors[task.priority])}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="flex items-center gap-1 text-[10px] text-zinc-500">
              <Calendar className="h-3 w-3" />
              {format(parseISO(task.dueDate), "MMM d")}
            </span>
          )}
          {task.attachments.length > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] text-zinc-500">
              <Paperclip className="h-3 w-3" />
              {task.attachments.length}
            </span>
          )}
        </div>
        {assignee && (
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-teal-500/30 text-[10px] text-teal-300">
              {assignee.avatar}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}

export function TaskCardOverlay({ task }: { task: Task }) {
  const users = useAppStore((s) => s.users);
  const assignee = users.find((u) => u.id === task.assigneeId);

  return (
    <TaskCardContent
      task={task}
      assignee={assignee}
      className="rotate-2 scale-105 cursor-grabbing shadow-xl shadow-teal-500/20"
    />
  );
}

export function TaskCard({ task }: { task: Task }) {
  const users = useAppStore((s) => s.users);
  const setSelectedTaskId = useAppStore((s) => s.setSelectedTaskId);
  const assignee = users.find((u) => u.id === task.assigneeId);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(isDragging && "opacity-40")}
    >
      <TaskCardContent
        task={task}
        assignee={assignee}
        showHandle
        dragHandleProps={{ ...attributes, ...listeners }}
        onClick={() => setSelectedTaskId(task.id)}
      />
    </div>
  );
}
