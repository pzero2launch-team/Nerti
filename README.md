# Nerti — Financial Intelligence

> See what your money is doing before it moves.

Nerti is a production-grade SaaS platform for predictive financial visibility, built with Next.js and Supabase.

## Features

- **Predictive Visibility**: See scheduled and predicted deductions 24–72 hours in advance.
- **Subscription Tracking**: Monitor all recurring services in one unified dashboard.
- **Insurance Management**: Keep track of premiums and renewal dates for all policies.
- **Real-time Alerts**: Get notified about unusual activity or upcoming payments.
- **Bank Statement Analysis**: Upload PDF/CSV statements to automatically detect recurring commitments.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand (UI state)

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Architecture

```
src/
  app/          — Next.js App Router (pages and layouts)
  components/
    ui/         — Reusable UI components
    layout/     — App layout components
    charts/     — Recharts implementation
  lib/
    supabase/   — Supabase client and server configuration
    actions/    — Server actions for data mutations
  store/        — Zustand stores for client-side UI state
  types/        — TypeScript interfaces
```

## Security

Nerti is built with security as a priority:
- **Read-only**: We do not initiate transactions.
- **End-to-End Encryption**: Data is encrypted at rest and in transit.
- **RLS**: Row Level Security ensures users can only access their own data.

## License

All rights reserved. 2025 Nerti.
