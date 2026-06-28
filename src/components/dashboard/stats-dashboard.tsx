"use client";

import { useAppStore } from "@/store/use-app-store";
import { BarChart3, CheckCircle2, Clock, Flame, Sparkles, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsDashboard() {
  const stats = useAppStore((s) => s.stats);
  const tasks = useAppStore((s) => s.tasks);

  const tasksCompleted = tasks.filter((t) => t.status === "done").length;
  const tasksTotal = tasks.length;
  const completionRate = tasksTotal
    ? Math.round((tasksCompleted / tasksTotal) * 100)
    : 0;

  const statusCounts = {
    todo: tasks.filter((t) => t.status === "todo").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const maxWeekly = Math.max(...stats.weeklyProgress, 1);
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Productivity Dashboard</h2>
        <p className="text-sm text-zinc-500">Track your performance and AI-assisted workflow</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Tasks Completed", value: tasksCompleted, icon: CheckCircle2, color: "text-green-400" },
          { label: "Focus Hours", value: `${stats.focusHours}h`, icon: Clock, color: "text-teal-400" },
          { label: "Day Streak", value: stats.streak, icon: Flame, color: "text-orange-400" },
          { label: "AI Suggestions", value: stats.aiSuggestionsUsed, icon: Sparkles, color: "text-sky-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-white/5 bg-white/[0.02]">
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`rounded-lg bg-white/5 p-2.5 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-zinc-300">
              <TrendingUp className="h-4 w-4 text-teal-400" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {stats.weeklyProgress.map((value, i) => (
                <div key={dayLabels[i]} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-teal-600 to-teal-400 transition-all hover:from-teal-500 hover:to-teal-300"
                    style={{ height: `${(value / maxWeekly) * 100}%`, minHeight: 4 }}
                  />
                  <span className="text-[10px] text-zinc-500">{dayLabels[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-zinc-300">
              <BarChart3 className="h-4 w-4 text-teal-400" />
              Task Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "To Do", count: statusCounts.todo, color: "bg-zinc-500" },
              { label: "In Progress", count: statusCounts.in_progress, color: "bg-teal-500" },
              { label: "Done", count: statusCounts.done, color: "bg-green-500" },
            ].map(({ label, count, color }) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-zinc-400">{label}</span>
                  <span className="text-zinc-300">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${color} transition-all`}
                    style={{ width: `${tasks.length ? (count / tasks.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-2">
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-zinc-400">Overall completion</span>
                <span className="text-zinc-300">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2 bg-white/5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
