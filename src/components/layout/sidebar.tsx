"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { VIEW_PATHS } from "@/lib/routes";
import { useAppStore } from "@/store/use-app-store";
import {
  Activity,
  BarChart3,
  Calendar,
  ChevronDown,
  LayoutGrid,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { id: "board" as const, label: "Board", icon: LayoutGrid },
  { id: "calendar" as const, label: "Calendar", icon: Calendar },
  { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
  { id: "activity" as const, label: "Activity", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();
  const projects = useAppStore((s) => s.projects);
  const activeProjectId = useAppStore((s) => s.activeProjectId);
  const setActiveProject = useAppStore((s) => s.setActiveProject);
  const users = useAppStore((s) => s.users);

  const activeProject = projects.find((p) => p.id === activeProjectId);

  return (
    <aside className="relative z-10 flex w-64 shrink-0 flex-col border-r border-white/[0.06] bg-black/40 backdrop-blur-xl">
      <div className="px-5 py-5">
        <span className="text-lg font-semibold tracking-tight text-white">NeuraTask</span>
        <p className="mt-0.5 text-[10px] font-medium tracking-wider text-zinc-500 uppercase">Workspace</p>
      </div>

      <nav className="flex flex-col gap-0.5 px-3">
        {navItems.map(({ id, label, icon: Icon }) => {
          const href = VIEW_PATHS[id];
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={id}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-teal-500/15 text-white ring-1 ring-teal-500/25"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "text-teal-400")} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 px-4">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Projects</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex flex-col gap-0.5">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all",
                activeProjectId === project.id
                  ? "bg-white/[0.06] text-white"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              )}
            >
              <span className="text-base">{project.icon}</span>
              <span className="truncate">{project.name}</span>
              <span
                className="ml-auto h-1.5 w-1.5 rounded-full ring-2 ring-black/40"
                style={{ backgroundColor: project.color }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-white/[0.06] p-4">
        <div className="mb-3 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Team</div>
        <div className="flex -space-x-2">
          {users.map((user) => (
            <Avatar key={user.id} className="h-8 w-8 border-2 border-[#07070b]">
              <AvatarFallback className="bg-gradient-to-br from-teal-500/90 to-sky-500/90 text-[10px] text-white">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
          ))}
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-zinc-700 text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-300">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        {activeProject && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mt-3 flex w-full items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06]">
                <span>{activeProject.icon}</span>
                <span className="truncate">{activeProject.name}</span>
                <ChevronDown className="ml-auto h-3.5 w-3.5 text-zinc-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {projects.map((p) => (
                <DropdownMenuItem key={p.id} onClick={() => setActiveProject(p.id)}>
                  {p.icon} {p.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </aside>
  );
}
