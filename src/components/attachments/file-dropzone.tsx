"use client";

import { useCallback, useState } from "react";
import { useAppStore } from "@/store/use-app-store";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  taskId: string;
}

export function FileDropzone({ taskId }: FileDropzoneProps) {
  const addAttachment = useAppStore((s) => s.addAttachment);
  const [isDragging, setIsDragging] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<string[]>([]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        const size = file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`;
        addAttachment(taskId, {
          name: file.name,
          size,
          type: file.type.split("/")[1] || "file",
        });
        setPendingFiles((prev) => [...prev, file.name]);
        setTimeout(() => {
          setPendingFiles((prev) => prev.filter((n) => n !== file.name));
        }, 2000);
      });
    },
    [addAttachment, taskId]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all",
        isDragging
          ? "border-teal-500 bg-teal-500/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      )}
    >
      <Upload className={cn("mb-2 h-8 w-8", isDragging ? "text-teal-400" : "text-zinc-500")} />
      <p className="text-sm text-zinc-400">
        Drop files here or{" "}
        <label className="cursor-pointer text-teal-400 hover:text-teal-300">
          browse
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </p>
      <p className="mt-1 text-xs text-zinc-600">PDF, images, documents up to 10MB</p>

      {pendingFiles.length > 0 && (
        <div className="mt-3 w-full space-y-1">
          {pendingFiles.map((name) => (
            <div key={name} className="flex items-center gap-2 rounded bg-teal-500/10 px-2 py-1 text-xs text-teal-300">
              <File className="h-3 w-3" />
              {name}
              <X className="ml-auto h-3 w-3" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
