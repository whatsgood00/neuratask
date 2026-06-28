"use client";

import { aiSuggestedTasks } from "@/lib/mock-data";
import { useAppStore } from "@/store/use-app-store";
import { NeuraAILogo } from "@/components/ai/neura-ai-logo";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function AISuggestions() {
  const acceptAiSuggestion = useAppStore((s) => s.acceptAiSuggestion);
  const [accepted, setAccepted] = useState<Set<number>>(new Set());

  const handleAccept = (index: number) => {
    const suggestion = aiSuggestedTasks[index];
    acceptAiSuggestion(suggestion.title, suggestion.priority, suggestion.tags);
    setAccepted((prev) => new Set(prev).add(index));
  };

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="mb-3 flex items-center gap-2">
        <NeuraAILogo size={16} className="text-teal-400" />
        <h3 className="text-sm font-medium text-zinc-300">AI Suggestions</h3>
      </div>
      <div className="space-y-2">
        {aiSuggestedTasks.map((suggestion, i) => (
          <div
            key={suggestion.title}
            className="flex items-start gap-2 rounded-lg bg-white/[0.03] p-2.5 transition-colors hover:bg-white/[0.06]"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-zinc-300">{suggestion.title}</p>
              <div className="mt-1 flex gap-1">
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500">
                  {suggestion.priority}
                </span>
                {suggestion.tags.map((tag) => (
                  <span key={tag} className="rounded bg-teal-500/10 px-1.5 py-0.5 text-[10px] text-teal-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              disabled={accepted.has(i)}
              onClick={() => handleAccept(i)}
            >
              {accepted.has(i) ? (
                <Check className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Plus className="h-3.5 w-3.5 text-teal-400" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
