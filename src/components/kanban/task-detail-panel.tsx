"use client";

import { useAppStore } from "@/store/use-app-store";
import { FileDropzone } from "@/components/attachments/file-dropzone";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

export function TaskDetailPanel() {
  const selectedTaskId = useAppStore((s) => s.selectedTaskId);
  const setSelectedTaskId = useAppStore((s) => s.setSelectedTaskId);
  const tasks = useAppStore((s) => s.tasks);
  const users = useAppStore((s) => s.users);

  const task = tasks.find((t) => t.id === selectedTaskId);
  const assignee = task ? users.find((u) => u.id === task.assigneeId) : null;

  return (
    <AnimatePresence>
      {task && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTaskId(null)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0d0d14]"
          >
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <h2 className="text-lg font-semibold text-white">{task.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedTaskId(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <p className="text-sm text-zinc-400">{task.description || "No description"}</p>

              <Separator className="my-4 bg-white/5" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Status</span>
                  <Badge variant="secondary" className="capitalize bg-white/5 border-0">
                    {task.status.replace("_", " ")}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Priority</span>
                  <Badge variant="secondary" className="capitalize bg-white/5 border-0">
                    {task.priority}
                  </Badge>
                </div>
                {assignee && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Assignee</span>
                    <span className="text-zinc-300">{assignee.name}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-teal-500/10 text-teal-300 border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4 bg-white/5" />

              <div>
                <h3 className="mb-3 text-sm font-medium text-zinc-300">Attachments</h3>
                {task.attachments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {task.attachments.map((a) => (
                      <div key={a.id} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm">
                        <span className="text-zinc-300">{a.name}</span>
                        <span className="ml-auto text-xs text-zinc-500">{a.size}</span>
                      </div>
                    ))}
                  </div>
                )}
                <FileDropzone taskId={task.id} />
              </div>
            </ScrollArea>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
