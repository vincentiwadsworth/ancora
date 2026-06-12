# Proposal: Ancora Institutional Website

## Intent

Build a 4-page institutional website for Ancora (real-estate rental asset management, Bolivia). The site replaces a PPTX-only presence with a performant, trustworthy web experience. Primary goal: convert property owners into leads via segmented WhatsApp CTAs. Secondary: establish credibility (team, process transparency, risk-reduction copy).

Greenfield project. Exploration (Option A) recommends **Astro 6 + Tailwind v4 + GitHub Pages** — ships 0KB JS, Lighthouse 95-100, matches two existing team repos (cbhe-web, terra-preta).

## Scope

### In Scope

- Astro 6 project scaffold in `webs_curros/ancora/`
- 4 routes: `/`, `/services`, `/about`, `/contact` — meta + OG tags in es-BO
- Design tokens: navy primary `#0f1e36` + full 50-950 scale, neutral accents (slate/zinc), single warm cream surface — via Tailwind v4 `@theme`
- Components: `Header`, `Footer`, `Hero`, `ServiceCard`, `PillarCard`, `ProcessStep`, `TeamMember`, `ContactChannel`, `SegmentedCta`, `MapEmbed`, `Logo`
- `src/config/site.ts` — centralized phone, WhatsApp link builder, social handles, address (all placeholders)
- 3 segmented WhatsApp CTAs (B2): property evaluation, general info, tenant-selection info
- Process sub-section on `/services`: 4-step tenant selection + 5-point investment protection
- Umami analytics: `PUBLIC_UMAMI_ENABLED` + `PUBLIC_UMAMI_SITE_ID` env vars, Umami Cloud default
- GitHub Pages deploy via `withastro/action@v6` + `public/CNAME` (`ancora.com.bo`)
- Responsive: mobile-first (375px baseline), sm/md/lg/xl breakpoints
- Accessibility: WCAG 2.2 AA (semantic HTML, contrast, focus-visible, skip link, reduced-motion)
- SEO: `@astrojs/sitemap`, `robots.txt`, per-page meta/OG, JSON-LD `Organization` schema
- Placeholder logo (inline SVG), placeholder team avatars (initials)

### Out of Scope

- Blog / content collections / CMS
- E-commerce / payments
- i18n (es-BO only)
- Form backend / email sending
- Final logo, team photos, real phone/social handles
- Domain registration (`ancora.com.bo`)
- Self-hosted Umami

## Capabilities

### New Capabilities

- `site-foundation`: Astro 6 scaffold, Tailwind v4 `@theme` tokens, `BaseLayout`, `Header`, `Footer`, meta/OG system, sitemap, robots
- `home-page`: Hero with segmented CTA, 3-pillar section, 5-pain section, social proof placeholder
- `services-page`: Service descriptions, segmented CTAs, process sub-section (4-step + 5-point), pricing transparency (7% model)
- `about-page`: Team grid, brand story, values
- `contact-page`: WhatsApp primary CTA, mailto, map embed placeholder, social links
- `deployment-pipeline`: GitHub Pages workflow, CNAME, Umami snippet

### Modified Capabilities

None (greenfield).

## Approach

Astro 6 static-first, 0KB JS by default. Tailwind v4 `@theme` for design tokens (`--color-primary` scale, `--color-surface`, `--color-text` etc.). Component-driven `.astro` files. Single config file (`site.ts`) for all placeholders. Pure static HTML+CSS — no client-side JS for v1.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `ancora/` | New | Astro 6 project root |
| `ancora/src/layouts/BaseLayout.astro` | New | Shared layout with head, nav, footer |
| `ancora/src/pages/{index,services,about,contact}.astro` | New | 4 page routes |
| `ancora/src/components/{Header,Footer,Hero,…}.astro` | New | 11 components |
| `ancora/src/config/site.ts` | New | Centralized placeholders |
| `ancora/src/styles/global.css` | New | Tailwind v4 `@import` + `@theme` tokens |
| `ancora/public/{CNAME,robots.txt}` | New | Domain + SEO |
| `ancora/astro.config.mjs` | New | Sitemap integration, site URL |
| `.github/workflows/deploy.yml` | New | `withastro/action@v6` |
| `.gitignore` | Modified | Add `node_modules/`, `dist/`, `.astro/`, `.env*` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| 10-day timeline tight | High | Lock 4 pages, placeholders only, defer non-essential to v1.1 |
| Partner stakeholder unidentified | Med | Self-explanatory demo; document decisions in proposal/spec |
| Placeholder WhatsApp number | Med | All CTAs from `site.ts`; one-line swap documented |
| Logo not final | Med | Inline SVG placeholder, swap-ready |
| Reviewer burnout on large PR | Med | 500-line budget; stacked-to-main chain; work-unit-commits |

## Rollback Plan

Revert merged PR. Static site has no state; redeploy previous GH Pages build. No data loss.

## Dependencies

- Node.js 22+ (local + CI)
- `withastro/action@v6` GitHub Action
- Umami Cloud free-tier account + site ID
- `ancora.com.bo` domain DNS (non-blocking; fallback to `*.github.io`)

## Success Criteria

- [ ] 4 routes return 200, render <1s on 4G (Lighthouse perf >95)
- [ ] 3 WhatsApp CTAs open WhatsApp with correct es-BO pre-loaded messages
- [ ] WCAG 2.2 AA pass via accessibility audit
- [ ] `sitemap.xml` + `robots.txt` present and valid
- [ ] Per-page meta description + OG tags in es-BO
- [ ] JSON-LD `Organization` schema validates
- [ ] Fully usable at 375px width
- [ ] Deployable to GH Pages by Mon 14/06
- [ ] All placeholders centralized, one-line swap
- [ ] Lighthouse: Performance >95, Accessibility >95, Best Practices >95, SEO >95
