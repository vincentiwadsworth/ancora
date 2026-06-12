# Exploration: ancora-web — stack and design direction

## Current State
Greenfield. No code yet. Client brief + extracted PPTX/PDF content available
(`ancora/extraccion/ancora-v3-pptx.md`, `ancora-v3-pdf.md`).
Client meeting notes in `ancora/reunión exploración.md` confirm: 4-page
institutional site, WhatsApp + social lead-gen, no CMS, no blog, no e-commerce,
no form backend. Domain (`ancora.com.bo`) and final logo/copy/phone/social/photos
all pending from client. Monday 14/06 demo draft; 10-day total timeline.

3 reference repos on disk (cbhe-web, terra-preta, citrino-web) — both
Astro-based projects use Astro 6 + Tailwind v4 via PostCSS/Vite plugin +
`@fontsource/inter` + `astro-icon` (Material Symbols) + `@astrojs/sitemap`.
Citrine-web is the legacy plain HTML/CSS/JS site (pre-Astro).

## Affected Areas
- `webs_curros/ancora/` — the new project will live here
- `webs_curros/.gitignore` — needs `node_modules/`, `dist/`, `.astro/`
- `webs_curros/openspec/changes/ancora-web/` — change folder (this file)
- `webs_curros/openspec/specs/ancora-web/` — to be created at sdd-spec time
- `webs_curros/openspec/changes/ancora-web/design.md` — sdd-design output
- `.github/workflows/deploy.yml` (new) — Astro → GitHub Pages action

## Reference-Repo Stack Signals
| Repo | Framework | Styling | Content | Deploy |
|---|---|---|---|---|
| cbhe-web | Astro 6 | Tailwind v4 + @theme tokens (MD3 palette) | Astro pages + content collections | GitHub Pages via `withastro/action` |
| terra-preta | Astro 6 | Tailwind v4 + @theme tokens (custom palette) | i18n routing, Content Layer | Custom domain (terrapreta.lat) |
| citrino-web | Static HTML/CSS/JS | Plain CSS | n/a | CNAME / custom domain |

## 2026 Design + Stack Research (3-5 trends)
1. **Static-first wins for content sites** — Astro 6 ships 0KB JS by default,
   ~40% faster than Next.js static export, ~90% less JS payload, Lighthouse
   95-100 out of the box. Source: alexbobes.com, logrocket, developersdigest.
2. **WhatsApp as primary CTA is the LATAM/Bolivia lead-gen norm** — Floating
   bottom-right bubble ("Green Zone" per Hoober's Thumb Zone) PLUS inline
   intent-led CTAs in hero + after pricing + after FAQ. Pre-filled `wa.me/`
   messages with context ("Hola Ancora, quiero evaluar mi propiedad en alquiler").
   Sticky mobile bottom bar = single highest-impact element. Source: wpchat,
   zoko, divxwebstudio, vasuyashii.
3. **Real-estate trust signals 2026** — Specificity over decoration. Team
   credentials above the fold. Transparent process. Track record presented
   with context (not vanity numbers). Risk-reduction copy near CTAs.
   Source: splashcreative, propphy, clicksgeek, flaredot.
4. **Minimalism + typographic contrast** (per minimalist-ui) — Off-white
   background, editorial serif for hero, geometric sans body, restrained
   accent, 1px borders, 4-6px radii. Sober corporate register maps directly
   to the "sober, minimalist" brief and the "Tu propiedad genera renta.
   Vos solo cobrás." copy register.
5. **Tailwind v4 CSS-first config** — `@theme {}` blocks replace JS config;
   `bg-primary`/`text-on-surface` map from `--color-*` tokens. Same pattern
   both reference repos use; consistent, maintainable.

## Stack Comparison
| Option | Pros | Cons | Effort |
|---|---|---|---|
| **A. Astro 6 + Tailwind v4 + Material Symbols + GitHub Pages** | 0KB JS default, fastest Lighthouse, matches both ref repos, free hosting, future blog via Content Layer, custom domain via CNAME, plain ESM/Vite | Node 22 required in build env | Low |
| B. Astro 6 + plain CSS (no Tailwind) | Smaller dep surface, fully custom styles | Reinvents design tokens by hand, slower to iterate, doesn't match team pattern | Medium |
| C. Next.js 16 static export + Tailwind | React ecosystem, ISR, PPR | Ships 80-120KB JS minimum, overkill for 4 pages, build is 2-3x slower, no Content Layer | High |
| D. Plain HTML + Tailwind CDN | Zero build step, easiest to hand off | No design tokens, no `@theme`, no sitemap, no form patterns, no future blog path, hard to maintain | Low to start, high long-term |

## Recommendation
**Option A: Astro 6 + Tailwind v4 + @fontsource-variable (Inter or pair with
editorial serif) + astro-icon (Material Symbols) + @astrojs/sitemap + GitHub
Pages via `withastro/action@v6`.**

Why: matches both existing reference repos (cbhe-web and terra-preta) so the
team has muscle memory; ships 0KB JS which gives the best CWV score for the
"generate trust" goal; Tailwind v4 `@theme` lets us define a blue palette
(dark navy primary + bone/celeste variants, TBD with user) cleanly; Content
Collections give a clean path if a blog is added later (explicitly mentioned
as "out of scope but future" in client notes); GitHub Pages is free and
matches `ancora.com.bo` via CNAME.

## Risks
- 10-day timeline tight if scope creeps beyond 4 pages
- Logo, copy, phone, social handles, team photos all pending from client
- "socio" stakeholder mentioned but not formally identified — Monday 14/06
  demo could surface pushback
- Domain quote pending (`ancora.com.bo`)
- es-BO single language only; no i18n setup (matches brief)
- No real test runner configured (per `openspec/config.yaml`); visual + a11y
  checks via seo-audit + web-design-guidelines + accessibility skills
- WhatsApp number is a placeholder per user instruction — must be replaced
  before go-live, or the CTA 404s

## Ready for Proposal
**Yes.** Stack: **Astro 6 + Tailwind v4 + Material Symbols + GitHub Pages**.
Ready to move to `sdd-propose` for `ancora-web`.
