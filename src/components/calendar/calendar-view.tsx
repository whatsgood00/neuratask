"use client";

import { useMemo } from "react";
import { useAppStore } from "@/store/use-app-store";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  parseISO,
  addMonths,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarView() {
  const calendarEvents = useAppStore((s) => s.calendarEvents);
  const tasks = useAppStore((s) => s.tasks);
  const activeProjectId = useAppStore((s) => s.activeProjectId);
  const setSelectedTaskId = useAppStore((s) => s.setSelectedTaskId);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const projectTaskIds = useMemo(
    () => new Set(tasks.filter((t) => t.projectId === activeProjectId).map((t) => t.id)),
    [tasks, activeProjectId]
  );

  const events = calendarEvents.filter(
    (e) => !e.taskId || projectTaskIds.has(e.taskId)
  );

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startDay = (startOfMonth(currentMonth).getDay() + 6) % 7;
  const paddingDays = Array.from({ length: startDay }, (_, i) => i);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize text-white">
          {format(currentMonth, "LLLL yyyy", { locale: enUS })}
        </h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-[auto_1fr] gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5">
        {weekDays.map((day) => (
          <div key={day} className="bg-[#0a0a0f] px-2 py-2 text-center text-xs font-medium text-zinc-500">
            {day}
          </div>
        ))}

        <div className="col-span-7 grid grid-cols-7 gap-px overflow-y-auto">
          {paddingDays.map((i) => (
            <div key={`pad-${i}`} className="min-h-[80px] bg-[#0a0a0f] sm:min-h-[100px]" />
          ))}

          {days.map((day) => {
            const dayEvents = events.filter((e) => isSameDay(parseISO(e.date), day));
            return (
              <div
                key={day.toISOString()}
                className="min-h-[80px] bg-[#0a0a0f] p-2 transition-colors hover:bg-white/[0.02] sm:min-h-[100px]"
              >
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    isToday(day)
                      ? "bg-teal-500 font-semibold text-white"
                      : "text-zinc-400"
                  }`}
                >
                  {format(day, "d")}
                </span>
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => event.taskId && setSelectedTaskId(event.taskId)}
                      className="block w-full truncate rounded px-1.5 py-0.5 text-left text-[10px] text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: `${event.color}33`, borderLeft: `2px solid ${event.color}` }}
                    >
                      {event.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
