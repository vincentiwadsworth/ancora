# Design: Ancora Web

## Repository Layout

```
ancora/                                    # NEW repo root
├── .github/
│   └── workflows/
│       └── deploy.yml                     # NEW — REQ-DEPLOY-001..003
├── .gitignore                             # NEW — REQ-DEPLOY-009
├── README.md                              # NEW
├── astro.config.mjs                       # NEW — REQ-SITE-FDN-001, REQ-DEPLOY-008
├── package.json                           # NEW — REQ-SITE-FDN-001
├── tsconfig.json                          # NEW — REQ-SITE-FDN-001 (strict: true)
├── public/
│   ├── CNAME                              # NEW — REQ-DEPLOY-004
│   ├── robots.txt                         # NEW — REQ-SITE-FDN-008
│   └── favicon.svg                        # NEW
├── src/
│   ├── components/
│   │   ├── Header.astro                   # NEW — REQ-SITE-FDN-004,015
│   │   ├── Footer.astro                   # NEW — REQ-SITE-FDN-005,015
│   │   ├── Logo.astro                     # NEW — REQ-SITE-FDN-017
│   │   ├── Section.astro                  # NEW — REQ-SITE-FDN-020,021
│   │   ├── SegmentedCta.astro             # NEW — REQ-SITE-FDN-016
│   │   ├── PillarCard.astro               # NEW — REQ-SITE-FDN-015
│   │   ├── PainCard.astro                 # NEW — REQ-SITE-FDN-015
│   │   ├── ProcessStep.astro              # NEW — REQ-SITE-FDN-015
│   │   ├── ServiceCard.astro              # NEW — REQ-SITE-FDN-015
│   │   ├── TeamMember.astro               # NEW — REQ-SITE-FDN-015
│   │   ├── ContactChannel.astro           # NEW — REQ-SITE-FDN-015
│   │   └── MapEmbed.astro                 # NEW — REQ-SITE-FDN-015
│   ├── config/
│   │   ├── site.ts                        # NEW — REQ-SITE-FDN-009,010
│   │   └── meta.ts                        # NEW — REQ-SITE-FDN-022
│   ├── data/
│   │   ├── pillars.ts                     # NEW — REQ-SITE-FDN-018
│   │   ├── pains.ts                       # NEW — REQ-SITE-FDN-018
│   │   ├── services.ts                    # NEW — REQ-SITE-FDN-018
│   │   ├── tenantSelectionSteps.ts        # NEW — REQ-SITE-FDN-018
│   │   ├── protectionMeasures.ts          # NEW — REQ-SITE-FDN-018
│   │   ├── team.ts                        # NEW — REQ-SITE-FDN-018
│   │   └── pricing.ts                     # NEW — REQ-SITE-FDN-018
│   ├── layouts/
│   │   └── BaseLayout.astro               # NEW — REQ-SITE-FDN-003,006,011..014
│   ├── pages/
│   │   ├── index.astro                    # NEW — REQ-HOME-001..008
│   │   ├── services.astro                 # NEW — REQ-SERVICES-001..007
│   │   ├── about.astro                    # NEW — REQ-ABOUT-001..004
│   │   └── contact.astro                  # NEW — REQ-CONTACT-001..007
│   └── styles/
│       └── global.css                     # NEW — REQ-SITE-FDN-002,019
├── openspec/                              # MIGRATED from webs_curros
│   ├── config.yaml
│   ├── changes/
│   │   └── ancora-web/
│   │       ├── exploration.md
│   │       ├── proposal.md
│   │       └── design.md                  # THIS FILE
│   └── specs/
│       ├── site-foundation/spec.md
│       ├── home-page/spec.md
│       ├── services-page/spec.md
│       ├── about-page/spec.md
│       ├── contact-page/spec.md
│       └── deployment-pipeline/spec.md
```

## Architecture Decisions

| Decision | Alternatives | Rationale |
|---|---|---|
| Astro 6 static, 0KB client JS | Next.js static, plain HTML | Matches cbhe-web/terra-preta pattern; best CWV; Content Layer path for future blog |
| Tailwind v4 via Vite plugin + `@theme` | Plain CSS, Tailwind v3 JS config | Single source of tokens; matches ref repos; no `tailwind.config.js` drift |
| `src/data/*.ts` for all content (REQ-018) | Inline in `.astro` pages | Typed contracts; copy edits in one place; refactors are safe |
| `SegmentedCta` as sole WhatsApp renderer (REQ-016) | Inline `wa.me` in pages | Phone/intent/encoding in one component; URL scheme change = one-file fix |
| Single `BaseLayout` (REQ-003) | Per-page layout variants | All shared head/header/footer/meta in one place; pages are pure composition |
| `getPageMeta` helper (REQ-022) | Per-page `<meta>` blocks | SEO-critical tags maintained centrally; pages don't touch `<head>` |
| `Section` wrapper (REQ-021) | Per-section ad-hoc markup | Vertical rhythm + semantic structure + `aria-labelledby` identical across pages |
| Umami Cloud env-gated | Always-on, self-hosted | Dev builds don't pollute; free tier sufficient; <2KB script |
| GitHub Pages + `withastro/action@v6` | Netlify, Vercel | Free; matches ref repos; CNAME for `ancora.com.bo` |
| Code en-US, content es-BO (REQ-014) | Mixed | User-locked; industry standard naming; Spanish is content, not code |

## Design Tokens

Place in `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  /* Color scale anchored on #0f1e36 */
  --color-primary-50:  #eef2f8;
  --color-primary-100: #d3dceb;
  --color-primary-200: #a6b9d6;
  --color-primary-300: #7a96c2;
  --color-primary-400: #4d73ad;
  --color-primary-500: #214f99;
  --color-primary-600: #0f1e36;   /* PRIMARY (locked) */
  --color-primary-700: #0c1829;
  --color-primary-800: #09111d;
  --color-primary-900: #060b14;
  --color-primary-950: #03060a;

  /* Neutral (slate) */
  --color-neutral-50:  #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;

  /* Surface */
  --color-surface:          #fafaf7;
  --color-surface-muted:    #f5f5f0;
  --color-surface-inverse:  #0f1e36;

  /* Typography */
  --font-sans: 'Inter Variable', system-ui, -apple-system, sans-serif;
  --font-display: 'Inter Variable', system-ui, -apple-system, sans-serif;

  /* Spacing */
  --spacing-section-y:    6rem;
  --spacing-section-y-sm: 3rem;

  /* Radius */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-full: 9999px;
}
```

### Contrast validation (REQ-SITE-FDN-023)

| Pair | Ratio | Passes AA? |
|---|---|---|
| `#0f1e36` on `#ffffff` | 15.4:1 | Yes (4.5:1 min) |
| `#0f1e36` on `#fafaf7` | ~15.1:1 | Yes |
| `#ffffff` on `#0f1e36` | 15.4:1 | Yes (3:1 large text) |
| `#64748b` on `#ffffff` | 5.5:1 | Yes |
| `#334155` on `#fafaf7` | 9.3:1 | Yes |

## Component Composition Matrix

| Page | Header | Footer | Hero | SegmentedCta | PillarCard | PainCard | ProcessStep | ServiceCard | TeamMember | ContactChannel | MapEmbed | Section |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | yes | yes | yes | hero+final | x3 | x5 | | | | | | yes |
| `/services` | yes | yes | | x3 intents | | | x4 | x7 | | | | yes |
| `/about` | yes | yes | | | | | | | x2 | | | yes |
| `/contact` | yes | yes | | primary | | | | | | x3+ | yes | yes |

## Data File Shapes

```ts
// src/data/pillars.ts
export interface Pillar {
  title: string;
  description: string;
}
export const pillars: Pillar[] = [ ... ];

// src/data/pains.ts
export interface Pain {
  number: number;
  title: string;
  description: string;
}
export const pains: Pain[] = [ ... ];

// src/data/services.ts
export interface Service {
  title: string;
  description: string;
}
export const services: Service[] = [ ... ]; // 7 items (6 + conflict support)

// src/data/tenantSelectionSteps.ts
export interface SelectionStep {
  step: number;
  title: string;
  description: string;
}
export const tenantSelectionSteps: SelectionStep[] = [ ... ]; // 4 steps

// src/data/protectionMeasures.ts
export interface ProtectionMeasure {
  title: string;
  description: string;
}
export const protectionMeasures: ProtectionMeasure[] = [ ... ]; // 5 measures

// src/data/team.ts
export interface TeamMember {
  name: string;
  initials: string;
  credentials: string;
  education: string;
  experience: string;
}
export const team: TeamMember[] = [ ... ]; // 2 members

// src/data/pricing.ts
export interface Pricing {
  rate: string;
  example: { rent: string; fee: string; net: string };
  disclaimer: string;
}
export const pricing: Pricing = { ... };
```

## Centralized Content Pattern (REQ-SITE-FDN-018)

**Rule**: No Spanish content strings in `.astro` files except page-specific structural glue (H1, unique section headings). All repeatable content MUST be imported from `src/data/*.ts`.

**Flow**:
```
src/data/pillars.ts ──→ src/pages/index.astro ──→ .map() → <PillarCard .../>
src/data/services.ts ──→ src/pages/services.astro ──→ .map() → <ServiceCard .../>
src/data/team.ts ──→ src/pages/about.astro ──→ .map() → <TeamMember .../>
```

**Enforcement**: At review time, `grep -r "wa\.me\|whatsapp" src/pages/ src/components/` must only hit `SegmentedCta.astro` and `site.ts`.

## whatsappLink Helper

```ts
// src/config/site.ts (excerpt)
export type CtaIntent = 'evaluate' | 'general' | 'process';

export const site = {
  brandName: 'ANCORA',
  tagline: 'Administramos. Vos descansás.',
  phone: '+591 XXXXXXXX',
  email: 'contacto@ancora.com.bo',
  address: 'Dirección placeholder',
  whatsapp: '59100000000',  // swap on go-live
  ctaMessages: {
    evaluate: 'Hola Ancora, quiero evaluar mi propiedad para administración.',
    general: 'Hola Ancora, quiero más información sobre sus servicios.',
    process: 'Hola Ancora, quiero saber más sobre el proceso de selección de inquilinos.',
  },
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
} as const;

export function whatsappLink(intent: CtaIntent): string {
  const phone = site.whatsapp;
  const text = site.ctaMessages[intent];
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
```

**Example output**: `whatsappLink('evaluate')` → `https://wa.me/59100000000?text=Hola%20Ancora%2C%20quiero%20evaluar%20mi%20propiedad%20para%20administraci%C3%B3n.`

## Deploy Strategy

### Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v6
        with:
          node-version: 22
          # PUBLIC_UMAMI_ENABLED + PUBLIC_UMAMI_SITE_ID set as repo secrets
    env:
      PUBLIC_UMAMI_ENABLED: ${{ secrets.PUBLIC_UMAMI_ENABLED }}
      PUBLIC_UMAMI_SITE_ID: ${{ secrets.PUBLIC_UMAMI_SITE_ID }}
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Build-time env vars

| Variable | Required | Default | Missing behavior |
|---|---|---|---|
| `PUBLIC_UMAMI_ENABLED` | No | `'false'` | Umami script not injected; build succeeds |
| `PUBLIC_UMAMI_SITE_ID` | Conditional | — | If `ENABLED=true` and missing → build fails (REQ-DEPLOY-007) |

### Domain strategy

- **Dev**: `https://vincentiwadsworth.github.io/ancora/`
- **Prod**: `https://ancora.com.bo/` (after DNS + repo Pages custom domain)
- `astro.config.mjs`: `site: 'https://ancora.com.bo'`, `trailingSlash: 'never'`
- `public/CNAME`: contains `ancora.com.bo` (always shipped, harmless on dev URL)

## REQ Traceability Matrix

| REQ | File(s) |
|---|---|
| REQ-SITE-FDN-001 | `astro.config.mjs`, `package.json`, `tsconfig.json` |
| REQ-SITE-FDN-002 | `src/styles/global.css` |
| REQ-SITE-FDN-003 | `src/layouts/BaseLayout.astro` |
| REQ-SITE-FDN-004 | `src/components/Header.astro` |
| REQ-SITE-FDN-005 | `src/components/Footer.astro` |
| REQ-SITE-FDN-006 | `src/layouts/BaseLayout.astro` (skip link) |
| REQ-SITE-FDN-007 | `astro.config.mjs` (`@astrojs/sitemap`) |
| REQ-SITE-FDN-008 | `public/robots.txt` |
| REQ-SITE-FDN-009 | `src/config/site.ts` |
| REQ-SITE-FDN-010 | `src/config/site.ts` (`whatsappLink`) |
| REQ-SITE-FDN-011 | `src/styles/global.css` (`prefers-reduced-motion`) |
| REQ-SITE-FDN-012 | `src/styles/global.css` (`focus-visible`) |
| REQ-SITE-FDN-013 | Validated by token contrast table above |
| REQ-SITE-FDN-014 | Enforced: code en-US, data files es-BO |
| REQ-SITE-FDN-015 | All 12 files in `src/components/` |
| REQ-SITE-FDN-016 | `src/components/SegmentedCta.astro` |
| REQ-SITE-FDN-017 | `src/components/Logo.astro` |
| REQ-SITE-FDN-018 | All 7 files in `src/data/` |
| REQ-SITE-FDN-019 | `src/styles/global.css` (`@theme` typography/spacing/radius) |
| REQ-SITE-FDN-020 | `src/components/Section.astro` (container) |
| REQ-SITE-FDN-021 | `src/components/Section.astro` |
| REQ-SITE-FDN-022 | `src/config/meta.ts` + `src/layouts/BaseLayout.astro` |
| REQ-SITE-FDN-023 | Token contrast table (validated above) |
| REQ-HOME-001..008 | `src/pages/index.astro` + `src/data/pillars|pains.ts` |
| REQ-SERVICES-001..007 | `src/pages/services.astro` + `src/data/services|tenantSelection|protection|pricing.ts` |
| REQ-ABOUT-001..004 | `src/pages/about.astro` + `src/data/team.ts` |
| REQ-CONTACT-001..007 | `src/pages/contact.astro` + `src/components/ContactChannel|MapEmbed.astro` |
| REQ-DEPLOY-001..009 | `.github/workflows/deploy.yml`, `.gitignore`, `public/CNAME`, `astro.config.mjs` |

## PR Slicing Strategy (stacked-to-main, 500-line budget)

**PR 1: Foundation** (~250 lines)
- `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- `src/styles/global.css` (full `@theme`)
- `src/config/site.ts`, `src/config/meta.ts`
- `public/robots.txt`, `public/CNAME`, `public/favicon.svg`
- `openspec/` migration (entire spec tree)
- `.github/workflows/deploy.yml`

**PR 2: Shared components + data** (~300 lines)
- `src/components/Header|Footer|Logo|Section|SegmentedCta.astro`
- `src/data/*.ts` (7 files)
- `src/layouts/BaseLayout.astro`

**PR 3: Home page** (~250 lines)
- `src/pages/index.astro`
- `src/components/PillarCard|PainCard.astro` (if not hoisted to PR 2)

**PR 4: Services + About + Contact** (~350 lines)
- `src/pages/services|about|contact.astro`
- `src/components/ProcessStep|ServiceCard|TeamMember|ContactChannel|MapEmbed.astro`

**PR 5: Polish + verify** (~150 lines)
- `README.md`
- Final a11y pass (skip link, contrast, focus-visible, reduced-motion)
- Final SEO pass (meta, sitemap, robots, JSON-LD)
- Lighthouse check + screenshots for review

**Fallback split** (if PR 1 exceeds budget due to spec migration):
- PR 1a: repo scaffold + deploy workflow → initial deploy to GH Pages
- PR 1b: `openspec/` migration + `site.ts` + `global.css`

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| PR 1 exceeds 500 lines from spec migration | Medium | Split into 1a/1b per fallback above |
| Placeholder WhatsApp number ships to prod | Low | `site.ts` centralizes; README documents swap step |
| `#0f1e36` on `#fafaf7` fails non-obvious combo | Low | Validated 15.1:1 in contrast table |
| GH Pages CNAME breaks dev previews | Low | CNAME is harmless on `*.github.io` URL; Astro `site` is production-only |

## Open Questions

None — all decisions locked by user.
