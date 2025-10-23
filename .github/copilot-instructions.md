# Dompetin - AI Coding Agent Instructions

## Project Overview

Indonesian investment education platform helping users visualize investment growth vs. traditional savings. Core features: risk assessment quiz, investment simulators (guided/DIY), and portfolio recommendations.

## Tech Stack & Key Dependencies

- **Framework**: Next.js 15.5.4 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style) + tw-animate-css
- **State**: Zustand for client-side state management
- **Animation**: motion.js (not framer-motion) via lazy-loaded `@/lib/motion`
- **Charts**: Recharts 2.15.4
- **Forms**: Zod v4 for validation
- **Package Manager**: pnpm

## Architecture Patterns

### File Organization

- **Route Groups**: `app/(simulation)/` groups related routes without affecting URL structure
- **Co-located Components**: Feature components in `app/components/`, shared UI in `components/ui/`
- **Business Logic**: Pure functions in `lib/` (e.g., `simulate-investments.ts`)
- **Feature State**: Co-located with features (e.g., `app/survey/store/quiz-store.ts`)

### Routing Structure

```
/ → Homepage with hero
/survey → Risk assessment quiz
/simulasi-imbal-hasil → Guided portfolio simulation
/simulasi-portofolio → DIY portfolio builder
```

### Path Aliases (tsconfig.json)

- `@/*` maps to project root
- Use `@/components/ui/button` not relative imports
- All imports from `@/lib/motion` not `motion/react` directly

## Critical Implementation Patterns

### Motion/Animation

```tsx
// Always import from custom wrapper (lazy-loads domAnimation)
import * as m from "@/lib/motion";

// Usage
<m.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
```

**Why**: Bundle size optimization via lazy loading + consistent API

### Currency Formatting

```tsx
import { formatCurrency } from "@/lib/utils";
formatCurrency(15000000); // "Rp15.000.000"
formatCurrency(15000000, "decimal"); // "15.000.000"
```

**Note**: Indonesian locale (id-ID), no decimal places for whole numbers

### Zustand Store Pattern

```tsx
// See app/survey/store/quiz-store.ts
export const useQuizStore = create<QuizState>((set, get) => ({
  // State
  current: 0,
  answers: {},
  // Actions
  setAnswer: (id, answer) => set((s) => ({ ... })),
  // Computed
  getResult: () => { const numeric = get().getNumericResult(); ... }
}));
```

**Pattern**: Co-locate stores with features, use getters for derived state

### shadcn/ui Components

- Configuration: `components.json` uses New York style, CSS variables, no prefix
- All UI components in `components/ui/` use `cn()` utility for className merging
- Custom variants: See `buttonVariants` in `components/ui/button.tsx` for CVA pattern
- **Custom variant example**: `quiz-toggle` button variant for survey UI

### Investment Simulation Logic

```tsx
// lib/simulate-investments.ts
simulateInvestments({
  currentSavings: number,
  savingsPerMonth: number,
  product: "mixed" | "stocks" | "mutual_fund" | "obligation",
});
```

**Key Logic**:

- Returns 10-year projection with min/max returns per product
- Non-invested assumes 2.5% annual loss (inflation)
- Product return ranges: obligation (1-2%), mixed (3-5%), mutual_fund (5-7%), stocks (7-10%)

## Styling Conventions

### Tailwind v4 CSS-First Approach

```css
/* globals.css uses @import not @tailwind */
@import "tailwindcss";
@theme inline {
  --color-primary: #a267dd;
}
```

### Custom Colors

- Primary: `#a267dd` (purple - brand color)
- Uses oklch color space for better perceptual uniformity
- Dark mode via `.dark` class, defined in globals.css

### Component Styling

- Prefer `rounded-2xl` for cards/buttons (consistent brand feel)
- Container: `max-w-6xl mx-auto px-6 py-8` (see `components/container.tsx`)
- Use `cn()` from `@/lib/utils` for conditional classes

## Developer Workflows

### Development

```bash
pnpm dev           # Turbopack dev server
pnpm build         # Production build with Turbopack
pnpm lint          # ESLint v9
```

### Adding shadcn Components

```bash
npx shadcn@latest add button
# Already configured: New York style, src=components/ui, css=app/globals.css
```

## Common Patterns

### Quiz/Survey Flow

1. Questions defined in `app/survey/constants/questions.ts` with scoring
2. Zustand store (`quiz-store.ts`) manages state + calculates risk profile
3. Result categories: Conservative (1-3), Balanced (4-6), Aggressive (7-10)
4. Score normalization: `Math.round((sum / maxPossible) * 9) + 1`

### Chart Components

- Recharts wrapped in shadcn `ChartContainer` + `ChartConfig`
- Custom tooltip via `ChartTooltipContent`
- Y-axis formatting: Display millions with "jt" suffix
- Example: `app/components/portofolio-chart.tsx`

### Form Inputs

- Custom masked input: `components/ui/mask-input.tsx` for currency
- Field wrapper: `components/ui/field.tsx` groups label + input + error
- Input group: `components/ui/input-group.tsx` for prefix/suffix (e.g., "Rp")

## Important Context

### Language

- UI text in Bahasa Indonesia (target audience: Indonesian Gen Z)
- Code/comments in English
- Currency: Indonesian Rupiah (IDR)

### Domain-Specific Terms

- "Dompetin" = wordplay on "dompet" (wallet) meaning "put in your wallet"
- Investment products match Indonesian market (saham/stocks, reksadana/mutual funds, obligasi/bonds)

## What NOT to Do

- Don't import from `motion/react` directly (use `@/lib/motion`)
- Don't use Tailwind @tailwind directives (v4 uses @import)
- Don't add components outside shadcn conventions
- Don't format currency without `formatCurrency()` utility
- Don't assume US financial conventions (use Indonesian products/terms)
