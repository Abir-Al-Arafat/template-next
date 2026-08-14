# Next.js Architecture Contract

## Rules & Standards

- Architecture: Feature-based & Layered
  - `src/lib/`: Utilities (`utils.ts`), zod env schema (`env.ts`), API helpers (`api.ts`).
  - `src/components/ui/`: Atomic, headless-compatible UI components using `cva` & `cn`.
  - `src/components/shared/`: Shared layout blocks (Header, Footer, Nav).
  - `src/types/`: Central TypeScript definitions.
  - `src/app/`: App router pages, layouts, error/loading boundaries.
- Coding Style:
  - Strict TypeScript; no `any`.
  - Server Components by default; use `'use client'` only where state/event listeners are required.
  - Keep components modular, accessible, and easily readable.
- Output Constraint: Output pure code only without conversational filler.
