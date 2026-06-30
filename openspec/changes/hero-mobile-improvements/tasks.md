# Tasks: Hero Mobile Improvements

> Per `work-unit-commits`: one task = one atomic commit with conventional-commits message.

## Review Workload Forecast

| PR | Tasks | Est. Lines | Under 500? | Risk |
|---|---|---|---|---|
| 1 — Hero Mobile Improvements | 3 | ~80 | Yes | Low |

**Total authored lines**: ~80.

Decision needed before apply: No
Chained PRs recommended: No
400-line budget risk: Low

## PR 1 — Hero Mobile Improvements

### 1.1 Adjust Hero text scale, paddings, and move TrustStrip
- **Deliverable**: Modify [index.astro](file:///c:/Users/nicol/Documents/GitHub/webs_curros/ancora-site-build/src/pages/index.astro) to use `text-4xl leading-tight` for H1 on mobile, change container padding to `pt-24 pb-8` on mobile, and move `<TrustStrip />` to be rendered immediately after the Hero `<section>`.
- **Satisfies**: REQ-HOME-001 (revision)
- **Depends on**: none
- **Est. lines**: ~30
- **Acceptance**: `npm run build` succeeds, `<TrustStrip />` is sibling to `<section id="hero">` in output HTML.

### 1.2 Redesign TrustStrip component for light background compatibility
- **Deliverable**: Modify [TrustStrip.astro](file:///c:/Users/nicol/Documents/GitHub/webs_curros/ancora-site-build/src/components/TrustStrip.astro) to have a wrapper `div` with `border-y border-neutral-100 bg-white py-6`, change text styling to `text-primary-600 font-medium`, wrap icons in `bg-accent-50 text-accent-600` circles, and use flex-col on mobile / flex-row on desktop.
- **Satisfies**: REQ-HOME-002 (revision)
- **Depends on**: 1.1
- **Est. lines**: ~30
- **Acceptance**: Valid rendering on both viewport sizes, high contrast text on white.

### 1.3 Fix linting and verify build
- **Deliverable**: Run `npm run lint:fix` and `npm run build` to verify there are no compilation or style issues.
- **Satisfies**: Quality Assurance
- **Depends on**: 1.2
- **Est. lines**: ~0
- **Acceptance**: Zero lint errors, build folder `dist/` successfully generated.
