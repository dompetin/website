# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dompetin is an Indonesian investment education platform helping users visualize investment growth versus traditional savings. The app features a risk assessment quiz, investment simulators (guided and DIY), and portfolio recommendations tailored to Indonesian financial products.

## Tech Stack

- **Framework**: Next.js 15.5.4 (App Router with Turbopack)
- **UI Library**: React 19.1.0 with shadcn/ui (New York style)
- **Styling**: Tailwind CSS v4 + tw-animate-css (CSS-first @import approach)
- **State Management**: Zustand 5.0.8
- **Animation**: motion.js 12.23.24 (lazy-loaded via `@/lib/motion`)
- **Charts**: Recharts 2.15.4
- **Validation**: Zod 4.1.12
- **Package Manager**: pnpm

## Commands

```bash
# Development
bun dev           # Start Turbopack dev server on http://localhost:3000

# Build & Production
bun build         # Production build with Turbopack
bun start         # Run production server

# Code Quality
bun lint          # Run ESLint v9
```

## Architecture & Code Organization

### Directory Structure

```
app/
├── (simulation)/          # Route group for simulation features (URL unaffected)
│   ├── simulasi-imbal-hasil/  # Guided portfolio simulation
│   ├── simulasi-portofolio/   # DIY portfolio builder
│   └── components/            # Feature-specific components for simulations
├── survey/                # Risk assessment quiz feature
│   ├── components/        # Quiz UI components
│   ├── constants/         # Questions definitions
│   └── store/             # Zustand quiz-store.ts
├── kupas/                 # Investment education pages
├── pahamin/               # Information pages
├── tentang/               # About page
└── layout.tsx & page.tsx  # Root layout and homepage

components/
├── ui/                    # shadcn/ui components (auto-generated, don't edit)
├── navbar.tsx             # Main navigation
└── [other shared UI]      # Application-wide components

lib/
├── utils.ts               # Utility functions (cn, formatCurrency, generateRowId)
├── motion.tsx             # Motion.js wrapper with LazyMotion provider
├── simulate-investments.ts # Investment projection calculations
└── custom-portfolio.ts    # Portfolio calculation utilities
```

### Path Aliases

All imports use the `@/*` alias mapped to project root in `tsconfig.json`. Never use relative imports:

```tsx
// ✓ Correct
import { Button } from "@/components/ui/button";
import * as m from "@/lib/motion";

// ✗ Incorrect
import { Button } from "../../../components/ui/button";
import * as m from "motion/react";
```

## Key Implementation Patterns

### Motion/Animation (Bundle Size Optimization)

The project uses **motion.js with LazyMotion** to reduce bundle size. Always import from `@/lib/motion`:

```tsx
import * as m from "@/lib/motion";

export function MyComponent() {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <m.h1>Hello</m.h1>
    </m.div>
  );
}
```

The `@/lib/motion` wrapper lazy-loads motion.js features only when needed. **Never import directly from `motion/react`**.

### Currency Formatting (Indonesian Rupiah)

Always use the `formatCurrency` utility from `@/lib/utils`:

```tsx
import { formatCurrency } from "@/lib/utils";

formatCurrency(15000000);           // "Rp15.000.000"
formatCurrency(15000000, "decimal"); // "15.000.000"
```

Key characteristics:
- Uses Indonesian locale (id-ID)
- No decimal places for whole numbers
- Supports styles: "currency" (default), "decimal", "unit", "percent"

### Zustand Store Pattern

State stores are co-located with features (e.g., `app/survey/store/quiz-store.ts`). Pattern:

```tsx
import { create } from "zustand";

type StoreState = {
  // State
  value: string;
  items: string[];

  // Actions
  setValue: (val: string) => void;
  addItem: (item: string) => void;

  // Computed/Getters
  getTotal: () => number;
};

export const useMyStore = create<StoreState>((set, get) => ({
  value: "",
  items: [],

  setValue: (val) => set({ value: val }),
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  getTotal: () => get().items.length,
}));
```

### shadcn/ui Components

Configuration is in `components.json` (New York style, CSS variables, no prefix):

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Use cn() for conditional/merged classNames
<Button className={cn("px-4", isActive && "bg-primary")} />
```

Custom variants use class-variance-authority (CVA). See `components/ui/button.tsx` for examples like the `quiz-toggle` variant.

### Investment Simulation Logic

Core function in `lib/simulate-investments.ts`:

```tsx
import { simulateInvestments } from "@/lib/simulate-investments";

const results = simulateInvestments({
  currentSavings: 10000000,      // Current savings (Rp)
  savingsPerMonth: 500000,       // Monthly contribution (Rp)
  product: "mutual_fund",        // "obligation" | "mixed" | "mutual_fund" | "stocks"
});

// Returns 10-year projection with min/max returns per product
// Product return ranges: obligation (1-2%), mixed (3-5%),
// mutual_fund (5-7%), stocks (7-10%)
// Non-invested assumes 2.5% annual loss (inflation)
```

### Quiz/Survey Flow

1. Questions defined in `app/survey/constants/questions.ts` with scoring metadata
2. State managed by Zustand (`app/survey/store/quiz-store.ts`)
3. Risk profile scoring: numeric 1-10, mapped to categories
   - 1-3: Conservative
   - 4-6: Balanced
   - 7-10: Aggressive
4. Score normalization: `Math.round((sum / maxPossible) * 9) + 1`

### Chart Components

Use Recharts wrapped in shadcn `ChartContainer`:

```tsx
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const chartConfig = {
  value: { label: "Value", color: "hsl(var(--primary))" },
};

export function MyChart({ data }) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis formatter={(v) => `${v / 1e6}jt`} />
        <Line dataKey="value" stroke="var(--color-primary)" />
      </LineChart>
    </ChartContainer>
  );
}
```

### Tailwind CSS v4 CSS-First Approach

The project uses Tailwind v4's new CSS-first design:

```css
/* globals.css uses @import, NOT @tailwind */
@import "tailwindcss";

@theme inline {
  --color-primary: #a267dd;  /* Brand purple */
}

@layer components {
  .card {
    @apply rounded-2xl bg-white p-6 shadow-sm;
  }
}
```

Key styling notes:
- Primary brand color: `#a267dd` (purple)
- Default border radius: `rounded-2xl` for cards/buttons
- Container pattern: `max-w-6xl mx-auto px-6 py-8`
- Dark mode via `.dark` class in CSS
- Use `cn()` utility for dynamic class merging

## Routing

```
/                      → Homepage with hero
/survey                → Risk assessment quiz (determines investment profile)
/simulasi-imbal-hasil  → Guided portfolio simulation based on risk profile
/simulasi-portofolio   → DIY portfolio builder with manual allocation
/kupas/[id]            → Investment education articles
/pahamin               → Information/explanation pages
/tentang               → About Dompetin
```

Route groups like `(simulation)` don't affect URLs but organize related pages.

## Language & Localization

- **UI Text**: Bahasa Indonesia (target: Indonesian Gen Z investors)
- **Code & Comments**: English
- **Currency**: Indonesian Rupiah (IDR) only
- **Domain Terms**:
  - "Dompetin" = wordplay on "dompet" (wallet) = "put in your wallet"
  - Investment products: saham (stocks), reksadana (mutual funds), obligasi (bonds)

## Developer Patterns

### Adding shadcn Components

```bash
npx shadcn@latest add [component-name]
# Pre-configured: New York style, src=components/ui, css=app/globals.css
```

### Custom UI Components

Create custom form inputs in `components/ui/`:
- `mask-input.tsx` - Currency input with formatting
- `field.tsx` - Label + Input + Error wrapper
- `input-group.tsx` - Input with prefix/suffix (e.g., "Rp" label)

### Adding Features

1. Create route in `app/[route-name]/page.tsx`
2. Add feature-specific components in `app/[route-name]/components/`
3. If needing state, create Zustand store in `app/[route-name]/store/`
4. Extract business logic to `lib/` (pure functions)
5. Use `@/` imports throughout

## Important Notes

### Don't...

- Import `motion/react` directly (use `@/lib/motion` wrapper)
- Use Tailwind `@tailwind` directives (Tailwind v4 uses `@import`)
- Format currency without `formatCurrency()` utility
- Assume US financial conventions (use Indonesian products/terms)
- Add UI components outside `components/` directory
- Use relative imports (always use `@/*` aliases)

### ESLint Configuration

The project uses ESLint v9 with Next.js core-web-vitals and TypeScript rules. Ignored paths:
- `node_modules/**`, `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

Run `pnpm lint` to check for issues.

### Component Library Notes

- All UI components from shadcn use CSS variables for theming
- Button variants use CVA for clean, composable styling
- Form components (`mask-input`, `field`, `input-group`) are production-ready
- No component library modifications—extend via custom components in `components/` instead

## Quick Reference: Common Tasks

| Task | Command | Notes |
|------|---------|-------|
| Start dev server | `bun dev` | Turbopack on port 3000 |
| Build for production | `bun build` then `pnpm start` | Optimized Turbopack build |
| Check types & linting | `bun lint` | ESLint v9 rules |
| Add UI component | `bunx shadcn@latest add button` | Auto-configured to project |
| Format currency | `formatCurrency(15000000)` | Returns "Rp15.000.000" |
| Create animated component | Import from `@/lib/motion` | LazyMotion optimized bundle |
| Access quiz state | `useQuizStore()` | See `app/survey/store/quiz-store.ts` |
| Run investment simulation | `simulateInvestments({...})` | Returns 10-year projection array |
