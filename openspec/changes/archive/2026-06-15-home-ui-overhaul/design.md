# Design: Home UI Overhaul

## Technical Approach

Seven design decisions resolving the proposal's three open questions (accent, typeface, hero visual) plus four structural improvements (comparison, rhythm, eyebrows, pain numbers). Token-level changes land first since components consume them. All decisions preserve Astro's 0KB client-JS default — the hero pattern is inline SVG, not an image asset.

## Architecture Decisions

### Accent: warm muted gold

| Option | Tradeoff | Verdict |
|---|---|---|
| Gold `#c69034` / `#9c6e1f` | Navy+gold = canonical trust+premium pair; warm counterpoint to cold navy | **Choose** |
| Terracotta `#c0563b` | Warm but clashes with navy's cool tone | Reject |
| Deep green `#2d6a4f` | Reads eco/sustainability, not property investment | Reject |
| Tailwind amber `#d97706` | Too orange, signals warning not value | Reject |

**Tokens** — two-stop scale so the accent is usable for both fills and text:

| Token | Hex | Use on | AA constraint |
|---|---|---|---|
| `--color-accent-500` | `#c69034` | fills, borders, ≥24px text, icons, hero pattern | Large/UI (3:1) |
| `--color-accent-600` | `#9c6e1f` | links, accent body text, small text on white/surface | Normal text (est. ~4.8:1) |

Both values are estimates; **final contrast pass required at build time** (REQ-SITE-FDN-023).

### Display typeface: Plus Jakarta Sans

| Option | Tradeoff | Verdict |
|---|---|---|
| Plus Jakarta Sans | Google Font → `@fontsource` self-host (matches Inter pattern); geometric, characterful, pairs cleanly with Inter's humanist neutrality | **Choose** |
| Cabinet Grotesk | Strong personality but Fontshare-only — new provider dependency | Reject |
| Satoshi | Clean but Fontshare-only | Reject |
| DM Serif Display | Too editorial/fashion for property management | Reject |

**Type scale**:

| Element | Face | Weight | sm → lg |
|---|---|---|---|
| h1 | Plus Jakarta Sans | 700 | 2.5rem → 3.5rem |
| h2 | Plus Jakarta Sans | 700 | 2rem → 2.5rem |
| h3 | Plus Jakarta Sans | 600 | 1.375rem → 1.5rem |
| intro | Inter | 400 | 1.125rem → 1.25rem |
| body | Inter | 400 | 1rem |

`--font-display` in `global.css` changes from `"Inter"` to `"Plus Jakarta Sans"`. Imported via `@fontsource/plus-jakarta-sans` (weights 600, 700). H1-h3 switch from `font-sans` to `font-display`.

### Hero visual: SVG cross-pattern from logo geometry

| Option | Tradeoff | Verdict |
|---|---|---|
| SVG cross pattern | Zero assets, zero JS, on-brand (extends logo's diagonal-X mark) | **Choose** |
| Stock photography | Licensing cost, art-direction overhead, Bolivia-specific sourcing | Reject |
| Custom illustration | Asset dependency, illustrator needed | Reject |
| Gradient overlay | Generic, the exact "AI template" look we're removing | Reject |

The logo mark is two diagonal strokes (`M16 16 L48 48 M48 16 L16 48`). The hero extends this into a decorative pattern: a grid of cross marks at varying sizes/opacities in navy + accent-500, positioned absolute-right, clipped at container edge. Hero shifts from single-column `max-w-3xl` to two-column desktop (text left, visual right), single-column mobile (pattern degrades to one large cross at low opacity behind text). `aria-hidden="true"`.

### Comparison: phase coverage cards

| Option | Tradeoff | Verdict |
|---|---|---|
| Phase coverage cards | Shows drop-off viscerally; stacks cleanly on mobile | **Choose** |
| Stacked bar comparison | Abstract — hides individual services | Reject |
| Single 3×9 grid | Mobile unfriendly; same scroll problem as the table | Reject |

Three phase cards (Fase 1 / 2 / 3). Each lists its 3 services with two coverage tracks: "Inmobiliaria tradicional" and "ANCORA." Fase 1 shows both tracks filled. Fases 2-3 show the traditional track greyed/empty while ANCORA stays filled — the visual story is "they stop, we don't."

Coverage indicator: filled dot in accent-500 = covered; hollow neutral-300 dot = not covered.

| Breakpoint | Layout |
|---|---|
| <sm (375px) | Stacked phase cards — no horizontal scroll |
| ≥md | 3-column grid side by side |

### Section rhythm: three-stop scale

| Token | Value | Applied to |
|---|---|---|
| `--spacing-section-y-sm` | 3rem | Hero (tight top) |
| `--spacing-section-y` | 5rem | Pilares, dolores, diferenciación, testimonios |
| `--spacing-section-y-lg` | 7rem | CTA (breathing room before conversion) |

`Section.astro` gains `rhythm?: 'sm' | 'default' | 'lg'`.

### Eyebrow removal

**Choice**: Remove eyebrow entirely. Fold context into heading or intro.
**Rationale**: Display typeface gives headings enough presence; eyebrows are a template tell. "Nuestro compromiso" → fold into intro. "¿Te suena familiar?" → becomes the heading itself.

### Pain number → topic icon

**Choice**: Replace `number` field with `icon` (material-symbols name). Sequential numbers imply a countdown, not pain categories. Icons communicate topic at a glance.

| Pain | Icon |
|---|---|
| Vacancia | `door-front` |
| Mora | `payments` |
| Mantenimiento | `handyman` |
| Riesgo legal | `gavel` |
| Entrega | `assignment-return` |

All five confirmed present in `@iconify-json/material-symbols`. Card renders `<Icon>` in accent-500 at 2rem, replacing the big `01`-`05` numeral.

## Data Flow

```
global.css ──tokens──→ Section.astro (rhythm, no eyebrow)
       │           ──→ PainCard.astro (icon in accent)
       │           ──→ ComparisonVisual.astro (NEW)
       └──→ index.astro (two-col hero + SVG pattern)
pains.ts (number→icon) ──→ PainCard + index
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/styles/global.css` | Modify | Accent-500/600 tokens; `--font-display: "Plus Jakarta Sans"`; `--spacing-section-y-lg`; Plus Jakarta CSS imports |
| `src/components/Section.astro` | Modify | `rhythm` prop; remove eyebrow rendering |
| `src/components/PainCard.astro` | Modify | `number` → `icon`; render `<Icon>` in accent |
| `src/components/ComparisonVisual.astro` | Create | Phase coverage cards, responsive |
| `src/pages/index.astro` | Modify | Two-column hero + SVG; swap table → ComparisonVisual; drop eyebrows; add rhythm |
| `src/data/pains.ts` | Modify | `number` → `icon` per pain |
| `astro.config.mjs` | Modify | Add `door-front`, `payments`, `handyman`, `gavel`, `assignment-return` to include |
| `package.json` | Modify | Add `@fontsource/plus-jakarta-sans` |

## Interfaces / Contracts

```ts
// src/data/pains.ts — modified
export interface Pain {
  icon: string;   // was: number: number
  title: string;
  description: string;
}
```

```ts
// ComparisonVisual.astro — new
interface ComparisonPhase {
  label: string;   // "Fase 1 — Captación"
  services: { name: string; traditional: boolean; ancora: boolean }[];
}
interface Props { phases: ComparisonPhase[]; }
```

## Testing Strategy

| Layer | What | Approach |
|---|---|---|
| Visual | Comparison at 375px width | No horizontal scroll; all 9 services visible stacked |
| A11y | Accent contrast | accent-600 on surface ≥4.5:1; accent-500 on navy ≥3:1 |
| Build | Zero client JS | `astro build` confirms 0KB JS (pattern is inline SVG) |
| Type | Pain interface migration | `astro check` catches stale `pain.number` refs |

## Migration

No data migration. `pains.ts` `number`→`icon` is a breaking interface change consumed only by `PainCard.astro` and `index.astro` — both updated in the same batch (P1).

## Open Questions

- Exact accent hex values (`#c69034` / `#9c6e1f`) are designer estimates — validate at build time against WCAG AA before locking (REQ-SITE-FDN-023). If accent-600 falls below 4.5:1, darken to `#8a5d0b`.
