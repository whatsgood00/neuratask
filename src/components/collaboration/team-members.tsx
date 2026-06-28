"use client";

import { useAppStore } from "@/store/use-app-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const roleLabels = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};

const roleColors = {
  owner: "text-amber-400",
  admin: "text-teal-400",
  member: "text-zinc-400",
  viewer: "text-zinc-600",
};

export function TeamMembers() {
  const users = useAppStore((s) => s.users);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center -space-x-2 rounded-lg p-1 hover:bg-white/5">
          {users.slice(0, 3).map((user) => (
            <Avatar key={user.id} className="h-8 w-8 border-2 border-[#0a0a0f]">
              <AvatarFallback className="bg-gradient-to-br from-teal-500/80 to-sky-600/80 text-xs text-white">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
          ))}
          {users.length > 3 && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a0a0f] bg-white/10 text-xs text-zinc-400">
              +{users.length - 3}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Team Members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {users.map((user) => (
          <DropdownMenuItem key={user.id} className="flex items-center gap-3 py-2">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-teal-500/30 text-xs text-teal-300">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-popover",
                  user.online ? "bg-green-500" : "bg-zinc-600"
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <span className={cn("text-xs font-medium", roleColors[user.role])}>
              {roleLabels[user.role]}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
