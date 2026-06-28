import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NeuraTask — AI-Powered Productivity",
    template: "%s · NeuraTask",
  },
  description:
    "A modern AI-native workspace combining kanban boards, calendar, team collaboration, and an embedded AI assistant.",
  keywords: ["productivity", "kanban", "AI", "task management", "Next.js", "portfolio"],
  authors: [{ name: "NeuraTask" }],
  openGraph: {
    title: "NeuraTask — AI-Powered Productivity",
    description:
      "Kanban boards, smart calendar, team workspace, and Neura AI — built with Next.js and TypeScript.",
    url: siteUrl,
    siteName: "NeuraTask",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuraTask — AI-Powered Productivity",
    description: "AI-native task management workspace built with Next.js.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full overflow-hidden app-bg">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
