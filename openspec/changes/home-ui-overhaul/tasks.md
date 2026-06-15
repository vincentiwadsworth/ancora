# Tasks: Home UI Overhaul

> Strategy: 2 batches (P0, P1), each independently shippable as a separate PR.
> Per `work-unit-commits`: one task = one atomic commit with conventional-commits message.
> Per `chained-pr`: PRs are sequential, merge in order, each independently reviewable.

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~450–550 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Batch 1 P0) → PR 2 (Batch 2 P1) |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

> **Cross-batch dependency resolved**: ComparisonVisual (P0) uses `accent-500` for
> coverage dots, but accent tokens were originally in P1. Per the design's rule
> ("token-level changes land first"), task 1.1 pulls accent tokens into Batch 1 so
> both PRs are self-contained. The `--spacing-section-y-lg` rhythm token stays in
> Batch 2 (no P0 consumer).

### Suggested Work Units

| Unit | Goal | PR | Notes |
|------|------|----|-------|
| 1 | Accent tokens + comparison component + hero visual | PR 1 | Base: feature/home-ui-overhaul |
| 2 | Display font + rhythm scale + eyebrow/pain cleanup + contrast | PR 2 | Base: PR 1 branch; merges to feature after PR 1 |

## Batch 1 — P0: Comparison Visual + Hero Anchor

- [x] 1.1 Add accent color tokens to global.css
- **Files**: `src/styles/global.css`
- **Satisfies**: REQ-SITE-FDN-002, REQ-SITE-FDN-023 (partial)
- Add `--color-accent-500: #c69034` and `--color-accent-600: #9c6e1f` to the `@theme` block, after the surface tokens.
- **Acceptance**: `bg-accent-500`, `text-accent-600`, `border-accent-500` utilities generate in build output.
- **Est**: ~6 lines.

- [x] 1.2 Create ComparisonVisual.astro
- **Files**: `src/components/ComparisonVisual.astro` (new)
- **Satisfies**: REQ-HOME-004, REQ-SITE-FDN-015
- Three phase cards (Fase 1 Captación / Fase 2 Administración / Fase 3 Renovación & Cierre). Each card lists 3 services with two coverage tracks: "Inmobiliaria tradicional" and "ANCORA." Filled dot in accent-500 = covered; hollow neutral-300 dot = not covered. Fase 1 shows both tracks filled; Fases 2–3 show traditional track empty while ANCORA stays filled. Stacked phase cards on `<sm` (375px, no horizontal scroll); 3-column grid at `≥md`. Accepts `phases: ComparisonPhase[]` prop per design interface.
- **Acceptance**: No horizontal scroll at 375px; all 9 services visible stacked; coverage story "they stop, we don't" is visually clear.
- **Est**: ~90 lines.

- [x] 1.3 Add hero visual anchor to index.astro
- **Files**: `src/pages/index.astro`
- **Satisfies**: REQ-HOME-001
- Restructure hero from single-column `max-w-3xl` to two-column desktop layout (text left, visual right; single-column mobile). Add inline SVG cross-pattern grid extending the logo mark geometry (`M16 16 L48 48 M48 16 L16 48`) — grid of cross marks at varying sizes/opacities in primary-600 + accent-500, positioned absolute-right, clipped at container edge. `aria-hidden="true"`. On mobile the pattern degrades to one large cross at low opacity behind text.
- **Acceptance**: Hero has non-flat visual anchor at `≥md`; mobile shows subtle cross behind text; zero client JS added; `npm run build` confirms 0KB JS.
- **Est**: ~40 added, ~5 removed.

- [x] 1.4 Replace table with ComparisonVisual in index.astro
- **Files**: `src/pages/index.astro`
- **Satisfies**: REQ-HOME-004
- Remove the `overflow-x-auto` + `<table class="min-w-160">` block (~60 lines). Import `ComparisonVisual` and render `<ComparisonVisual phases={phases} />` passing the existing 9-service coverage data inline. Keep the explanatory footer sentence.
- **Acceptance**: No `<table>` element in differentiation section; no `min-w-160` or `overflow-x-auto`; footer sentence "Muchas inmobiliarias terminan…" present.
- **Est**: ~15 added, ~65 removed.

**Batch 1 total**: ~155 added, ~70 removed = ~225 changed lines.

## Batch 2 — P1: Typography + Rhythm + Cleanup + Contrast

### 2.1 Add Plus Jakarta Sans font + display token
- **Files**: `package.json`, `src/styles/global.css`
- **Satisfies**: REQ-SITE-FDN-019
- Add `"@fontsource/plus-jakarta-sans": "5.x"` to `dependencies`. Add `@import "@fontsource/plus-jakarta-sans/600.css"` and `700.css` to global.css top. Change `--font-display` from `"Inter"` to `"Plus Jakarta Sans", system-ui, sans-serif`.
- **Acceptance**: `npm install` succeeds; `font-display` utility resolves to Plus Jakarta Sans in build CSS.
- **Est**: ~6 lines.

### 2.2 Add section rhythm spacing token
- **Files**: `src/styles/global.css`
- **Satisfies**: REQ-SITE-FDN-021
- Add `--spacing-section-y-lg: 7rem` to `@theme` after `--spacing-section-y-sm`.
- **Acceptance**: Token resolves; usable via `py-[var(--spacing-section-y-lg)]`.
- **Est**: ~2 lines.

### 2.3 Update Section.astro: rhythm prop + remove eyebrow rendering
- **Files**: `src/components/Section.astro`
- **Satisfies**: REQ-SITE-FDN-021, REQ-SITE-FDN-015
- Add `padding?: 'compact' | 'default' | 'spacious'` prop (default `'default'`). Map: compact → `py-[var(--spacing-section-y-sm)]`, default → `py-[var(--spacing-section-y)]`, spacious → `py-[var(--spacing-section-y-lg)]`. Remove the `eyebrow` prop and its `<span>` rendering block entirely.
- **Acceptance**: `<Section padding="spacious">` applies 7rem padding; no eyebrow markup in rendered output; `astro check` passes.
- **Est**: ~15 added, ~12 removed.

### 2.4 Migrate pain data: number → icon
- **Files**: `src/data/pains.ts`, `astro.config.mjs`
- **Satisfies**: REQ-SITE-FDN-018, REQ-HOME-003
- Change `Pain` interface: `number: number` → `icon: string`. Update all 5 entries: Vacancia → `door-front`, Mora → `payments`, Mantenimiento → `handyman`, Riesgo legal → `gavel`, Entrega → `assignment-return`. Add these 5 icon names to the `material-symbols` include array in `astro.config.mjs`.
- **Acceptance**: `astro check` passes with no stale `.number` references; icons resolve at build.
- **Est**: ~13 added, ~8 removed.

### 2.5 Update PainCard.astro: icon replaces number
- **Files**: `src/components/PainCard.astro`
- **Satisfies**: REQ-HOME-003, REQ-SITE-FDN-015
- Import `Icon` from `astro-icon/components`. Replace the big `01`-`05` numeral block with `<Icon name={`material-symbols:${pain.icon}`} class="text-2xl text-accent-500" aria-hidden="true" />`. Remove `pain.number` reference.
- **Acceptance**: Five pain cards render material-symbols icons in accent-500; no sequential numbers visible.
- **Est**: ~8 added, ~4 removed.

### 2.6 Update index.astro: remove eyebrows, apply rhythm, switch headings to font-display
- **Files**: `src/pages/index.astro`
- **Satisfies**: REQ-HOME-001, REQ-SITE-FDN-019, REQ-SITE-FDN-021
- Remove all `eyebrow=` props from `<Section>` instances. Fold "Nuestro compromiso" into the pilares `intro`. Change dolores heading from `heading="Los cinco dolores…"` with eyebrow "¿Te suena familiar?" to heading="¿Te suena familiar? Los cinco dolores del propietario". Replace hero `containerClass="!py-[var(--spacing-section-y-sm)]"` with `padding="compact"`. Add `padding="spacious"` to contacto-cta. Switch H1 and all H2 `class` from `font-bold`/`font-semibold` to include `font-display`.
- **Acceptance**: No `eyebrow` prop on any `<Section>`; hero H1 uses `font-display`; CTA section has spacious (7rem) padding; `astro check` passes.
- **Est**: ~15 added, ~12 removed.

### 2.7 Validate accent contrast (REQ-SITE-FDN-023)
- **Files**: none (verification — document in commit body)
- **Satisfies**: REQ-SITE-FDN-023
- Calculate contrast ratios: accent-600 `#9c6e1f` on surface `#fafaf7` (must be ≥4.5:1 for normal text); accent-500 `#c69034` on primary-600 `#0f1e36` (must be ≥3:1 for large text / UI). If accent-600 falls below 4.5:1, darken to `#8a5d0b`, update token, and rebuild.
- **Acceptance**: All accent-to-surface and accent-on-primary combinations pass WCAG AA; ratios documented in the commit message.
- **Est**: 0 lines (or ~2 if token adjusted).

**Batch 2 total**: ~59 added, ~36 removed = ~95 changed lines.

## Implementation Order

1. **Task 1.1** (accent tokens) — prerequisite; ComparisonVisual + hero consume accent-500.
2. **Tasks 1.2 → 1.3 → 1.4** (Batch 1) — new component, hero visual, table swap. Ship as PR 1.
3. **Tasks 2.1 → 2.2 → 2.3** (Batch 2 foundation) — font, spacing token, Section refactor.
4. **Tasks 2.4 → 2.5** (Batch 2 pain migration) — interface change + card + icon config, atomic.
5. **Task 2.6** (Batch 2 page wiring) — depends on 2.3 (Section props) and 2.4 (pain shape).
6. **Task 2.7** (contrast validation) — gate before merge; run after all tokens consumed.

Batches are independently revertible — no shared migration, no data, no irreversible step.

## Commit Strategy

| Batch | Commits | Message prefixes |
|-------|---------|-----------------|
| 1 | 4 | `feat(tokens): add accent color scale` / `feat: add ComparisonVisual component` / `feat: add hero visual anchor` / `refactor: replace comparison table with ComparisonVisual` |
| 2 | 7 | `feat: add Plus Jakarta Sans display font` / `feat(tokens): add section rhythm scale` / `refactor(section): add padding prop, remove eyebrow` / `refactor: migrate pain data to icon field` / `refactor: render pain icons instead of numbers` / `refactor(home): apply rhythm, font-display, remove eyebrows` / `fix: validate accent contrast at AA` |

**Total: 11 atomic commits across 2 batches.**
