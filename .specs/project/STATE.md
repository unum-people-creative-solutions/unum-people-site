# Unum People Sites - State & Decisions

## Current Status
- **V1 Complete**: Implementation of Institutional Site, Services LP, and Unum People Tools section finished.
- **Testing Infrastructure**: Vitest, RTL, and Playwright configured and operational.
- **CRM Integration**: Lead ingestion API integrated with URL tracking (GCLID/UTMs) and sessionStorage persistence.
- Project docs (TLC-Spec-Driven) initialized and updated.
- Rules from `rules.md` strictly followed.

## Key Decisions
- **Workflow**: Using `tlc-spec-driven` for all changes.
- **Rules**: Adhering to "Unum People - Regras de Engenharia e Segurança".
- **Testing**: Vitest for unit/integration, Playwright for E2E. Accessibility-first queries mandated. Mandatory testing for all features. `user-event` for realistic interactions.
- **Form Management**: **React Hook Form** + **Zod** for validation.
- **Masking**: `react-number-format` for phone masks.
- **Tracking**: GCLID/UTMs captured on layout and persisted in `sessionStorage`.
- **CRM Ingestion**: Data sent to `api.unumpeople.com.br/ingest` via `POST`.
- **LeadModal**: Mandatory before WhatsApp redirect, handles CRM submission. Now includes Email and strict validation.

## Blockers
- None.

## Deferred Ideas
- Tracking of ads (GCLID/FBCLID) - code is ready for integration when ads start.
- Internal traffic metrics dashboard.
