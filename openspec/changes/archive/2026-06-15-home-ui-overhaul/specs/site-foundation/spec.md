# Delta: Site Foundation

## MODIFIED Requirements

### REQ-SITE-FDN-002: Tailwind v4 design token configuration

The system MUST configure Tailwind v4 via the Vite plugin with a `@theme` block in `src/styles/global.css` defining a full color scale with `#0f1e36` as the primary color at appropriate scale steps, plus neutral, surface, and accent color families.

(Previously: primary, neutral, and surface families only — no accent)

#### Scenario: Primary color scale definition

- **GIVEN** an Astro 6 project with Tailwind v4 plugin installed
- **WHEN** the developer defines `@theme { --color-primary-*: <scale-from-#0f1e36>; }` in `src/styles/global.css`
- **THEN** Tailwind generates utility classes `bg-primary-*` and `text-primary-*` mapping to the custom primary scale, and `bg-primary-600` produces `#0f1e36` or the appropriate scale step

#### Scenario: Neutral and surface token families

- **GIVEN** the `@theme` block configured with the primary scale
- **WHEN** the developer adds neutral (slate or zinc) and surface color token families
- **THEN** all three color families generate consistent utility classes, and surface colors provide off-white/cream variants for backgrounds

#### Scenario: Accent color token family is defined

- **GIVEN** the `@theme` block configured with primary, neutral, and surface families
- **WHEN** the developer adds an accent color family (e.g., `--color-accent-*`)
- **THEN** Tailwind generates utility classes `bg-accent-*`, `text-accent-*`, and `border-accent-*`, and all accent-to-surface combinations pass WCAG AA contrast per REQ-SITE-FDN-023

### REQ-SITE-FDN-015: Shared component directory with standard names

The system MUST provide the following shared Astro components in `src/components/`, each with a single responsibility and a documented props interface. No page component SHALL duplicate markup that belongs to a shared component.

(Previously: Listed 12 components; PainCard used `number` prop)

- `Header.astro` — brand logo + nav + primary CTA (REQ-SITE-FDN-004)
- `Footer.astro` — tagline + contact + social + copyright (REQ-SITE-FDN-005)
- `Logo.astro` — inline SVG placeholder, swappable via single file edit
- `Section.astro` — semantic section wrapper with optional rhythm scale prop (see REQ-SITE-FDN-021)
- `SegmentedCta.astro` — WhatsApp CTA button that accepts `intent: 'evaluate' | 'general' | 'process'`, renders the correct link via `whatsappLink()`, and applies consistent visual styling
- `PillarCard.astro` — renders one brand pillar (icon + title + description), accepts data via props
- `PainCard.astro` — renders one pain point (icon/visual label + title + description), accepts data via props
- `ProcessStep.astro` — renders one numbered step (number + title + description), accepts data via props
- `ServiceCard.astro` — renders one service item (icon + title + description), accepts data via props
- `TeamMember.astro` — renders one team member (avatar placeholder + name + credentials + education), accepts data via props
- `ContactChannel.astro` — renders one contact method (icon + label + link), accepts data via props
- `MapEmbed.astro` — renders an iframe map embed, accepts `address` prop
- `ComparisonVisual.astro` — renders the "Alquilar vs Administrar" comparison (coverage cards or phase timeline), accepts coverage data via props

#### Scenario: Component directory structure is present

- **GIVEN** the Astro project scaffold
- **WHEN** the `src/components/` directory is inspected
- **THEN** all 13 component files listed above exist as `.astro` files

#### Scenario: PainCard no longer receives a numeric marker

- **GIVEN** a `<PainCard>` usage on the home page
- **WHEN** the component's props are inspected
- **THEN** the component does NOT receive a `number` or `step` prop; it receives an icon or visual identifier in its place

### REQ-SITE-FDN-018: Centralized content data files

The system MUST store all site content in typed TypeScript data files under `src/data/`. Page and component components MUST import from these data files and MUST NOT hardcode content strings.

(Previously: pains.ts used `{ number: number; ... }` shape)

Required data files:
- `src/data/pillars.ts` — array of `{ title: string; description: string }` for the 3 brand pillars
- `src/data/pains.ts` — array of `{ icon: string; title: string; description: string }` for the 5 pain points
- `src/data/services.ts` — array of `{ title: string; description: string }` for the 6+1 service items
- `src/data/tenantSelectionSteps.ts` — array of `{ step: number; title: string; description: string }` for the 4 tenant selection steps
- `src/data/protectionMeasures.ts` — array of `{ title: string; description: string }` for the 5 investment protection measures
- `src/data/team.ts` — array of `{ name: string; initials: string; credentials: string; education: string; experience: string }` for the 2 team members
- `src/data/pricing.ts` — `{ rate: string; example: { rent: string; fee: string; net: string }; disclaimer: string }` for the pricing model

#### Scenario: Pain data uses icon/label instead of numeric index

- **GIVEN** the `src/data/pains.ts` module
- **WHEN** the data shape is inspected
- **THEN** each pain entry uses an `icon` or string identifier field instead of a `number` field, and no component rendering a pain item displays a sequential numeric marker

### REQ-SITE-FDN-019: Design tokens cover typography, spacing, radius, and display typeface

The system MUST define `@theme` blocks in `src/styles/global.css` for `--font-family-*` (at minimum sans, body, and display), `--font-size-*` (scale from xs to 4xl or equivalent), `--spacing-*` (scale from 0 to 24 or equivalent), and `--radius-*` (none, sm, md, lg, full). These tokens MUST be used via Tailwind utilities throughout the project; no raw magic numbers SHALL appear in component code.

(Previously: required `--font-family-sans` and `--font-family-body` only)

#### Scenario: Typography scale is defined and used

- **GIVEN** the `@theme` block in `global.css`
- **WHEN** the font size tokens are inspected
- **THEN** a consistent scale is defined (e.g., `--font-size-xs` through `--font-size-4xl`), and all component text sizing uses the corresponding Tailwind utilities (e.g., `text-sm`, `text-lg`, `text-3xl`)

#### Scenario: Display typeface token is defined and consumed on home page

- **GIVEN** the `@theme` block in `global.css`
- **WHEN** the font family tokens are inspected
- **THEN** a `--font-family-display` token is defined, pointing to a distinct typeface from sans/body, and the home page hero heading uses the `font-display` utility class

#### Scenario: No magic numbers in component styles

- **GIVEN** all `.astro` component files
- **WHEN** the source is searched for arbitrary value syntax (e.g., `text-[`, `p-[`, `rounded-[`)
- **THEN** no arbitrary value overrides exist; all sizing uses the design token scale

### REQ-SITE-FDN-021: Section wrapper component with rhythm scale

The system MUST provide a `Section.astro` component in `src/components/` that wraps every major content block on every page. The component MUST accept optional props for `id`, `eyebrow`, `heading` (H2), `intro` (paragraph), `padding` (rhythm variant name), and expose a default slot for body content. It MUST apply the shared layout container.

(Previously: required identical vertical padding on all sections)

#### Scenario: Section renders semantic structure

- **GIVEN** a `<Section id="pillars" heading="Nuestros compromisos" intro="...">...</Section>`
- **WHEN** the component is rendered
- **THEN** the output includes `<section id="pillars" aria-labelledby="pillars-heading">`, an optional eyebrow `<span>`, an `<h2 id="pillars-heading">`, an optional intro `<p>`, and the slotted body content

#### Scenario: Section applies padding from a rhythm scale

- **GIVEN** `<Section>` usages across the home page with different `padding` prop values
- **WHEN** the rendered sections are inspected
- **THEN** each section applies a top/bottom padding chosen from a discrete scale (e.g., `compact`, `default`, `spacious`), instead of requiring identical padding on every section

### REQ-SITE-FDN-023: Color contrast validation for all design tokens

The system MUST validate that the primary color `#0f1e36`, the accent color (chosen during design), and all surface/text token combinations meet WCAG 2.2 AA contrast requirements at the design token level, before any components are built.

(Previously: validated primary color only)

#### Scenario: Primary on white passes AA

- **GIVEN** the primary color `#0f1e36` as text on a white `#ffffff` background
- **WHEN** the contrast ratio is calculated
- **THEN** the ratio is at least 4.5:1 for normal text

#### Scenario: White on primary passes AA for large text

- **GIVEN** white `#ffffff` text on the primary `#0f1e36` background
- **WHEN** the contrast ratio is calculated
- **THEN** the ratio is at least 3:1 for large text (18pt/14px bold or larger)

#### Scenario: Accent color on surface passes AA

- **GIVEN** the accent color token used as text or background on a surface variant
- **WHEN** the contrast ratio is calculated
- **THEN** the ratio meets WCAG 2.2 AA requirements: at least 4.5:1 for normal text, at least 3:1 for large text and UI elements
