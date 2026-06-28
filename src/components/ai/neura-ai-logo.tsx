import { cn } from "@/lib/utils";

interface NeuraAILogoProps {
  className?: string;
  size?: number;
}

export function NeuraAILogo({ className, size = 24 }: NeuraAILogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <circle cx="16" cy="16" r="8.5" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
      <circle cx="7" cy="11" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="25" cy="11" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="16" cy="26" r="2" fill="currentColor" opacity="0.85" />
      <path
        d="M9 12.5L13.5 14.5M23 12.5L18.5 14.5M16 18.5V24"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
