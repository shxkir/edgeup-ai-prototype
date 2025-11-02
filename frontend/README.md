# EdgeUp AI Frontend

Next.js 14 App Router interface for the EdgeUp AI UPSC preparation platform. Implements chat-based mentoring, knowledge ingestion, adaptive practice, analytics dashboards, and current affairs feeds.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with shadcn/ui primitives
- Axios + TanStack React Query
- Framer Motion animations
- Dark / light theming via `next-themes`

## Getting Started

```bash
# install dependencies
npm install

# copy env and adjust API base URL if needed
cp .env.example .env.local

# run dev server
npm run dev
```

Open http://localhost:3000 to view the app. Ensure the FastAPI + Rust services are running at `NEXT_PUBLIC_API_BASE_URL` (default: http://localhost:8000).

## Project Structure

```
frontend/
  app/              # App Router pages & layout
  components/       # UI, layout, chat, analytics, practice modules
  lib/              # API client, shared types, utilities, mock data
  public/           # Static assets
```

## Available Pages

- `/` – Home, hero, feature highlights, learning path CTA, current affairs feed
- `/ask-upsc` – Chat interface connecting to `/api/ask`
- `/upload-material` – PDF / text ingestion powered by `/api/add_doc`
- `/practice` – MCQ generator + mains answer lab hitting evaluation endpoints
- `/current-affairs` – Digest view wired to `/current_affairs_pull`
- `/dashboard` – Progress cards, activity log, strengths overview

## Scripts

- `npm run dev` – Start Next.js dev server
- `npm run build` – Create production build
- `npm run start` – Serve production build
- `npm run lint` – Run ESLint

## Styling & Components

- Tailwind CSS configured with UPSC-inspired palette (navy, cream, gold)
- shadcn/ui primitives (button, card, tabs, toast, etc.)
- Framer Motion for subtle enter animations
- React Markdown renders mains evaluations with academic typography

## API Integration

All API calls are defined in `lib/api.ts` using Axios. Endpoints expected from the backend:

- `POST /api/ask`
- `POST /api/add_doc`
- `POST /evaluate_mains`
- `POST /evaluate_mcq`
- `POST /current_affairs_pull`

## Linting & Formatting

- ESLint via `eslint-config-next`
- Tailwind Merge utility for class composition

## Deployment

1. Build: `npm run build`
2. Start: `npm run start`
3. Provide `.env.production` with `NEXT_PUBLIC_API_BASE_URL`
