# Exploration: ancora-one-pager — transform 4-page site into client reference one-pager

## Current State

The existing `ancora-site-build` project is a 4-page Astro 6 + Tailwind v4 static site with the following pages: **Home** (`index.astro`), **Services** (`services.astro`), **About** (`about.astro`), **Contact** (`contact.astro`). It has a full design system already in place (navy primary `#0f1e36`, warm gold accent, Inter + Plus Jakarta Sans, Material Symbols icons, `@theme` token system in Tailwind v4) and 13 reusable components with 7 data files.

The client (Luis Valenzuela) has sent a **4-slide PNG reference** (`referencia luis/Ajustes web/Slide1-4.PNG`) along with a PDF titled *"secciones web (enviado por Luis).pdf"* whose extracted text (via pdftotext) reveals:

> **"CREO QUE CAMBIARIA EL ORDEN PRIMERO COMO FUNCIONA Y DESPUES SERVICIOS. PORQUE SEGUIDO A LA PARTE DE SERVICIOS DEBERIAMOS COLOCAR LA TARIFA. VAS A PODER VERLO EN LA LÁMINA 3."**

Translation: *"I think I would change the order: first 'How it works' and then 'Services'. Because after the services section we should place the pricing. You'll see it in slide 3."*

This confirms the client wants a **restructured single-page layout** with a specific section order, different from the current 4-page structure.

## Reference Analysis (Text-Extracted Content)

> **Note:** The model cannot process PNG images directly. Analysis below is based on text extracted from `secciones web (enviado por Luis).pdf` (the 4-page PDF matching the slides) and from the existing Ancora V3 PPTX/PDF marketing content, plus the file sizes of the slide PNGs (Slide1: ~1.1MB, Slide2: ~217KB, Slide3: ~543KB, Slide4: ~491KB).

### Section Order (per client's explicit instruction)

1. **Hero** (Slide 1 — ~1.1MB, likely hero with background image)
   - Brand: ANCORA - GESTIÓN PROFESIONAL DE ACTIVOS RESIDENCIALES
   - Tagline: "Administramos. Vos descansás."
   - Subtext: "Tu propiedad genera renta. Vos solo cobrás."
   - Primary CTA to WhatsApp
   
2. **Cómo funciona** (Slide 2 — ~217KB, diagram/process)
   - Process cycle graphic showing:
     - Captar y filtrar clientes (Capture and filter clients)
     - Gestión contractual (Contract management)
     - Cobranzas (Collections)
     - Comunicación con inquilinos (Tenant communication)
     - Mantenimientos y reparaciones (Maintenance and repairs)
     - Reportar resultados (Report results)
     - Gestionar fin del contrato / Conciliaciones (End-of-contract management)

3. **Servicios** (Slide 3 — ~543KB, services + pricing)
   - Service cards/content
   - Followed by pricing/tarifa (7% rate visual)

4. **Additional section** (Slide 4 — ~491KB, likely about/team or contact)
   - Probable: "Quiénes somos" / team or final CTA/contact

### Visual Characteristics (Inferred from content + file sizes)

- **Slide1** (~1.1MB): Large background image/hero visual — may include a property, cityscape, or graphical hero element. Large size suggests photographic or complex graphical background.
- **Slide2** (~217KB, smaller): Clean diagram/process graphic — likely a cycle diagram or flow with icons.
- **Slide3** (~543KB): Mixed content — service descriptions + pricing card. May include icon grid.
- **Slide4** (~491KB): Team/info section with contact details.

## Affected Areas

### Files to Modify
- **`src/pages/index.astro`** — Becomes the sole page; absorbs content from services, about, contact
- **`src/layouts/BaseLayout.astro`** — Header nav must scroll to sections, not link to separate pages
- **`src/components/Header.astro`** — Nav items change from page links (`/services`, `/about`, `/contact`) to anchor links (`#como-funciona`, `#servicios`, `#tarifa`, `#nosotros`, `#contacto`)
- **`src/components/Footer.astro`** — Internal nav links should scroll instead of page-navigate
- **`src/components/Logo.astro`** — May need styling update if reference uses different logo treatment
- **`src/styles/global.css`** — Design tokens may need accent/secondary color adjustments, scroll-behavior: smooth
- **`src/config/meta.ts`** — Single page now: home only. Remove other page meta entries or keep for redirects
- **`src/config/site.ts`** — Update WhatsApp number when provided by client

### Files to Create
- **New section components** for "Cómo funciona" process diagram and any layout elements that don't match existing components
- **Possible image assets** in `public/images/` or `src/assets/` for hero background, team photos, property imagery

### Files to Remove/Deprecate
- **`src/pages/services.astro`** — Content moves to index sections (could keep for SEO but not linked)
- **`src/pages/about.astro`** — Content moves to index sections
- **`src/pages/contact.astro`** — Content moves to index sections
- **`src/components/MapEmbed.astro`** — Only if contact map is not included in one-pager
- **`src/components/ContactChannel.astro`** — Only if contact channels section is not included or integrated differently

### Files to Keep (reusable)
- **`src/components/Section.astro`** — Section layout wrapper
- **`src/components/SegmentedCta.astro`** — WhatsApp CTA buttons
- **`src/components/ServiceCard.astro`** — Service listing cards
- **`src/components/PainCard.astro`** — Pain points cards (if "Dolores" section kept)
- **`src/components/PillarCard.astro`** — Pillar/value cards
- **`src/components/ComparisonVisual.astro`** — Comparison table (if kept)
- **`src/components/ProcessStep.astro`** — Process steps (tenant selection)
- **`src/components/TeamMember.astro`** — Team display
- **`src/components/Footer.astro`** — Footer (update nav links)
- **`src/data/*.ts`** — All data files remain useful

## Gap Analysis

### What Must Change
| Aspect | Current | Required | Impact |
|--------|---------|----------|--------|
| **Page structure** | 4 separate pages | Single scroll page | Major restructure of index.astro |
| **Navigation** | Page links (`/services`, `/about`, `/contact`) | Anchor scroll links (`#como-funciona`, etc.) | Header.astro, Footer.astro |
| **Section order** | Hero → Pilares → Dolores → Diferenciación → Testimonios → CTA | Hero → Cómo funciona → Servicios → Tarifa → [others] | Reorder index.astro completely |
| **New section** | No "Cómo funciona" section exists | Process cycle diagram section | New component needed |
| **Pricing placement** | Buried in services page | Prominent section after services | Move pricing section |
| **Team info** | On separate about page | Part of one-pager sections | New section on index |
| **Contact info** | Separate contact page | Footer section or bottom CTA | Integrate into index |

### What to Keep (unchanged)
- Brand colors and design tokens (navy primary is established)
- Typography (Inter + Plus Jakarta Sans)
- Icon system (Material Symbols)
- WhatsApp CTAs and segmented CTA component
- Service descriptions, pillar values, pain points data
- Pricing data (7% rate)
- Team data
- Protection measures data
- Tenant selection process data

### What to Remove
- Cross-page navigation (replace with scroll anchors)
- Service page-specific structural layout
- About page-specific structural layout
- Contact page-specific structural layout
- Testimonials placeholder section (only if not in reference)

## Asset Inventory

| Asset | Type | Source | Status |
|-------|------|--------|--------|
| **Hero background image** | Photo/illustration | Could be stock or reference screenshot | Needs client clarification |
| **"Cómo funciona" cycle diagram** | Graphic/infographic | From Ancora V3 PPTX (Slide 7) | Can recreate as CSS/SVG or simplified list |
| **Service icons** | Icon vectors | Currently using Material Symbols | Already available |
| **Team photos** | Photographs | Client pending | Needs client delivery |
| **Property photos** | Photographs | Client pending | Needs client delivery |
| **ANCORA logo** | SVG/vector | Current Logo.astro is a placeholder (X mark) | **Must remain placeholder until client provides final logo** |
| **Favicon** | SVG | Current favicon.svg uses same placeholder mark | Update when logo is final |
| **Social share images** | OG images | /og/home.png etc. | Update for single-page context |
| **Process icons** | Icon vectors | Material Symbols | Already available or can use existing set |

## Logo Placeholder Requirement

**Critical:** The current ANCORA logo in `Logo.astro` is a placeholder SVG (an "X" mark inside a rounded rectangle with the brand name in a system font). The client's exploration notes state: *"Más o menos, hay algo pero no está final"* — meaning there's a logo concept but it's not finalized. The placeholder MUST remain clearly identifiable as a placeholder until the client provides the final logo. No attempt should be made to redesign or finalize the logo as part of this scope.

## Risks & Open Questions

### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Cannot see reference images** — model cannot process PNGs directly; analysis is based on extracted text, file sizes, and the Ancora V3 PPTX content | **High** | Must review slides manually or get written description from client before spec/design |
| **Client's preferred section order is partially specified** — only knows Hero → Cómo funciona → Servicios → Tarifa. Unclear where "Dolores", "Comparación", "Testimonios", "Equipo" go | **High** | Needs client clarification on full section order |
| **"Cómo funciona" process graphic** — the reference shows a cycle/flow diagram. Current site has no such component | **Medium** | Can build with SVG/CSS or simplified steps list; show to client for approval |
| **Logo placeholder** — current mark is clearly a placeholder; waiting for final logo from client | **Medium** | Flag as placeholder, don't redesign |
| **Navigation UX** — scroll-to-section nav needs smooth scroll, possible sticky highlight. Mobile burger menu needs updating | **Low** | Standard implementation, already have responsive patterns |
| **WhatsApp number** — currently a placeholder (`+591 00000000`) | **Medium** | Must get real number from client before deployment |
| **Team photos** — both team entries use initials in colored circles | **Low** | Can keep initials until photos provided |
| **SEO** — meta titles, OG images for a single-page site differ from 4-page | **Low** | Home page meta covers the single page; remove/redirect other page meta |

### Open Questions (need client clarification)

1. **Exact section order** — We know: Hero → Cómo funciona → Servicios → Tarifa. What comes after? The current "Dolores" (5 pains), "Diferenciación" (comparison table), and "Testimonios" sections exist on the homepage — do they stay, move, or get removed? Where does "Equipo" (team) and "Contacto" go?

2. **Slide 4 content** — What is the 4th slide showing? Team? Contact? Final CTA? Something else?

3. **"Cómo funciona" visual format** — The reference diagram: is it a cycle, a horizontal flow, numbered steps? Should it use an SVG infographic, or can it be simplified to a 4-6 step vertical/horizontal list?

4. **Hero background** — Slide 1 is 1.1MB suggesting a photo background. What image? Stock photo, property photo, or abstract/graphic? Should it be a full-bleed hero or contained?

5. **Are self-hosted fonts still appropriate?** Current site uses self-hosted Inter + Plus Jakarta Sans (WOFF2). Would the client prefer a different typographic treatment?

6. **Pricing card** — Current pricing shows 7% with example. The reference may show a different visual treatment. Does the client want the same data in a different layout?

7. **Testimonials** — Current site has placeholder testimonials ("próximo a publicar"). Does the reference include real testimonials, or should this section be removed entirely?

8. **Map/location** — The current contact page has an OSM map embed. Is this wanted on the one-pager?

## Approach

### Recommended Approach: Full one-pager restructure with 2-phase implementation

| Phase | What | Effort |
|-------|------|--------|
| **Phase 1: Content restructure** | Reorder index.astro sections, update Header nav to scroll anchors, move Servicios/About/Contact data into new sections on index, remove separate page files | Medium |
| **Phase 2: Visual alignment** | Build "Cómo funciona" process section, adjust colors/typography if reference differs, add hero imagery, polish responsive behavior | Medium |

**Effort: Medium** — ~70% of the work is recomposing existing components/data into a new order, ~30% is building new visual elements (process diagram) and adjusting the design system.

**Why not a full rebuild?** The existing design system, components, data, and brand assets are well-structured. A complete rewrite would discard working code that already matches the brand. The transformation is primarily structural (multi-page → single-page) and compositional (reordering sections, adding missing section).

## Ready for Proposal

**Yes, with conditions.** The exploration has sufficient clarity to proceed, BUT the following MUST be resolved before spec/design can be definitive:

1. **Manual review of Slide1-4.PNG** — someone must view the images and provide written descriptions of layout, colors, typography, imagery, exact text, and visual hierarchy for each slide
2. **Client confirmation of full section order** — beyond Hero → Cómo funciona → Servicios → Tarifa, what sections and in what order?
3. **Client answer on open questions** (especially #1, #2, #3, #4 above)

If these are resolved, the implementation is straightforward: reorder sections, update navigation, build "Cómo funciona" process component, keep everything else.
