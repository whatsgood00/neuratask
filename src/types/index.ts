export type TaskStatus = "todo" | "in_progress" | "done";
export type UserRole = "owner" | "admin" | "member" | "viewer";
export type ViewMode = "board" | "calendar" | "dashboard" | "activity";
export type ActivityType = "task" | "comment" | "file" | "ai" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  online: boolean;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  tags: string[];
  attachments: Attachment[];
  createdAt: string;
  aiSuggested?: boolean;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  userId: string;
  message: string;
  timestamp: string;
  taskId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  taskId?: string;
  color: string;
}

export interface ProductivityStats {
  tasksCompleted: number;
  tasksTotal: number;
  focusHours: number;
  streak: number;
  weeklyProgress: number[];
  aiSuggestionsUsed: number;
}
