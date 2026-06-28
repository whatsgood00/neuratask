"use client";

import { useAppStore } from "@/store/use-app-store";
import { formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { NeuraAILogo } from "@/components/ai/neura-ai-logo";
import {
  FileUp,
  MessageSquare,
  UserPlus,
  CheckSquare,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ActivityType } from "@/types";

const activityIcons: Record<Exclude<ActivityType, "ai">, typeof CheckSquare> = {
  task: CheckSquare,
  comment: MessageSquare,
  file: FileUp,
  member: UserPlus,
};

const activityColors: Record<ActivityType, string> = {
  task: "text-teal-400 bg-teal-500/10",
  comment: "text-blue-400 bg-blue-500/10",
  file: "text-amber-400 bg-amber-500/10",
  ai: "text-sky-400 bg-sky-500/10",
  member: "text-green-400 bg-green-500/10",
};

export function ActivityFeed() {
  const activities = useAppStore((s) => s.activities);
  const users = useAppStore((s) => s.users);
  const setSelectedTaskId = useAppStore((s) => s.setSelectedTaskId);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Activity Feed</h2>
        <p className="text-sm text-zinc-500">Real-time updates from your team</p>
      </div>

      <div className="space-y-1">
        {activities.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">No activity yet</p>
        ) : (
        activities.map((activity) => {
          const user = users.find((u) => u.id === activity.userId);
          const Icon = activity.type !== "ai" ? activityIcons[activity.type] : null;
          const colorClass = activityColors[activity.type];

          return (
            <div
              key={activity.id}
              className="group relative flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.03]"
            >
              <div className="relative">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-white/10 text-xs text-zinc-300">
                    {user?.avatar ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 rounded-full p-0.5 ${colorClass}`}>
                  {activity.type === "ai" ? (
                    <NeuraAILogo size={10} />
                  ) : (
                    Icon && <Icon className="h-2.5 w-2.5" />
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-300">
                  <span className="font-medium text-white">{user?.name}</span>{" "}
                  {activity.message}
                </p>
                <p className="mt-0.5 text-xs text-zinc-600">
                  {formatDistanceToNow(parseISO(activity.timestamp), { addSuffix: true, locale: enUS })}
                </p>
              </div>

              {activity.taskId && (
                <button
                  onClick={() => setSelectedTaskId(activity.taskId!)}
                  className="shrink-0 self-center rounded-lg bg-white/5 px-2.5 py-1 text-xs text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-zinc-200"
                >
                  View
                </button>
              )}
            </div>
          );
        })
        )}
      </div>
    </div>
  );
}
