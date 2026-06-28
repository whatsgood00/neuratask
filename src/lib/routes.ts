import type { ViewMode } from "@/types";

export const VIEW_PATHS: Record<ViewMode, string> = {
  board: "/",
  calendar: "/calendar",
  dashboard: "/dashboard",
  activity: "/activity",
};

export function pathToView(pathname: string): ViewMode {
  if (pathname.startsWith("/dashboard")) return "dashboard";
  if (pathname.startsWith("/calendar")) return "calendar";
  if (pathname.startsWith("/activity")) return "activity";
  return "board";
}
