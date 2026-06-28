"use client";

import { useAppStore } from "@/store/use-app-store";
import { NeuraAILogo } from "@/components/ai/neura-ai-logo";
import { TrendingUp, Clock, Flame, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DailySummary() {
  const stats = useAppStore((s) => s.stats);
  const tasks = useAppStore((s) => s.tasks);
  const activeProjectId = useAppStore((s) => s.activeProjectId);

  const projectTasks = tasks.filter((t) => t.projectId === activeProjectId);
  const inProgress = projectTasks.filter((t) => t.status === "in_progress").length;
  const todo = projectTasks.filter((t) => t.status === "todo").length;
  const done = projectTasks.filter((t) => t.status === "done").length;
  const completionRate = projectTasks.length
    ? Math.round((done / projectTasks.length) * 100)
    : 0;

  return (
    <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-sky-500/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <NeuraAILogo size={16} className="text-teal-400" />
        <h3 className="text-sm font-medium text-zinc-300">Daily Summary</h3>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-zinc-400">
        AI analyzed your workflow. Focus on completing drag & drop today — it unblocks 2 tasks.
      </p>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/[0.03] p-2.5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <CheckCircle2 className="h-3 w-3" />
            <span className="text-[10px]">Done</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">{done}</p>
        </div>
        <div className="rounded-lg bg-white/[0.03] p-2.5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <TrendingUp className="h-3 w-3" />
            <span className="text-[10px]">In Progress</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-teal-400">{inProgress}</p>
        </div>
        <div className="rounded-lg bg-white/[0.03] p-2.5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Clock className="h-3 w-3" />
            <span className="text-[10px]">Focus</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-white">{stats.focusHours}h</p>
        </div>
        <div className="rounded-lg bg-white/[0.03] p-2.5">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Flame className="h-3 w-3" />
            <span className="text-[10px]">Streak</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-orange-400">{stats.streak}d</p>
        </div>
      </div>

      <div>
        <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
          <span>Project progress</span>
          <span>{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-1.5 bg-white/5" />
        <p className="mt-2 text-[10px] text-zinc-600">
          {todo} tasks remaining · {stats.aiSuggestionsUsed} AI suggestions used
        </p>
      </div>
    </div>
  );
}
