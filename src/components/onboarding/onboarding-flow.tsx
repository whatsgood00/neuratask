"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  Kanban,
} from "lucide-react";

import { NeuraAILogo } from "@/components/ai/neura-ai-logo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

const steps = [
  {
    id: 1,
    title: "Welcome to NeuraTask",
    subtitle: "The AI-native workspace for high-performance teams.",
    icon: Kanban,
    content: "welcome" as const,
  },
  {
    id: 2,
    title: "Shape your workspace",
    subtitle: "Projects, boards, and context — all in one place.",
    icon: LayoutGrid,
    content: "workspace" as const,
  },
  {
    id: 3,
    title: "Meet Neura AI",
    subtitle: "Your copilot for planning, prioritization, and flow.",
    icon: null,
    content: "ai" as const,
  },
  {
    id: 4,
    title: "Build your team",
    subtitle: "Invite collaborators and ship faster together.",
    icon: Users,
    content: "team" as const,
  },
];

const templates = [
  { label: "Product", emoji: "🚀", accent: "from-orange-500/20 to-amber-500/10 border-orange-500/20" },
  { label: "Design", emoji: "🎨", accent: "from-pink-500/20 to-rose-500/10 border-pink-500/20" },
  { label: "Engineering", emoji: "⚡", accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/20" },
];

function renderStepIcon(
  stepContent: (typeof steps)[number]["content"],
  Icon: (typeof steps)[number]["icon"],
  size: "sm" | "lg" = "sm"
) {
  const iconSize = size === "lg" ? 24 : 16;
  if (stepContent === "ai") {
    return <NeuraAILogo size={iconSize} className="text-teal-300" />;
  }
  if (!Icon) return null;
  return <Icon className={size === "lg" ? "h-6 w-6 text-teal-300" : "h-4 w-4"} />;
}

export function OnboardingFlow() {
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState("Acme Workspace");
  const [selectedTemplate, setSelectedTemplate] = useState("Product");
  const [teamEmails, setTeamEmails] = useState("");

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="app-bg relative flex min-h-screen">
      <div className="pointer-events-none absolute inset-0 app-grid opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-teal-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-sky-600/15 blur-[120px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col lg:flex-row lg:gap-16 lg:p-10">
        {/* Left panel — branding & progress */}
        <div className="flex flex-col justify-between px-6 py-10 lg:w-[340px] lg:shrink-0 lg:px-0 lg:py-12">
          <div>
            <div className="mb-10">
              <p className="text-xl font-semibold tracking-tight text-white">NeuraTask</p>
              <p className="mt-1 text-xs text-zinc-500">AI productivity OS</p>
            </div>

            <div className="mb-8 hidden lg:block">
              <p className="mb-2 text-xs font-medium tracking-widest text-zinc-500 uppercase">Setup progress</p>
              <div className="h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-600">
                Step {step + 1} of {steps.length}
              </p>
            </div>

            <nav className="hidden space-y-1 lg:block">
              {steps.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <div
                    key={s.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all",
                      active && "bg-white/[0.06] ring-1 ring-white/10",
                      !active && !done && "opacity-40"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                        done && "bg-emerald-500/20 text-emerald-400",
                        active && !done && "bg-teal-500/20 text-teal-300",
                        !active && !done && "bg-white/5 text-zinc-500"
                      )}
                    >
                      {done ? <Check className="h-4 w-4" /> : renderStepIcon(s.content, s.icon)}
                    </div>
                    <div className="min-w-0">
                      <p className={cn("truncate text-sm font-medium", active ? "text-white" : "text-zinc-400")}>
                        {s.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          <p className="mt-8 hidden text-xs leading-relaxed text-zinc-600 lg:block">
            Trusted by product teams who want Notion-level docs, Trello-level boards, and AI that actually helps.
          </p>
        </div>

        {/* Right panel — step content */}
        <div className="flex flex-1 items-center px-4 pb-10 lg:px-0 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel w-full rounded-2xl p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-6 flex justify-center gap-1.5 lg:hidden">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    i <= step ? "w-6 bg-teal-500" : "w-3 bg-white/10"
                  )}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-8">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/20 to-sky-500/20 ring-1 ring-teal-500/30">
                    {renderStepIcon(current.content, current.icon, "lg")}
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{current.title}</h1>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{current.subtitle}</p>
                </div>

                {current.content === "welcome" && (
                  <div className="space-y-6">
                    <p className="text-sm leading-relaxed text-zinc-400">
                      NeuraTask unifies tasks, docs, calendar, and an embedded AI assistant — so your team stays in flow without context switching.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { type: "icon" as const, icon: Kanban, label: "Kanban boards", desc: "Drag, drop, ship" },
                        { type: "ai" as const, label: "Neura AI", desc: "Smart automation" },
                        { type: "icon" as const, icon: Zap, label: "Real-time", desc: "Team sync" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition-colors hover:border-teal-500/30 hover:bg-teal-500/5"
                        >
                          {item.type === "ai" ? (
                            <NeuraAILogo size={20} className="mb-3 text-teal-400" />
                          ) : (
                            <item.icon className="mb-3 h-5 w-5 text-teal-400" />
                          )}
                          <p className="text-sm font-medium text-zinc-200">{item.label}</p>
                          <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {current.content === "workspace" && (
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500 uppercase">
                        Workspace name
                      </label>
                      <Input
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className="h-11 border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:ring-teal-500/40"
                        placeholder="e.g. Acme Product Team"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500 uppercase">
                        Start from template
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {templates.map((t) => (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => setSelectedTemplate(t.label)}
                            className={cn(
                              "rounded-xl border bg-gradient-to-br p-4 text-left transition-all",
                              t.accent,
                              selectedTemplate === t.label
                                ? "ring-2 ring-teal-500/60 ring-offset-2 ring-offset-[#0a0a0f]"
                                : "opacity-70 hover:opacity-100"
                            )}
                          >
                            <span className="text-xl">{t.emoji}</span>
                            <p className="mt-2 text-sm font-medium text-zinc-200">{t.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {current.content === "ai" && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-sky-500/5 p-5">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/25 text-teal-300">
                          <NeuraAILogo size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">Neura AI</p>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                            Hey! I can suggest tasks, summarize your day, reprioritize deadlines, and answer questions about your workspace — just ask.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        "AI task suggestions",
                        "Daily productivity digest",
                        "Natural language search",
                        "Smart deadline planning",
                      ].map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
                        >
                          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {current.content === "team" && (
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500 uppercase">
                        Invite teammates (optional)
                      </label>
                      <Input
                        value={teamEmails}
                        onChange={(e) => setTeamEmails(e.target.value)}
                        placeholder="alex@company.com, maria@company.com"
                        className="h-11 border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <p className="mb-4 text-xs font-medium tracking-wide text-zinc-500 uppercase">Preview</p>
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {["EB", "AC", "MK", "JW"].map((avatar) => (
                            <div
                              key={avatar}
                              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#12121a] bg-gradient-to-br from-teal-500 to-sky-600 text-[10px] font-semibold text-white"
                            >
                              {avatar}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-zinc-400">4 members · 3 online</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between border-t border-white/[0.06] pt-6">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back
              </Button>
              <div className="flex gap-2">
                {!isLast && (
                  <Button
                    variant="ghost"
                    onClick={completeOnboarding}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    Skip setup
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-teal-500 to-sky-600 px-5 shadow-lg shadow-teal-500/25 hover:from-teal-400 hover:to-sky-500"
                >
                  {isLast ? "Launch workspace" : "Continue"}
                  {!isLast && <ArrowRight className="ml-1.5 h-4 w-4" />}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
