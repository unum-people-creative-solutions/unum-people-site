# Design: Unum People V1

## Architecture
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS v4 (CSS-first config in `globals.css`).
- **Components**: Functional components in `src/components/`.

## Component Breakdown

### Layout Components
- `Header`: Glassmorphism effect, modular logo.
- `Footer`: High impact logo, mission statement.
- `Section`: Base wrapper for page sections with standard padding.

### Institutional Site (Home)
- `Hero`: Humanized message, high-end typography.
- `Manifesto`: Clean text section with focused layout.
- `Ecosystem`: Grid of pillars (Sites, Tools, Unum People CRM) with icons/visuals.
- `CRMHighlight`: Feature-focused section with Android app visualization (Unum People CRM).

### Services LP
- `PricingTable`: Comparison grid with 3 tiers.
- `LeadModal`: Mandatory capture form before WhatsApp redirect.
- `WhatsAppCTA`: Wrapper for WhatsApp links with tracking.

## Design Tokens (Tailwind v4)
- **Primary**: `--color-brand-blue` (#3D5D97)
- **Dark**: `--color-brand-dark` (#44516F)
- **Accent**: `--color-brand-accent` (#CCBB9F)
- **Glass**: `backdrop-blur-md bg-white/70`

## Data Structures
- `Package`: Interface for pricing tiers (title, price, activation, features, cta).
