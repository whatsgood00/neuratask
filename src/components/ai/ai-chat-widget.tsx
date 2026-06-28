"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";
import { aiResponses } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { NeuraAILogo } from "@/components/ai/neura-ai-logo";
import { Maximize2, Minimize2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AIChatWidget() {
  const aiChatOpen = useAppStore((s) => s.aiChatOpen);
  const setAiChatOpen = useAppStore((s) => s.setAiChatOpen);
  const aiChatExpanded = useAppStore((s) => s.aiChatExpanded);
  const setAiChatExpanded = useAppStore((s) => s.setAiChatExpanded);
  const chatMessages = useAppStore((s) => s.chatMessages);
  const addChatMessage = useAppStore((s) => s.addChatMessage);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const getAiResponse = (message: string): string => {
    const lower = message.toLowerCase();
    if (lower.includes("summary") || lower.includes("report") || lower.includes("daily")) {
      return aiResponses.summary;
    }
    if (lower.includes("task") || lower.includes("suggest") || lower.includes("recommend")) {
      return aiResponses.tasks;
    }
    if (lower.includes("find") || lower.includes("search") || lower.includes("look")) {
      return aiResponses.search;
    }
    return aiResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    addChatMessage({ role: "user", content: userMessage });
    setIsTyping(true);

    setTimeout(() => {
      addChatMessage({ role: "assistant", content: getAiResponse(userMessage) });
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      <AnimatePresence>
        {!aiChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAiChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-sky-600 text-white shadow-lg shadow-teal-500/30"
          >
            <NeuraAILogo size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl shadow-teal-500/10 ${
              aiChatExpanded
                ? "inset-4"
                : "bottom-6 right-6 h-[520px] w-[400px]"
            }`}
          >
            <div className="flex items-center gap-3 border-b border-white/5 bg-gradient-to-r from-teal-500/10 to-sky-500/10 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-sky-600 text-white">
                <NeuraAILogo size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Neura AI</p>
                <p className="text-[10px] text-zinc-500">Your productivity assistant</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setAiChatExpanded(!aiChatExpanded)}>
                {aiChatExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setAiChatOpen(false)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-teal-500 text-white"
                          : "bg-white/5 text-zinc-300"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-2xl bg-white/5 px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <div className="border-t border-white/5 p-3">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI anything..."
                  className="border-white/5 bg-white/5 text-sm"
                />
                <Button type="submit" size="icon" className="shrink-0 bg-teal-500 hover:bg-teal-600">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
