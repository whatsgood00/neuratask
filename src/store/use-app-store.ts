"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  mockActivities,
  mockCalendarEvents,
  mockChatMessages,
  mockProjects,
  mockStats,
  mockTasks,
  mockUsers,
} from "@/lib/mock-data";
import type {
  ActivityItem,
  Attachment,
  CalendarEvent,
  ChatMessage,
  ProductivityStats,
  Project,
  Task,
  TaskStatus,
  User,
  ViewMode,
} from "@/types";

interface AppState {
  // Onboarding
  onboardingComplete: boolean;
  completeOnboarding: () => void;

  // Navigation
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  activeProjectId: string;
  setActiveProject: (id: string) => void;

  // Data
  users: User[];
  projects: Project[];
  tasks: Task[];
  activities: ActivityItem[];
  chatMessages: ChatMessage[];
  calendarEvents: CalendarEvent[];
  stats: ProductivityStats;

  // UI state
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  aiChatOpen: boolean;
  setAiChatOpen: (open: boolean) => void;
  aiChatExpanded: boolean;
  setAiChatExpanded: (expanded: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;

  // Actions
  moveTask: (taskId: string, status: TaskStatus) => void;
  addTask: (task: Omit<Task, "id" | "createdAt" | "attachments">) => void;
  addActivity: (activity: Omit<ActivityItem, "id" | "timestamp">) => void;
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  addAttachment: (taskId: string, attachment: Omit<Attachment, "id" | "uploadedAt">) => void;
  acceptAiSuggestion: (title: string, priority: Task["priority"], tags: string[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      onboardingComplete: false,
      completeOnboarding: () => set({ onboardingComplete: true }),

      currentView: "board",
      setCurrentView: (view) => set({ currentView: view }),
      activeProjectId: "p1",
      setActiveProject: (id) => set({ activeProjectId: id }),

      users: mockUsers,
      projects: mockProjects,
      tasks: mockTasks,
      activities: mockActivities,
      chatMessages: mockChatMessages,
      calendarEvents: mockCalendarEvents,
      stats: mockStats,

      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      aiChatOpen: false,
      setAiChatOpen: (open) => set({ aiChatOpen: open }),
      aiChatExpanded: false,
      setAiChatExpanded: (expanded) => set({ aiChatExpanded: expanded }),
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedTaskId: null,
      setSelectedTaskId: (id) => set({ selectedTaskId: id }),

      moveTask: (taskId, status) => {
        const task = get().tasks.find((t) => t.id === taskId);
        if (!task || task.status === status) return;

        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
        }));

        const statusLabels: Record<TaskStatus, string> = {
          todo: "To Do",
          in_progress: "In Progress",
          done: "Done",
        };
        get().addActivity({
          type: "task",
          userId: "u1",
          message: `moved "${task.title}" to ${statusLabels[status]}`,
          taskId,
        });
      },

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: `t${Date.now()}`,
          createdAt: new Date().toISOString().split("T")[0],
          attachments: [],
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
          stats: { ...state.stats, tasksTotal: state.stats.tasksTotal + 1 },
        }));
      },

      addActivity: (activity) => {
        const newActivity: ActivityItem = {
          ...activity,
          id: `act${Date.now()}`,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({ activities: [newActivity, ...state.activities] }));
      },

      addChatMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `c${Date.now()}`,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({ chatMessages: [...state.chatMessages, newMessage] }));
      },

      addAttachment: (taskId, attachment) => {
        const newAttachment: Attachment = {
          ...attachment,
          id: `a${Date.now()}`,
          uploadedAt: new Date().toISOString().split("T")[0],
        };
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, attachments: [...t.attachments, newAttachment] } : t
          ),
        }));
        const task = get().tasks.find((t) => t.id === taskId);
        get().addActivity({
          type: "file",
          userId: "u1",
          message: `uploaded ${attachment.name} to "${task?.title ?? "task"}"`,
          taskId,
        });
      },

      acceptAiSuggestion: (title, priority, tags) => {
        get().addTask({
          title,
          description: `AI-suggested task: ${title}`,
          status: "todo",
          priority,
          projectId: get().activeProjectId,
          assigneeId: "u1",
          tags,
          aiSuggested: true,
        });
        set((state) => ({
          stats: { ...state.stats, aiSuggestionsUsed: state.stats.aiSuggestionsUsed + 1 },
        }));
        get().addActivity({
          type: "ai",
          userId: "u1",
          message: `accepted AI suggestion: "${title}"`,
        });
      },
    }),
    {
      name: "neuratask-storage",
      skipHydration: true,
      partialize: (state) => ({
        onboardingComplete: state.onboardingComplete,
        tasks: state.tasks,
        stats: state.stats,
        activities: state.activities,
        chatMessages: state.chatMessages,
      }),
    }
  )
);
