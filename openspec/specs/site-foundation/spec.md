# Spec: Site Foundation

## Purpose

Establish the technical foundation for the Ancora institutional website: Astro 6 scaffold, Tailwind v4 design tokens, shared layout components, SEO infrastructure, and accessibility baseline. This capability provides the plumbing that all pages consume.

## Requirements

### REQ-SITE-FDN-001: Astro 6 project initialization

The system MUST initialize an Astro 6 project in TypeScript strict mode at project root, with zero client-side JavaScript by default for all routes.

#### Scenario: Project scaffold initialization

- **GIVEN** a greenfield repository at `webs_curros/ancora/`
- **WHEN** the developer runs the Astro 6 initialization command with TypeScript strict mode enabled
- **THEN** the project scaffold is created with `astro.config.mjs`, `tsconfig.json` set to `"strict": true`, and a minimal `src/pages/index.astro` returning a 200 status

#### Scenario: Build output verification

- **GIVEN** an initialized Astro 6 project with 4 static pages
- **WHEN** the developer runs `npm run build`
- **THEN** the build succeeds, produces a `dist/` directory with pre-rendered HTML files, and the build output logs confirm 0KB of client-side JavaScript shipped by default

### REQ-SITE-FDN-002: Tailwind v4 design token configuration

The system MUST configure Tailwind v4 via the Vite plugin with a `@theme` block in `src/styles/global.css` defining a full color scale with `#0f1e36` as the primary color at appropriate scale steps, plus neutral and surface color families.

#### Scenario: Primary color scale definition

- **GIVEN** an Astro 6 project with Tailwind v4 plugin installed
- **WHEN** the developer defines `@theme { --color-primary-*: <scale-from-#0f1e36>; }` in `src/styles/global.css`
- **THEN** Tailwind generates utility classes `bg-primary-*` and `text-primary-*` mapping to the custom primary scale, and `bg-primary-600` produces `#0f1e36` or the appropriate scale step

#### Scenario: Neutral and surface token families

- **GIVEN** the `@theme` block configured with the primary scale
- **WHEN** the developer adds neutral (slate or zinc) and surface color token families
- **THEN** all three color families generate consistent utility classes, and surface colors provide off-white/cream variants for backgrounds

### REQ-SITE-FDN-003: BaseLayout component provides shared HTML structure

The system MUST provide a `BaseLayout.astro` component that renders the HTML skeleton, `<head>` with all meta tags, `<header>`, main content slot, and `<footer>`, with `lang="es-BO"` on the root `<html>` element.

#### Scenario: BaseLayout renders complete HTML skeleton

- **GIVEN** a page component importing `BaseLayout.astro`
- **WHEN** the page wraps content in `<BaseLayout title="Page Title">...</BaseLayout>`
- **THEN** the rendered HTML includes `<!DOCTYPE html>`, `<html lang="es-BO">`, `<head>` with meta tags, `<header>`, the page content, and `<footer>`

#### Scenario: BaseLayout meta tag blocks are configurable

- **GIVEN** a page component with unique content
- **WHEN** the page passes `title`, `description`, `ogTitle`, and `ogDescription` props to `BaseLayout`
- **THEN** the `<head>` renders a `<title>` tag and `<meta name="description">` with the passed values, and Open Graph tags `<meta property="og:title">` and `<meta property="og:description">` reflect the passed values

#### Scenario: BaseLayout includes required meta elements

- **GIVEN** any page using `BaseLayout`
- **WHEN** the page is rendered
- **THEN** the `<head>` includes `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<link rel="canonical">`, and `<meta name="theme-color">` matching the primary color

### REQ-SITE-FDN-004: Header component renders navigation and primary CTA

The system MUST provide a `Header.astro` component that renders the brand logo (placeholder SVG), main navigation (Servicios, Sobre nosotros, Contacto), and a primary WhatsApp CTA button with intent "evaluate".

#### Scenario: Header renders brand logo and navigation

- **GIVEN** the `BaseLayout` includes `<Header />`
- **WHEN** the page is rendered
- **THEN** the header displays the ANCORA brand logo (inline SVG placeholder), and navigation links to `/services`, `/about`, and `/contact`

#### Scenario: Header primary CTA opens WhatsApp with evaluation intent

- **GIVEN** the `Header` component with a primary CTA button
- **WHEN** a user clicks the primary CTA button
- **THEN** the browser opens WhatsApp with the phone number from `site.ts` and a pre-filled Spanish message expressing intent to evaluate a property

#### Scenario: Header navigation is responsive

- **GIVEN** the `Header` component on mobile viewport (375px baseline)
- **WHEN** the page loads
- **THEN** the navigation either collapses into a hamburger menu or stacks vertically, and all links remain accessible via keyboard navigation

### REQ-SITE-FDN-005: Footer component renders contact summary and social links

The system MUST provide a `Footer.astro` component that renders the tagline "Administramos. Vos descansás.", contact summary (phone, email, address placeholders), social link placeholders, and copyright notice.

#### Scenario: Footer renders tagline and contact summary

- **GIVEN** the `BaseLayout` includes `<Footer />`
- **WHEN** the page is rendered
- **THEN** the footer displays the tagline, phone number, email address, and physical address (all placeholders from `site.ts`)

#### Scenario: Footer includes social link placeholders

- **GIVEN** the `Footer` component with social handles configured in `site.ts`
- **WHEN** the page is rendered
- **THEN** the footer displays icon links for each social network (placeholders), and clicking each link opens the configured URL in a new tab

#### Scenario: Footer copyright and legal notice

- **GIVEN** the `Footer` component
- **WHEN** the page is rendered
- **THEN** the footer includes copyright text with the current year and the company name "ANCORA"

### REQ-SITE-FDN-006: Skip-to-main-content link for keyboard navigation

The system MUST include a skip-to-main-content link as the first focusable element in the page, hidden by default but visible on focus, allowing keyboard users to bypass navigation.

#### Scenario: Skip link appears on keyboard focus

- **GIVEN** a page rendered with `BaseLayout`
- **WHEN** a keyboard user presses Tab to navigate
- **THEN** the first focusable element is a skip-to-main-content link, which becomes visible when focused

#### Scenario: Skip link bypasses navigation

- **GIVEN** the skip-to-main-content link focused
- **WHEN** a keyboard user presses Enter
- **THEN** the focus moves directly to the main content area, skipping the header and navigation

### REQ-SITE-FDN-007: Sitemap generation via Astro sitemap integration

The system MUST integrate `@astrojs/sitemap` to automatically generate a `sitemap.xml` file at build time, listing all public pages.

#### Scenario: Sitemap is generated on build

- **GIVEN** an Astro 6 project with `@astrojs/sitemap` installed and configured in `astro.config.mjs`
- **WHEN** the developer runs `npm run build`
- **THEN** a `sitemap.xml` file is generated in the `dist/` directory, listing all public routes (/, /services, /about, /contact)

#### Scenario: Sitemap includes all configured pages

- **GIVEN** the sitemap is generated
- **WHEN** the developer inspects the `sitemap.xml` file
- **THEN** the sitemap includes entries for the homepage, services page, about page, and contact page, each with a valid `loc` URL and `lastmod` timestamp

### REQ-SITE-FDN-008: Robots.txt configuration

The system MUST include a `public/robots.txt` file that allows all user agents and references the sitemap URL.

#### Scenario: Robots.txt allows all crawlers

- **GIVEN** a `public/robots.txt` file
- **WHEN** a search engine crawler requests `/robots.txt`
- **THEN** the file returns `User-agent: *` and `Allow: /`, granting full crawl access

#### Scenario: Robots.txt references sitemap

- **GIVEN** the `robots.txt` file
- **WHEN** a search engine crawler reads the file
- **THEN** the file includes a `Sitemap:` directive pointing to the sitemap URL (e.g., `https://ancora.com.bo/sitemap.xml`)

### REQ-SITE-FDN-009: Centralized site configuration in TypeScript

The system MUST provide a `src/config/site.ts` module exporting configuration objects for brand name, tagline, contact details (placeholders), CTA messages, and analytics configuration.

#### Scenario: Site config exports brand identity

- **GIVEN** the `src/config/site.ts` module
- **WHEN** a component imports and uses `site.brandName` and `site.tagline`
- **THEN** the values "ANCORA" and "Administramos. Vos descansás." are returned

#### Scenario: Site config exports contact placeholders

- **GIVEN** the `src/config/site.ts` module
- **WHEN** a component imports `site.phone`, `site.email`, and `site.address`
- **THEN** placeholder values are returned (e.g., "+591 XXXXXXXX", "contacto@ancora.com.bo", "Dirección placeholder")

#### Scenario: Site config exports CTA messages

- **GIVEN** the `src/config/site.ts` module
- **WHEN** a component accesses `site.ctaMessages.evaluate`, `site.ctaMessages.general`, and `site.ctaMessages.process`
- **THEN** three distinct Spanish messages are returned, each tailored to the specific WhatsApp intent

### REQ-SITE-FDN-010: WhatsApp link builder helper function

The system MUST provide a `whatsappLink(intent: 'evaluate' | 'general' | 'process')` helper function that constructs a properly formatted `https://wa.me/` URL with the phone number and encoded message.

#### Scenario: whatsappLink constructs evaluate intent URL

- **GIVEN** the `whatsappLink` helper function and `site.whatsapp` configured with a phone number
- **WHEN** a component calls `whatsappLink('evaluate')`
- **THEN** the function returns a `https://wa.me/` URL with the phone number and URL-encoded Spanish message expressing property evaluation intent

#### Scenario: whatsappLink constructs general info intent URL

- **GIVEN** the `whatsappLink` helper function
- **WHEN** a component calls `whatsappLink('general')`
- **THEN** the function returns a `https://wa.me/` URL with the phone number and URL-encoded Spanish message requesting general information

#### Scenario: whatsappLink constructs process info intent URL

- **GIVEN** the `whatsappLink` helper function
- **WHEN** a component calls `whatsappLink('process')`
- **THEN** the function returns a `https://wa.me/` URL with the phone number and URL-encoded Spanish message requesting tenant selection process information

### REQ-SITE-FDN-011: Respects user motion preferences

The system MUST respect the `prefers-reduced-motion` media query globally, disabling or reducing animations for users who request reduced motion.

#### Scenario: Reduced motion disables animations

- **GIVEN** a user with `prefers-reduced-motion: reduce` set in their OS accessibility settings
- **WHEN** the user views any page on the site
- **THEN** all animations, transitions, and parallax effects are disabled or reduced to instantaneous changes

#### Scenario: Default animations play for non-reduced-motion users

- **GIVEN** a user with default motion preferences
- **WHEN** the user views any page on the site
- **THEN** animations and transitions play as designed, with smooth timing functions

### REQ-SITE-FDN-012: Focus-visible outline for interactive elements

The system MUST apply a custom focus-visible outline to all interactive elements (links, buttons, form inputs) that is visible only when the element receives focus via keyboard navigation, not mouse clicks.

#### Scenario: Keyboard focus shows outline

- **GIVEN** an interactive element (link or button)
- **WHEN** a keyboard user navigates to the element via Tab
- **THEN** a visible outline (e.g., 2px solid primary color) appears around the element

#### Scenario: Mouse click does not show outline

- **GIVEN** an interactive element
- **WHEN** a mouse user clicks the element
- **THEN** no outline appears around the element after the click

### REQ-SITE-FDN-013: WCAG 2.2 AA color contrast compliance

The system MUST ensure all foreground-background color combinations meet WCAG 2.2 AA contrast requirements (4.5:1 for normal text, 3:1 for large text and UI components).

#### Scenario: Normal text contrast passes WCAG AA

- **GIVEN** normal-sized text rendered with foreground color on a background color
- **WHEN** the contrast ratio is measured
- **THEN** the ratio is at least 4.5:1, meeting WCAG 2.2 AA requirements

#### Scenario: Large text and UI component contrast passes WCAG AA

- **GIVEN** large text (18pt/14px bold or larger) or a UI component (icon, button border) rendered with foreground color on a background color
- **WHEN** the contrast ratio is measured
- **THEN** the ratio is at least 3:1, meeting WCAG 2.2 AA requirements

### REQ-SITE-FDN-014: Language consistency across code and content

The system MUST use English for all code, identifiers, alt text, and aria-labels, while using Spanish (es-BO neutral) for all visible copy, meta descriptions, and Open Graph tags.

#### Scenario: Visible copy is in Spanish

- **GIVEN** a page component
- **WHEN** the page is rendered
- **THEN** all visible text content is in Spanish (es-BO neutral), including headings, paragraphs, buttons, and navigation labels

#### Scenario: Code identifiers are in English

- **GIVEN** a component, function, or variable name
- **WHEN** the identifier is examined
- **THEN** the identifier uses English words (e.g., `whatsappLink`, `evaluateIntent`, `siteConfig`)

#### Scenario: Meta and OG tags are in Spanish

- **GIVEN** the `<head>` meta tags
- **WHEN** the page is rendered
- **THEN** the meta description and Open Graph title/description are in Spanish (es-BO neutral)

### REQ-SITE-FDN-015: Shared component directory with standard names

The system MUST provide the following shared Astro components in `src/components/`, each with a single responsibility and a documented props interface. No page component SHALL duplicate markup that belongs to a shared component.

- `Header.astro` — brand logo + nav + primary CTA (REQ-SITE-FDN-004)
- `Footer.astro` — tagline + contact + social + copyright (REQ-SITE-FDN-005)
- `Logo.astro` — inline SVG placeholder, swappable via single file edit
- `Section.astro` — semantic section wrapper with optional eyebrow, heading, intro, and default slot (see REQ-SITE-FDN-024)
- `SegmentedCta.astro` — WhatsApp CTA button that accepts `intent: 'evaluate' | 'general' | 'process'`, renders the correct link via `whatsappLink()`, and applies consistent visual styling
- `PillarCard.astro` — renders one brand pillar (title + description), accepts data via props
- `PainCard.astro` — renders one pain point (number + title + description), accepts data via props
- `ProcessStep.astro` — renders one numbered step (number + title + description), accepts data via props
- `ServiceCard.astro` — renders one service bullet (icon + title + description), accepts data via props
- `TeamMember.astro` — renders one team member (avatar placeholder + name + credentials + education), accepts data via props
- `ContactChannel.astro` — renders one contact method (icon + label + link), accepts data via props
- `MapEmbed.astro` — renders an iframe map embed, accepts `address` prop

#### Scenario: Component directory structure is present

- **GIVEN** the Astro project scaffold
- **WHEN** the `src/components/` directory is inspected
- **THEN** all 12 component files listed above exist as `.astro` files

#### Scenario: No page component duplicates shared markup

- **GIVEN** any page component in `src/pages/`
- **WHEN** the page source is inspected
- **THEN** the page imports and uses shared components from `src/components/` for header, footer, CTAs, cards, and sections; it does NOT contain inline `<header>`, `<footer>`, or duplicated CTA link construction

### REQ-SITE-FDN-016: SegmentedCta is the single source of truth for WhatsApp CTAs

The system MUST provide a `SegmentedCta.astro` component that is the ONLY component allowed to render WhatsApp CTA links. All pages and components MUST use `<SegmentedCta>` instead of constructing `wa.me` URLs directly.

#### Scenario: SegmentedCta renders correct link for each intent

- **GIVEN** a `<SegmentedCta intent="evaluate" />` component
- **WHEN** the component is rendered
- **THEN** the link `href` matches the output of `whatsappLink('evaluate')` exactly

#### Scenario: No raw wa.me URLs outside SegmentedCta

- **GIVEN** all `.astro` files in the project
- **WHEN** the source is searched for `wa.me` or `whatsapp`
- **THEN** the only occurrences are inside `SegmentedCta.astro` and `src/config/site.ts` (the helper); no page component constructs a WhatsApp URL directly

### REQ-SITE-FDN-017: Logo component is the single source of truth for brand mark

The system MUST provide a `Logo.astro` component that renders the brand logo as an inline SVG placeholder. All components that display the logo MUST use `<Logo />` instead of inlining SVG markup.

#### Scenario: Logo component renders placeholder SVG

- **GIVEN** the `Logo.astro` component
- **WHEN** the component is rendered
- **THEN** an inline SVG is output with the text "ANCORA" or a geometric placeholder, using primary color

#### Scenario: Logo swap requires editing exactly one file

- **GIVEN** the project with all components using `<Logo />`
- **WHEN** the final logo SVG is provided
- **THEN** replacing the SVG content inside `Logo.astro` updates the logo everywhere (header, footer, any future location) without touching any other file

### REQ-SITE-FDN-018: Centralized content data files

The system MUST store all site content (pains, pillars, services, process steps, protection measures, team members, pricing data) in typed TypeScript data files under `src/data/`. Page and component components MUST import from these data files and MUST NOT hardcode content strings.

Required data files:
- `src/data/pillars.ts` — array of `{ title: string; description: string }` for the 3 brand pillars
- `src/data/pains.ts` — array of `{ number: number; title: string; description: string }` for the 5 pain points
- `src/data/services.ts` — array of `{ title: string; description: string }` for the 6+1 service items
- `src/data/tenantSelectionSteps.ts` — array of `{ step: number; title: string; description: string }` for the 4 tenant selection steps
- `src/data/protectionMeasures.ts` — array of `{ title: string; description: string }` for the 5 investment protection measures
- `src/data/team.ts` — array of `{ name: string; initials: string; credentials: string; education: string; experience: string }` for the 2 team members
- `src/data/pricing.ts` — `{ rate: string; example: { rent: string; fee: string; net: string }; disclaimer: string }` for the pricing model

#### Scenario: Pillar data is imported from data file

- **GIVEN** the home page or any component rendering the three pillars
- **WHEN** the component source is inspected
- **THEN** it imports from `src/data/pillars.ts` and iterates over the array; no pillar title or description string is hardcoded in the component

#### Scenario: All content strings are in data files

- **GIVEN** all `.astro` component files
- **WHEN** the source is searched for Spanish-language strings (headings, descriptions, labels)
- **THEN** the only Spanish strings in component files are structural/grammatical glue (e.g., section headings that are unique to a page layout); all repeatable content (pillars, pains, services, steps, team) is imported from `src/data/`

### REQ-SITE-FDN-019: Design tokens cover typography, spacing, and radius

The system MUST define `@theme` blocks in `src/styles/global.css` for `--font-family-*` (at minimum sans and body), `--font-size-*` (scale from xs to 4xl or equivalent), `--spacing-*` (scale from 0 to 24 or equivalent), and `--radius-*` (none, sm, md, lg, full). These tokens MUST be used via Tailwind utilities throughout the project; no raw magic numbers (`p-7`, `text-[17px]`, `rounded-[12px]`) SHALL appear in component code.

#### Scenario: Typography scale is defined and used

- **GIVEN** the `@theme` block in `global.css`
- **WHEN** the font size tokens are inspected
- **THEN** a consistent scale is defined (e.g., `--font-size-xs` through `--font-size-4xl`), and all component text sizing uses the corresponding Tailwind utilities (e.g., `text-sm`, `text-lg`, `text-3xl`)

#### Scenario: No magic numbers in component styles

- **GIVEN** all `.astro` component files
- **WHEN** the source is searched for arbitrary value syntax (e.g., `text-[`, `p-[`, `rounded-[`)
- **THEN** no arbitrary value overrides exist; all sizing uses the design token scale

### REQ-SITE-FDN-020: Layout container utility

The system MUST define a reusable layout container that enforces consistent max-width, horizontal padding, and centering across all pages and sections. This container MUST be applied consistently via a component wrapper or a shared Tailwind utility class.

#### Scenario: Consistent container width across all pages

- **GIVEN** all page components and sections
- **WHEN** the rendered pages are inspected
- **THEN** all content sections share the same max-width and horizontal padding, defined by a single source (either a shared utility class or the `Section` component)

### REQ-SITE-FDN-021: Section wrapper component

The system MUST provide a `Section.astro` component in `src/components/` that wraps every major content block on every page. The component MUST accept optional props for `id`, `eyebrow` (small label above heading), `heading` (H2), `intro` (paragraph), and expose a default slot for body content. It MUST apply consistent vertical padding and the shared layout container.

#### Scenario: Section renders semantic structure

- **GIVEN** a `<Section id="pillars" heading="Nuestros compromisos" intro="...">...</Section>` usage
- **WHEN** the component is rendered
- **THEN** the output includes `<section id="pillars" aria-labelledby="pillars-heading">`, an optional eyebrow `<span>`, an `<h2 id="pillars-heading">`, an optional intro `<p>`, and the slotted body content

#### Scenario: Section applies consistent vertical spacing

- **GIVEN** all `<Section>` usages across all pages
- **WHEN** the rendered pages are inspected
- **THEN** all sections have identical vertical padding (top and bottom), defined by a design token value

### REQ-SITE-FDN-022: Centralized page meta configuration

The system MUST provide a `getPageMeta(page: 'home' | 'services' | 'about' | 'contact')` helper (in `src/config/meta.ts` or within `site.ts`) that returns `{ title, description, ogTitle, ogDescription, ogImage, canonical }` for each page. `BaseLayout.astro` MUST consume this helper; individual page components MUST NOT define meta tag markup directly.

#### Scenario: BaseLayout reads meta from helper

- **GIVEN** a page component that passes `page="home"` to `BaseLayout`
- **WHEN** `BaseLayout` renders the `<head>`
- **THEN** it calls `getPageMeta('home')` and uses the returned values for `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, and `<link rel="canonical">`

#### Scenario: Meta content is maintained in one place

- **GIVEN** the `getPageMeta` helper function
- **WHEN** the meta description for the home page needs to be updated
- **THEN** the change is made in `src/config/meta.ts` (or `site.ts`) only; no page component is modified

### REQ-SITE-FDN-023: Color contrast validation for design tokens

The system MUST validate that the primary color `#0f1e36` combined with all surface/text token combinations meets WCAG 2.2 AA contrast requirements at the design token level, before any components are built.

#### Scenario: Primary on white passes AA

- **GIVEN** the primary color `#0f1e36` as text on a white `#ffffff` background
- **WHEN** the contrast ratio is calculated
- **THEN** the ratio is at least 4.5:1 for normal text

#### Scenario: White on primary passes AA for large text

- **GIVEN** white `#ffffff` text on the primary `#0f1e36` background
- **WHEN** the contrast ratio is calculated
- **THEN** the ratio is at least 3:1 for large text (18pt/14px bold or larger)