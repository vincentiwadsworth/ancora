# Proposal: Home UI Overhaul

## Intent

The ANCORA home page reads as a default template: a raw HTML comparison table with hidden mobile horizontal scroll (`min-w-160`), a text-only hero on a flat `#fafaf7` background, a single typeface (Inter) for both display and body, and a neutral palette with no accent. These are saturated "AI-generated 2023" tells that undermine a premium rental-management brand. This change elevates the home to a deliberate, professional standard while preserving all existing content and WhatsApp behavior.

## Scope

### In Scope
- Replace the "Alquilar vs Administrar" table with a visual comparison (coverage cards / phase timeline)
- Add a visual anchor (image / illustration / pattern) to the hero
- Introduce a display typeface + an accent color (token-level)
- Vary section vertical rhythm; remove decorative eyebrows and sequential `01–05` pain numbers
- (Batch 3) surface-contrast bump, scroll-reveal, fix CTA `!important` overrides, diversify card patterns

### Out of Scope
- Copy/content changes; new pages (services/about/contact untouched); backend/WhatsApp logic; SEO restructuring
- Adopting the new typeface/accent on non-home pages (follow-up change)

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `home-page`: REQ-HOME-001 (hero gains a visual anchor — additive); REQ-HOME-003 (pain cards drop decorative sequential numbers → icon/label); REQ-HOME-004 (table → visual comparison; scenarios referencing "table" / "three columns" / "✓/✗" are rewritten)
- `site-foundation`: REQ-SITE-FDN-002 (add accent color token family); REQ-SITE-FDN-019 (add `--font-family-display` token); REQ-SITE-FDN-021 (relax "identical padding" → intentional rhythm scale); REQ-SITE-FDN-023 (validate accent at AA)

## Approach

Three concentric, independently shippable batches:
1. **P0** — Rebuild comparison as a visual component + add hero visual anchor.
2. **P1** — Add display typeface + accent color as tokens; vary rhythm; strip eyebrows and sequential numbers.
3. **P2** — Surface-contrast bump, scroll-reveal (respect `prefers-reduced-motion`, REQ-SITE-FDN-011), dark CTA variant, card diversification.

Typeface and accent are chosen at design phase (options: Plus Jakarta Sans / Cabinet Grotesk / serif; terracotta / amber / warm gold / deep green).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/index.astro` | Modified | Hero, comparison, eyebrows, rhythm |
| `src/components/PainCard.astro` | Modified | Sequential number → icon/label |
| `src/components/SegmentedCta.astro` | Modified | Proper on-dark variant (drop `!important`) |
| `src/components/Section.astro` | Modified | Rhythm scale prop |
| `src/styles/global.css` | Modified | Display font + accent token, contrast |
| `src/components/ComparisonVisual.astro` | New | Replaces the table |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Type/accent are global tokens | Med | Define globally; consume on home first; gate other pages to a follow-up change |
| Accent fails AA contrast | Low | Validate per REQ-SITE-FDN-023 before build |
| Rhythm change conflicts REQ-SITE-FDN-021 | Med | Update spec to allow a discrete rhythm scale |

## Rollback Plan

Each batch is a separate commit/PR on a feature branch. Revert any batch independently — no shared migration, no data, no irreversible step.

## Dependencies

None external. Self-hosted fonts; preserves Astro's zero-client-JS default.

## Success Criteria

- [ ] Comparison is a visual component; no horizontal scroll at 375px
- [ ] Hero has a non-flat visual anchor
- [ ] Two typefaces + one accent token consumed on home
- [ ] All new color combinations pass WCAG AA (4.5:1 normal / 3:1 large)
- [ ] `npm run build` ships 0KB client JS

## Proposal question round (design-phase open items)
- Accent direction (warm terracotta/amber/gold vs. cool deep green) — brand call.
- Display typeface character (geometric vs. humanist vs. serif) — brand call.
- Hero visual source: stock photo, custom illustration, or CSS pattern overlay?
