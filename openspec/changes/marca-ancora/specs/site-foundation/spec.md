# Delta: Site Foundation

## MODIFIED Requirements

### REQ-SITE-FDN-002: Tailwind v4 design token configuration

The system MUST configure Tailwind v4 via the Vite plugin with a `@theme` block in `src/styles/global.css` defining the brand palette: a `primary-*` scale anchored on `#033744`, a `secondary-*` scale anchored on `#38525d`, an `accent-*` scale anchored on `#00d3b2`, and `surface` set to `#ffffff`. The `neutral-*` and `success-*` families MUST remain functional and unchanged.

(Previously: primary anchored on `#0e1b36`/`#0e1b24`, secondary anchored on `#243747`, accent anchored on `#c7a16a` (gold), surface `#f5f4f2`)

#### Scenario: Primary color scale is anchored on the brand deep color

- **GIVEN** an Astro 6 project with the Tailwind v4 plugin installed
- **WHEN** the developer defines `@theme { --color-primary-*: <scale-from-#033744>; }` in `src/styles/global.css`
- **THEN** Tailwind generates `bg-primary-*` and `text-primary-*` utilities mapping to the new scale, and the anchor step resolves to `#033744`

#### Scenario: Secondary and accent scales follow the brand palette

- **GIVEN** the `@theme` block configured with the primary scale
- **WHEN** the developer defines `--color-secondary-*` from `#38525d` and `--color-accent-*` from `#00d3b2`
- **THEN** Tailwind generates `bg-secondary-*`, `bg-accent-*`, `text-accent-*` and `border-accent-*` utilities over the new scales

#### Scenario: Surface is white

- **GIVEN** the `@theme` block with the brand color scales
- **WHEN** the developer sets `--color-surface` to `#ffffff`
- **THEN** the `bg-surface` utility renders a white background

#### Scenario: Neutral and success families are preserved

- **GIVEN** the `@theme` block after the rebrand
- **WHEN** the `neutral-*` and `success-*` tokens are inspected
- **THEN** both families remain defined with their existing values

### REQ-SITE-FDN-003: BaseLayout component provides shared HTML structure

The system MUST provide a `BaseLayout.astro` component that renders the HTML skeleton, `<head>` with all meta tags, `<header>`, main content slot, and `<footer>`, with `lang="es-BO"` on the root `<html>` element. The `theme-color` meta tag MUST use `#033744`.

(Previously: `theme-color` matched the primary color, which was `#0e1b24`)

#### Scenario: BaseLayout renders complete HTML skeleton

- **GIVEN** a page component importing `BaseLayout.astro`
- **WHEN** the page wraps content in `<BaseLayout title="Page Title">...</BaseLayout>`
- **THEN** the rendered HTML includes `<!DOCTYPE html>`, `<html lang="es-BO">`, `<head>` with meta tags, `<header>`, the page content, and `<footer>`

#### Scenario: theme-color reflects the brand deep color

- **GIVEN** any page rendered with `BaseLayout`
- **WHEN** the `<head>` is inspected
- **THEN** it includes `<meta name="theme-color" content="#033744">`

#### Scenario: BaseLayout includes required meta elements

- **GIVEN** any page using `BaseLayout`
- **WHEN** the page is rendered
- **THEN** the `<head>` includes `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<link rel="canonical">`, and the brand `theme-color` meta tag

### REQ-SITE-FDN-009: Centralized site configuration in TypeScript

The system MUST provide a `src/config/site.ts` module exporting configuration objects for brand name, tagline, contact details, CTA messages, and analytics configuration. The `brandName` value MUST be `'ÁNCORA'`, with the accented uppercase A.

(Previously: `brandName` was `'ANCORA'`, without the accent)

#### Scenario: Site config exports the accented brand name

- **GIVEN** the `src/config/site.ts` module
- **WHEN** a component imports and uses `site.brandName`
- **THEN** the value `'ÁNCORA'` is returned, including the accent

#### Scenario: Site config exports tagline and contact placeholders

- **GIVEN** the `src/config/site.ts` module
- **WHEN** a component imports `site.tagline`, `site.phone`, `site.email`, and `site.address`
- **THEN** the tagline and the configured contact values are returned

#### Scenario: Site config exports CTA messages

- **GIVEN** the `src/config/site.ts` module
- **WHEN** a component accesses the configured CTA messages
- **THEN** distinct Spanish messages are returned, each tailored to its WhatsApp intent

### REQ-SITE-FDN-017: Logo component is the single source of truth for brand mark

The system MUST provide a `Logo.astro` component that renders the official brand vector as inline SVG, extracted from the PSD smart objects. It MUST expose a `variant` prop accepting `'mark'` and `'wordmark'`. The `mark` variant MUST render the teal isologo "Á" in `#00d3b2`; the `wordmark` variant MUST render the "ÁNCORA" lockup with the wordmark in `currentColor` and the "Á" in `#00d3b2`. A white variant for dark surfaces MUST be achievable through `currentColor` without a separate asset. All components that display the logo MUST use `<Logo />` instead of inlining SVG markup.

(Previously: placeholder inline SVG with an X-cross mark and hardcoded `ANCORA` text)

#### Scenario: Mark variant renders the isologo

- **GIVEN** `<Logo variant="mark" />`
- **WHEN** the component is rendered
- **THEN** the output is the isologo "Á" in `#00d3b2` extracted from the brand source

#### Scenario: Wordmark variant renders the lockup

- **GIVEN** `<Logo variant="wordmark" />`
- **WHEN** the component is rendered
- **THEN** the output is the "ÁNCORA" lockup with the text in `currentColor` and the "Á" in `#00d3b2`

#### Scenario: White variant derives from currentColor

- **GIVEN** a consumer such as the footer that applies a light text color to its container
- **WHEN** `<Logo variant="wordmark" />` is rendered inside it
- **THEN** the wordmark inherits the light color through `currentColor` without requiring an additional logo asset

#### Scenario: Logo swap requires editing exactly one file

- **GIVEN** the project with all components using `<Logo />`
- **WHEN** the brand vector is updated
- **THEN** editing the SVG inside `Logo.astro` updates the logo everywhere without touching any other file

### REQ-SITE-FDN-019: Design tokens cover typography, spacing, radius, and display typeface

The system MUST define `@theme` tokens in `src/styles/global.css` for typography, spacing, and radius. The `--font-sans` token MUST resolve to Montserrat (body) and the `--font-display` token MUST resolve to MAINLUX (display/titles). Both typefaces MUST be self-hosted as latin-subset woff2 files under `public/fonts/`. Inter and Cormorant Garamond MUST be removed, including the `@fontsource/inter` dependency.

(Previously: `--font-sans` resolved to Inter and `--font-display` to Cormorant Garamond)

#### Scenario: Sans typeface is Montserrat

- **GIVEN** the `@theme` block in `global.css`
- **WHEN** the `--font-sans` token is inspected
- **THEN** it resolves to Montserrat and part of the typefaces is self-hosted from `public/fonts/`

#### Scenario: Display typeface is MAINLUX

- **GIVEN** the `@theme` block in `global.css`
- **WHEN** the `--font-display` token is inspected
- **THEN** it resolves to MAINLUX and its files are self-hosted from `public/fonts/`

#### Scenario: Legacy typefaces and dependency are removed

- **GIVEN** the project after the rebrand
- **WHEN** `src/styles/global.css`, `public/fonts/`, and `package.json` are inspected
- **THEN** no Inter or Cormorant Garamond font-face or font file remains, and `@fontsource/inter` is no longer a dependency

#### Scenario: Font tokens are used through utilities

- **GIVEN** all `.astro` component files
- **WHEN** text sizing and font-family utilities are inspected
- **THEN** typography is applied through the token-derived Tailwind utilities (`font-sans`, `font-display`, and the size scale)

### REQ-SITE-FDN-022: Centralized page meta configuration

The system MUST provide a `getPageMeta(page)` helper (in `src/config/meta.ts` or within `site.ts`) that returns `{ title, description, ogTitle, ogDescription, ogImage, canonical }`. The `ogImage` MUST reference an Open Graph image that exists and is served from the build output. `BaseLayout.astro` MUST consume this helper; individual page components MUST NOT define meta tag markup directly.

(Previously: `ogImage` referenced `/og/home.png`, which was absent from the repository)

#### Scenario: BaseLayout reads meta from helper

- **GIVEN** a page component that passes `page="home"` to `BaseLayout`
- **WHEN** `BaseLayout` renders the `<head>`
- **THEN** it calls `getPageMeta('home')` and uses the returned values for `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, and `<link rel="canonical">`

#### Scenario: Open Graph image is present in the build

- **GIVEN** the `ogImage` path returned by `getPageMeta('home')`
- **WHEN** the project is built
- **THEN** the referenced image exists in the build output and is reachable at its public URL

## ADDED Requirements

### REQ-SITE-FDN-024: Brand visual assets reflect the new identity

The system MUST provide visual assets consistent with the brand palette: `public/favicon.svg` derived from the teal isologo, and `public/images/report-interior.svg` recolored to the brand palette. No asset MAY retain the previous gold/beige tones.

#### Scenario: Favicon uses the isologo

- **GIVEN** the project after the rebrand
- **WHEN** `public/favicon.svg` is inspected
- **THEN** it renders the "Á" isologo with brand colors

#### Scenario: Report image is recolored

- **GIVEN** `public/images/report-interior.svg`
- **WHEN** the file is inspected
- **THEN** its colors belong to the brand palette and no previous gold or beige tones remain
