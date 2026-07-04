# Agent Instructions - Nerti Next.js Project

## Project Overview
This project has been migrated from a Vite-based React SPA to a Next.js App Router application. It uses Supabase for Authentication and Database.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Database/Auth**: Supabase
- **Styling**: Tailwind CSS
- **State Management**: Zustand (for UI state) & Supabase (for server state)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Coding Standards
- Use **Server Components** by default. Use `'use client'` only when necessary (interactivity, hooks, Framer Motion, Recharts).
- Follow the App Router directory structure: `app/` for routes, `components/` for reusable components.
- Use **Server Actions** for data mutations.
- Maintain the design system: Deep navy (`#04070f`), Cards (`#0d1628`), Accent (`#3b82f6`).
- Ensure all tables have Row Level Security (RLS) enabled.

## Environment Variables
The following environment variables are required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Schema
Tables:
- `profiles`: User profile information.
- `subscriptions`: Financial subscriptions tracking.
- `insurance_policies`: Insurance policy management.
- `alerts`: User notifications and financial alerts.
- `activity`: Transaction and activity logs.

## Testing
Run `npm run build` to ensure type safety and successful compilation.
