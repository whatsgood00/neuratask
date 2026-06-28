# NeuraTask

AI-native productivity workspace — a portfolio project combining **Notion-style organization**, **Trello-style kanban boards**, and an **embedded AI assistant**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

**[Live Demo](https://neuratask.vercel.app)**

---

## Overview

NeuraTask is a full-featured productivity web app built as a frontend portfolio piece. It demonstrates modern React patterns, polished UI/UX, client-side state management, drag-and-drop interactions, and a cohesive design system — all without a backend (mock data + local persistence).

### Highlights

- **Kanban board** with drag & drop (`@dnd-kit`)
- **Neura AI** — floating chat assistant with contextual mock responses
- **Smart calendar**, activity feed, and productivity dashboard
- **Command palette** (`⌘K`) for quick navigation
- **Multi-step onboarding** flow
- **Team collaboration UI** — avatars, roles, presence
- **File attachment UI** with drag & drop
- **Dark theme** with teal/sky accent palette

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui |
| State | Zustand (persist → localStorage) |
| Animations | Framer Motion |
| DnD | @dnd-kit |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
git clone https://github.com/YOUR_USERNAME/neuratask.git
cd neuratask
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Routes

| Path | View |
|------|------|
| `/` | Kanban board |
| `/dashboard` | Productivity dashboard |
| `/calendar` | Calendar |
| `/activity` | Activity feed |

## Deploy on Vercel

The fastest way to deploy:

1. Push this repo to GitHub
2. Import the project on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — no extra config needed
4. Click **Deploy**

Optional: set `NEXT_PUBLIC_SITE_URL` to your production URL for correct Open Graph metadata.

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

## Project Structure

```
src/
├── app/              # Next.js App Router (routes + layout)
├── components/       # UI components (kanban, ai, layout, …)
├── hooks/            # Custom React hooks
├── lib/              # Utilities, mock data, route helpers
├── store/            # Zustand global store
└── types/            # Shared TypeScript types
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run dev:clean` | Clear `.next` cache and start dev |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Notes

- Data is stored in the browser (`localStorage`). Clear site data to reset onboarding and tasks.
- AI responses are mock/simulated — no API keys required for deployment.
- Built for portfolio demonstration purposes.

## License

MIT
