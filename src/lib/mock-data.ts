import type {
  ActivityItem,
  CalendarEvent,
  ChatMessage,
  ProductivityStats,
  Project,
  Task,
  User,
} from "@/types";

export const mockUsers: User[] = [
  { id: "u1", name: "Elena B.", email: "elena@neuratask.io", avatar: "EB", role: "owner", online: true },
  { id: "u2", name: "Alex Chen", email: "alex@neuratask.io", avatar: "AC", role: "admin", online: true },
  { id: "u3", name: "Maria K.", email: "maria@neuratask.io", avatar: "MK", role: "member", online: false },
  { id: "u4", name: "James W.", email: "james@neuratask.io", avatar: "JW", role: "member", online: true },
];

export const mockProjects: Project[] = [
  { id: "p1", name: "Product Launch", color: "#14b8a6", icon: "🚀", description: "Q2 product release" },
  { id: "p2", name: "Design System", color: "#0ea5e9", icon: "🎨", description: "UI component library" },
  { id: "p3", name: "AI Integration", color: "#06b6d4", icon: "🤖", description: "ML features rollout" },
];

export const mockTasks: Task[] = [
  {
    id: "t1", title: "Design onboarding flow", description: "Create multi-step onboarding UI",
    status: "todo", priority: "high", projectId: "p1", assigneeId: "u2",
    dueDate: "2026-06-30", tags: ["design", "ux"], attachments: [],
    createdAt: "2026-06-25", aiSuggested: true,
  },
  {
    id: "t2", title: "Implement drag & drop", description: "Kanban board with smooth animations",
    status: "in_progress", priority: "high", projectId: "p1", assigneeId: "u1",
    dueDate: "2026-06-28", tags: ["frontend"], attachments: [
      { id: "a1", name: "spec.pdf", size: "2.4 MB", type: "pdf", uploadedAt: "2026-06-26" },
    ],
    createdAt: "2026-06-24",
  },
  {
    id: "t3", title: "AI chat assistant panel", description: "Floating widget with context awareness",
    status: "in_progress", priority: "medium", projectId: "p3", assigneeId: "u4",
    dueDate: "2026-07-01", tags: ["ai", "backend"], attachments: [],
    createdAt: "2026-06-23", aiSuggested: true,
  },
  {
    id: "t4", title: "Setup CI/CD pipeline", description: "Automated testing and deployment",
    status: "todo", priority: "medium", projectId: "p1", assigneeId: "u3",
    dueDate: "2026-07-05", tags: ["devops"], attachments: [],
    createdAt: "2026-06-22",
  },
  {
    id: "t5", title: "Color token system", description: "Define semantic color variables",
    status: "done", priority: "low", projectId: "p2", assigneeId: "u2",
    dueDate: "2026-06-20", tags: ["design"], attachments: [],
    createdAt: "2026-06-18",
  },
  {
    id: "t6", title: "Command palette (⌘K)", description: "Global search and quick actions",
    status: "done", priority: "medium", projectId: "p2", assigneeId: "u1",
    dueDate: "2026-06-21", tags: ["frontend"], attachments: [],
    createdAt: "2026-06-19",
  },
  {
    id: "t7", title: "Team collaboration UI", description: "Avatars, roles, presence indicators",
    status: "todo", priority: "low", projectId: "p1", assigneeId: "u4",
    dueDate: "2026-07-10", tags: ["ui"], attachments: [],
    createdAt: "2026-06-27", aiSuggested: true,
  },
];

export const mockActivities: ActivityItem[] = [
  { id: "act1", type: "task", userId: "u1", message: "moved \"Implement drag & drop\" to In Progress", timestamp: "2026-06-28T09:15:00", taskId: "t2" },
  { id: "act2", type: "ai", userId: "u1", message: "AI suggested 3 new tasks for Product Launch", timestamp: "2026-06-28T08:45:00" },
  { id: "act3", type: "comment", userId: "u2", message: "commented on \"Design onboarding flow\"", timestamp: "2026-06-28T08:30:00", taskId: "t1" },
  { id: "act4", type: "file", userId: "u1", message: "uploaded spec.pdf to \"Implement drag & drop\"", timestamp: "2026-06-27T16:20:00", taskId: "t2" },
  { id: "act5", type: "member", userId: "u4", message: "joined the Product Launch project", timestamp: "2026-06-27T14:00:00" },
  { id: "act6", type: "task", userId: "u2", message: "completed \"Color token system\"", timestamp: "2026-06-27T11:30:00", taskId: "t5" },
];

export const mockChatMessages: ChatMessage[] = [
  { id: "c1", role: "assistant", content: "Hi! I'm your NeuraTask AI assistant. I can help with tasks, planning, and automation. What should we work on?", timestamp: "2026-06-28T10:00:00" },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: "e1", title: "Design onboarding flow", date: "2026-06-30", taskId: "t1", color: "#14b8a6" },
  { id: "e2", title: "Implement drag & drop", date: "2026-06-28", taskId: "t2", color: "#14b8a6" },
  { id: "e3", title: "AI chat assistant panel", date: "2026-07-01", taskId: "t3", color: "#06b6d4" },
  { id: "e4", title: "Setup CI/CD pipeline", date: "2026-07-05", taskId: "t4", color: "#14b8a6" },
  { id: "e5", title: "Team collaboration UI", date: "2026-07-10", taskId: "t7", color: "#14b8a6" },
];

export const mockStats: ProductivityStats = {
  tasksCompleted: 2,
  tasksTotal: 7,
  focusHours: 4.5,
  streak: 12,
  weeklyProgress: [3, 5, 4, 7, 6, 8, 5],
  aiSuggestionsUsed: 8,
};

export const aiSuggestedTasks = [
  { title: "Review accessibility compliance", priority: "medium" as const, tags: ["a11y", "qa"] },
  { title: "Add keyboard shortcuts documentation", priority: "low" as const, tags: ["docs"] },
  { title: "Optimize bundle size for production", priority: "high" as const, tags: ["performance"] },
];

export const aiResponses: Record<string, string> = {
  default: "I've analyzed your tasks. I recommend finishing \"Implement drag & drop\" first — it's blocking 2 other tasks. Want me to reschedule deadlines?",
  summary: "📊 **Daily Summary (June 28):**\n\n• ✅ Completed: 2 tasks\n• 🔄 In progress: 2 tasks\n• 📋 In queue: 3 tasks\n• ⏱ Focus time: 4.5h\n• 🔥 Streak: 12 days\n\nToday's priority: finish drag & drop and start the onboarding flow.",
  tasks: "Based on your progress, I suggest 3 new tasks:\n\n1. **Review accessibility compliance** — medium\n2. **Add keyboard shortcuts docs** — low\n3. **Optimize bundle size** — high\n\nAdd them to the board?",
  search: "Found 3 tasks matching your query:\n\n• Implement drag & drop (In Progress)\n• Design onboarding flow (Todo)\n• AI chat assistant panel (In Progress)",
};
