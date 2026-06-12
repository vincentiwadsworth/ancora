# Tasks: Ancora Web

> Strategy: 5 stacked PRs to main, each under 500 changed lines.
> Per `work-unit-commits`: one task = one atomic commit with conventional-commits message.
> Per `chained-pr`: PRs are sequential, merge in order, each independently reviewable.

## Review Workload Forecast

| PR | Tasks | Est. Lines | Under 500? | Risk |
|---|---|---|---|---|
| 1 — Foundation | 8 | ~350 (+ migration) | Yes | Low; fallback 1a/1b in design.md |
| 2 — Shared Components | 8 | ~530 | Slightly over | Medium; fallback 2a/2b documented |
| 3 — Home Page | 2 | ~300 | Yes | Low |
| 4 — Remaining Pages | 6 | ~545 | Slightly over | Medium; fallback 4a/4b documented |
| 5 — Polish + Verify | 4 | ~160 | Yes | Low |

**Total authored lines**: ~1885 (excludes ~1500 migration lines in PR 1.7).

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | PR | Notes |
|---|---|---|---|
| 1 | Repo scaffold + deploy pipeline + openspec migration | PR 1 | Base: main; fallback 1a/1b if over budget |
| 2 | Shared components + data files + BaseLayout | PR 2 | Base: main; fallback 2a/2b if over budget |
| 3 | Home page with PillarCard + PainCard | PR 3 | Base: main |
| 4 | Services + About + Contact pages with card components | PR 4 | Base: main; fallback 4a/4b if over budget |
| 5 | Accessibility + SEO + design audit + README | PR 5 | Base: main |

## PR 1 — Foundation

> Goal: repo scaffold, deploy pipeline, design tokens, openspec migration.
> After merge: GH Pages is live (placeholder page). Openspec tree in repo for traceability.

### 1.1 Initialize Astro 6 project
- **Deliverable**: `package.json`, `astro.config.mjs`, `tsconfig.json` (strict: true), minimal `src/pages/index.astro` placeholder
- **Satisfies**: REQ-SITE-FDN-001
- **Depends on**: none
- **Est. lines**: ~40
- **Acceptance**: `npm install` succeeds; `npm run dev` serves placeholder; `npm run build` produces `dist/index.html`

### 1.2 Install and configure Tailwind v4
- **Deliverable**: Tailwind v4 via Vite plugin; `src/styles/global.css` with full `@theme` block from design.md (colors, fonts, spacing, radius)
- **Satisfies**: REQ-SITE-FDN-002, REQ-SITE-FDN-019
- **Depends on**: 1.1
- **Est. lines**: ~80
- **Acceptance**: `bg-primary-600` produces `#0f1e36`; no arbitrary value syntax needed; full token scale available

### 1.3 Add .gitignore
- **Deliverable**: `.gitignore` with `node_modules/`, `dist/`, `.astro/`, `.env`, `.env.local`, `*.log`, `.DS_Store`
- **Satisfies**: REQ-DEPLOY-009
- **Depends on**: 1.1
- **Est. lines**: ~10
- **Acceptance**: listed paths not tracked by `git status`

### 1.4 Add public assets (CNAME, robots, favicon)
- **Deliverable**: `public/CNAME` (`ancora.com.bo`), `public/robots.txt` (allow all + sitemap reference), `public/favicon.svg` (placeholder geometric mark)
- **Satisfies**: REQ-DEPLOY-004, REQ-SITE-FDN-008
- **Depends on**: 1.1
- **Est. lines**: ~15
- **Acceptance**: `dist/CNAME` present after build; `dist/robots.txt` has sitemap directive; favicon renders in browser

### 1.5 Configure astro.config.mjs (site, sitemap, trailing slash)
- **Deliverable**: `astro.config.mjs` with `site: 'https://ancora.com.bo'`, `trailingSlash: 'never'`, `integrations: [sitemap()]`
- **Satisfies**: REQ-DEPLOY-008, REQ-SITE-FDN-007
- **Depends on**: 1.1
- **Est. lines**: ~20
- **Acceptance**: `dist/sitemap.xml` lists all 4 routes after build (with page stubs)

### 1.6 Add GitHub Actions deploy workflow
- **Deliverable**: `.github/workflows/deploy.yml` using `withastro/action@v6`, Node 22, triggers on push to main, deploys to Pages, passes Umami env vars from secrets
- **Satisfies**: REQ-DEPLOY-001, REQ-DEPLOY-002, REQ-DEPLOY-003
- **Depends on**: 1.1, 1.4, 1.5
- **Est. lines**: ~30
- **Acceptance**: valid YAML; first push to main triggers successful run; site reachable at `vincentiwadsworth.github.io/ancora/`

### 1.7 Migrate openspec tree from webs_curros
- **Deliverable**: full `openspec/` directory copied into repo: `config.yaml`, `changes/ancora-web/{exploration,proposal,design}.md`, `specs/{site-foundation,home-page,services-page,about-page,contact-page,deployment-pipeline}/spec.md`
- **Satisfies**: (traceability only)
- **Depends on**: none (parallel with 1.1–1.6)
- **Est. lines**: ~1500 (file migration, not authored code)
- **Acceptance**: every spec file present and byte-identical to webs_curros source

### 1.8 Author README.md (minimal)
- **Deliverable**: `README.md` with project name, one-line description, live-site link, "edit in webs_curros" note, link to `openspec/`
- **Satisfies**: (documentation)
- **Depends on**: 1.1
- **Est. lines**: ~30
- **Acceptance**: README renders on GitHub repo page

**PR 1 total**: ~350 authored lines (excludes 1.7 migration bulk).
**Fallback**: if tasks 1.1–1.6+1.8 exceed 500 lines, split as 1a (scaffold + deploy) and 1b (config + openspec migration).

## PR 2 — Shared Components

> Goal: every page importing `BaseLayout` gets header, footer, meta, Umami, skip-link, focus styles, motion-preference. WhatsApp CTAs render via `SegmentedCta`. All content in `src/data/`.

### 2.1 Author src/config/site.ts and src/config/meta.ts
- **Deliverable**: `site.ts` (brandName, tagline, phone/whatsapp/email/address placeholders, ctaMessages for 3 intents, social handles, umamiSiteId, umamiEnabled default, `whatsappLink()` helper) + `meta.ts` (`getPageMeta()` for 4 pages with es-BO title/description/og)
- **Satisfies**: REQ-SITE-FDN-009, REQ-SITE-FDN-010, REQ-SITE-FDN-022
- **Depends on**: 1.1
- **Est. lines**: ~80
- **Acceptance**: `import { site, whatsappLink } from './config/site'` returns typed values; `getPageMeta('home')` returns complete meta object

### 2.2 Author src/data/*.ts (7 files)
- **Deliverable**: `pillars.ts` (3), `pains.ts` (5), `services.ts` (7), `tenantSelectionSteps.ts` (4), `protectionMeasures.ts` (5), `team.ts` (2), `pricing.ts` (rate + example + disclaimer) — all with typed interfaces from design.md
- **Satisfies**: REQ-SITE-FDN-018
- **Depends on**: none
- **Est. lines**: ~150
- **Acceptance**: every Spanish content string from pitch present; no content strings in any component file

### 2.3 Author Logo.astro
- **Deliverable**: inline SVG placeholder, accepts `variant` prop (`'mark' | 'wordmark'`), uses primary color
- **Satisfies**: REQ-SITE-FDN-017
- **Depends on**: 1.2
- **Est. lines**: ~25
- **Acceptance**: `<Logo />` renders valid SVG; primary color in fill

### 2.4 Author SegmentedCta.astro
- **Deliverable**: button/link component, accepts `intent: 'evaluate' | 'general' | 'process'`, optional `variant: 'primary' | 'secondary' | 'ghost'`, optional `label` override; calls `whatsappLink(intent)`; opens new tab with `rel="noopener"`
- **Satisfies**: REQ-SITE-FDN-016
- **Depends on**: 2.1
- **Est. lines**: ~30
- **Acceptance**: rendered `href` matches `whatsappLink(intent)`; `grep wa.me src/` hits only this file + `site.ts`

### 2.5 Author Section.astro
- **Deliverable**: semantic `<section>` wrapper; props: `id`, `eyebrow?`, `heading?`, `intro?`, `as?` (default `'section'`); auto `aria-labelledby` if heading provided; applies `--spacing-section-y` and shared container
- **Satisfies**: REQ-SITE-FDN-020, REQ-SITE-FDN-021
- **Depends on**: 1.2
- **Est. lines**: ~40
- **Acceptance**: every section uses `<Section>`; vertical padding identical; `aria-labelledby` matches heading id

### 2.6 Author Header.astro
- **Deliverable**: brand logo, nav links (Servicios, Sobre nosotros, Contacto) with current-route highlighting, primary WhatsApp CTA (evaluate intent); mobile hamburger at `<md`
- **Satisfies**: REQ-SITE-FDN-004
- **Depends on**: 2.3, 2.4
- **Est. lines**: ~60
- **Acceptance**: nav collapses at 375px; keyboard-accessible; CTA opens WhatsApp evaluate intent

### 2.7 Author Footer.astro
- **Deliverable**: tagline, contact summary (from site.ts), social icons (placeholders), copyright with dynamic year
- **Satisfies**: REQ-SITE-FDN-005
- **Depends on**: 2.1, 2.3
- **Est. lines**: ~50
- **Acceptance**: all placeholders render; copyright year dynamic; social links open in new tab

### 2.8 Author BaseLayout.astro with Umami integration
- **Deliverable**: HTML skeleton, `<head>` with charset/viewport/title/description/og/canonical/theme-color/JSON-LD (Organization via prop), skip-link first, `<Header>`, `<main id="main">` slot, `<Footer>`, Umami script conditional on `PUBLIC_UMAMI_ENABLED`, prefers-reduced-motion CSS guard, focus-visible outline styles
- **Satisfies**: REQ-SITE-FDN-003, REQ-SITE-FDN-006, REQ-SITE-FDN-011, REQ-SITE-FDN-012, REQ-SITE-FDN-014, REQ-DEPLOY-005, REQ-DEPLOY-006, REQ-DEPLOY-007
- **Depends on**: 2.1, 2.6, 2.7
- **Est. lines**: ~100
- **Acceptance**: meta populated from `getPageMeta(page)`; Umami script present when env=true, absent when false; skip-link works on Tab+Enter; focus-visible on all interactive elements

**PR 2 total**: ~530 lines. **Fallback**: split 2a (2.1–2.5, config+data+leaf components) and 2b (2.6–2.8, layout components).

## PR 3 — Home Page

> Goal: home page renders complete with all sections + JSON-LD Organization.

### 3.1 Author PillarCard.astro and PainCard.astro
- **Deliverable**: two card components, props from data file interfaces; PillarCard (title + description), PainCard (number + title + description)
- **Satisfies**: REQ-HOME-002, REQ-HOME-003 (partial)
- **Depends on**: 2.2, 2.5
- **Est. lines**: ~50
- **Acceptance**: rendering 3 PillarCard + 5 PainCard from data arrays produces correct Spanish copy

### 3.2 Author src/pages/index.astro with all sections
- **Deliverable**: hero (H1 + sub + 2 SegmentedCta), 3 PillarCard section, 5 PainCard section, differentiation table (inline one-off), social proof placeholder, final CTA band; home-only JSON-LD Organization schema
- **Satisfies**: REQ-HOME-001 through REQ-HOME-008
- **Depends on**: 2.1, 2.2, 2.4, 2.5, 2.8, 3.1
- **Est. lines**: ~250
- **Acceptance**: all 6 sections render; semantic HTML; JSON-LD validates; Lighthouse SEO >95

**PR 3 total**: ~300 lines.

## PR 4 — Remaining Pages

> Goal: services, about, contact pages render complete. Process sub-section in services. Pricing block. Team grid. Map embed + multi-channel contact.

### 4.1 Author ProcessStep.astro and ServiceCard.astro
- **Deliverable**: ProcessStep (step number + title + description), ServiceCard (title + description); props from data interfaces
- **Satisfies**: REQ-SERVICES-002, REQ-SERVICES-003, REQ-SERVICES-004 (partial)
- **Depends on**: 2.2, 2.5
- **Est. lines**: ~50
- **Acceptance**: 4 ProcessStep + 7 ServiceCard render with correct copy

### 4.2 Author TeamMember.astro
- **Deliverable**: avatar (initials in primary circle), name, credentials, education, experience
- **Satisfies**: REQ-ABOUT-002
- **Depends on**: 2.2, 2.5
- **Est. lines**: ~35
- **Acceptance**: 2 team members render with placeholder initials; avatar circle uses primary bg + white text

### 4.3 Author ContactChannel.astro and MapEmbed.astro
- **Deliverable**: ContactChannel (icon + label + link for mailto:/tel:), MapEmbed (iframe wrapper for OpenStreetMap/Google Maps with placeholder Bolivia address)
- **Satisfies**: REQ-CONTACT-003, REQ-CONTACT-004
- **Depends on**: 2.1
- **Est. lines**: ~40
- **Acceptance**: ContactChannel renders mailto:/tel: links; MapEmbed renders iframe with placeholder Bolivia address

### 4.4 Author src/pages/services.astro
- **Deliverable**: H1 + intro + 7 ServiceCard + 4-step ProcessStep section + 5-point protection section + pricing transparency block (Bs. 3000 → 210 → 2790) + 3 SegmentedCta (evaluate/general/process)
- **Satisfies**: REQ-SERVICES-001 through REQ-SERVICES-007
- **Depends on**: 4.1, 2.1, 2.4, 2.5, 2.8
- **Est. lines**: ~200
- **Acceptance**: all 5 sub-sections render with verbatim copy; pricing math correct; 3 CTAs open correct intents

### 4.5 Author src/pages/about.astro
- **Deliverable**: H1 + brand story paragraph + 2 TeamMember grid + values block (3 expanded pillars from data)
- **Satisfies**: REQ-ABOUT-001 through REQ-ABOUT-004
- **Depends on**: 4.2, 2.2, 2.5, 2.8
- **Est. lines**: ~100
- **Acceptance**: team grid renders 2 members with initials; values block expands 3 pillars with detailed descriptions

### 4.6 Author src/pages/contact.astro
- **Deliverable**: H1 + intro + primary WhatsApp CTA (evaluate, visually largest) + email/phone ContactChannel + 3+ ContactChannel row + MapEmbed + social links row + office hours note
- **Satisfies**: REQ-CONTACT-001 through REQ-CONTACT-007
- **Depends on**: 4.3, 2.1, 2.4, 2.5, 2.8
- **Est. lines**: ~120
- **Acceptance**: WhatsApp CTA visually prominent; map iframe loads; social links open in new tab; office hours note present

**PR 4 total**: ~545 lines. **Fallback**: split 4a (4.1–4.3, card components) and 4b (4.4–4.6, page files).

## PR 5 — Polish + Verify

> Goal: final accessibility, SEO, design audit. README finalized. Ready for stakeholder review.

### 5.1 Run accessibility audit and fix findings
- **Deliverable**: report from `accessibility` skill; fixes committed
- **Satisfies**: REQ-SITE-FDN-013, all a11y REQs
- **Depends on**: PR 1–4 merged
- **Est. lines**: ~50
- **Acceptance**: WCAG 2.2 AA passes via accessibility skill audit

### 5.2 Run SEO audit and fix findings
- **Deliverable**: report from `seo-audit` skill; fixes committed
- **Satisfies**: all SEO REQs
- **Depends on**: PR 1–4 merged
- **Est. lines**: ~30
- **Acceptance**: Lighthouse SEO >95; sitemap validates; meta tags complete for all 4 pages

### 5.3 Run web-design-guidelines review
- **Deliverable**: report from `web-design-guidelines` skill; fixes committed
- **Satisfies**: design system consistency REQs
- **Depends on**: PR 1–4 merged
- **Est. lines**: ~30
- **Acceptance**: no critical findings from the skill

### 5.4 Finalize README
- **Deliverable**: project description, install/run/build commands, deploy notes, live-site link, swap-list (where to change phone/logo/social/copy)
- **Satisfies**: (documentation)
- **Depends on**: PR 1–4 merged
- **Est. lines**: ~50
- **Acceptance**: README is the single handoff doc for the client

**PR 5 total**: ~160 lines.

## Commit Strategy

Per `work-unit-commits`: each task = 1 atomic commit with conventional-commits message.

| PR | Commits | Message prefixes |
|---|---|---|
| 1 | 8 | chore: init / chore: tailwind / chore: gitignore / chore: public assets / chore: astro config / ci: deploy / docs: openspec / docs: readme |
| 2 | 8 | feat: config + data + components (dependency order) |
| 3 | 2 | feat: cards / feat: home page |
| 4 | 6 | feat: cards × 3 / feat: services / feat: about / feat: contact |
| 5 | 4 | fix: a11y / fix: seo / fix: design / docs: readme |

**Total: 28 atomic commits across 5 PRs.**
