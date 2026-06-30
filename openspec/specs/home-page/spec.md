# Spec: Home Page

## Purpose

The home page converts property owners into leads by presenting the value proposition clearly: the three brand pillars (Rentabilidad, Protección, Tranquilidad), the five pains of self-administration, the differentiation from traditional real-estate agencies, and a clear path to contact via WhatsApp.

## Requirements

### REQ-HOME-001: Hero section with headline, segmented CTAs, and visual anchor

The system MUST render a hero section with a Spanish H1 headline, subhead, a primary CTA button (WhatsApp with evaluate intent), a secondary CTA button (WhatsApp with general info intent), and a visual anchor element (image, illustration, CSS pattern, or abstract graphic) alongside the text content.

To optimize space on mobile viewports (<768px), the H1 headline MUST scale down to `text-4xl` with `leading-tight` line height, and the 3-pillar trust strip MUST render immediately below the Hero section rather than inside it, styling the trust pillars with high-contrast text (`text-primary-600`) over a white background.

(Previously: Text-only hero with headline, subhead, and two CTAs)

#### Scenario: Hero renders headline and subhead in Spanish

- **GIVEN** the home page rendered in a browser
- **WHEN** the hero section is inspected
- **THEN** the section includes an H1 heading in Spanish expressing the value proposition, and a subhead paragraph in Spanish elaborating on the message

#### Scenario: Hero primary CTA opens WhatsApp with evaluate intent

- **GIVEN** the hero section with a primary CTA button
- **WHEN** a user clicks the primary CTA button
- **THEN** the browser opens WhatsApp with the phone number from `site.ts` and a pre-filled Spanish message requesting a property evaluation

#### Scenario: Hero secondary CTA opens WhatsApp with general info intent

- **GIVEN** the hero section with a secondary CTA button
- **WHEN** a user clicks the secondary CTA button
- **THEN** the browser opens WhatsApp with the phone number and a pre-filled Spanish message requesting general information about ANCORA's services

#### Scenario: Hero includes a visual anchor element

- **GIVEN** the hero section rendered in a browser
- **WHEN** the hero section is inspected
- **THEN** a visual anchor (image, illustration, CSS pattern, or abstract graphic) is rendered alongside the headline and subhead, adding spatial depth beyond a flat background color

### REQ-HOME-002: Three-pillar section renders brand commitments

The system MUST render a section displaying the three brand pillars (Rentabilidad, Protección, Tranquilidad) with verbatim Spanish copy from the pitch material.

#### Scenario: Pillar section displays Rentabilidad

- **GIVEN** the three-pillar section
- **WHEN** the page is rendered
- **THEN** the first pillar displays the title "Rentabilidad" and the Spanish copy "Menos vacancia. Más ingresos consistentes."

#### Scenario: Pillar section displays Protección

- **GIVEN** the three-pillar section
- **WHEN** the page is rendered
- **THEN** the second pillar displays the title "Protección" and the Spanish copy "Contratos sólidos. Menor riesgo legal y operativo."

#### Scenario: Pillar section displays Tranquilidad

- **GIVEN** the three-pillar section
- **WHEN** the page is rendered
- **THEN** the third pillar displays the title "Tranquilidad" and the Spanish copy "Todo gestionado. Menos tiempo invertido por vos."

### REQ-HOME-003: Five-pain section renders owner pain points

The system MUST render a section displaying the five pains of property self-administration (Vacancia, Mora, Mantenimiento, Riesgo legal, Entrega) with verbatim Spanish copy from the pitch material. Each pain item MUST be identified by a non-sequential visual label or icon — NOT by a numeric marker (01–05).

(Previously: Pains identified by sequential numbered markers 01–05)

#### Scenario: Pain section renders Vacancia with non-sequential label

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** a pain item displays the title "Vacancia" and the Spanish copy "Cada mes vacío representa ingresos perdidos.", with an icon or non-numeric visual identifier instead of a sequential number

#### Scenario: Pain section renders Mora

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** a pain item displays the title "Mora" and the Spanish copy "Los atrasos afectan el flujo de caja y generan conflictos.", with a non-sequential icon or visual label

#### Scenario: Pain section renders Mantenimiento

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** a pain item displays the title "Mantenimiento" and the Spanish copy "Coordinar técnicos y supervisar reparaciones consume tiempo.", with a non-sequential icon or visual label

#### Scenario: Pain section renders Riesgo legal

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** a pain item displays the title "Riesgo legal" and the Spanish copy "Contratos deficientes generan exposición y conflictos.", with a non-sequential icon or visual label

#### Scenario: Pain section renders Entrega

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** a pain item displays the title "Entrega" and the Spanish copy "Garantías, daños y conciliaciones al finalizar.", with a non-sequential icon or visual label

### REQ-HOME-004: Differentiation section compares alquiler vs administrar

The system MUST render a "Alquilar vs Administrar" comparison section using a visual comparison component (coverage cards or phase timeline) that compares ANCORA's full-service coverage across three phases (Captación, Administración, Renovación & Cierre) versus traditional agencies' partial coverage. The component MUST NOT require horizontal scrolling at 375px viewport width.

(Previously: Three-column HTML table with checkmarks (✓) and crossmarks (✗) requiring min-w-160)

#### Scenario: Comparison section renders three phases

- **GIVEN** the differentiation section
- **WHEN** the page is rendered
- **THEN** a visual comparison component displays coverage across three phases (Captación, Administración, Renovación & Cierre) comparing traditional agency vs ANCORA, and includes an explanatory footer

#### Scenario: No horizontal scroll at 375px

- **GIVEN** the differentiation section rendered on a 375px viewport
- **WHEN** the page is rendered
- **THEN** the comparison component does not require horizontal scrolling; all content fits within the viewport width without overflow

#### Scenario: ANCORA shows full coverage

- **GIVEN** the visual comparison component
- **WHEN** the page is rendered
- **THEN** ANCORA is shown with full coverage across all services (Captación, Evaluación, Contrato, Cobranza, Seguimiento, Mantenimiento, Renovación, Entrega, Cierre)

#### Scenario: Comparison includes explanatory footer

- **GIVEN** the differentiation section
- **WHEN** the page is rendered
- **THEN** the comparison is followed by a footer sentence in Spanish: "Muchas inmobiliarias terminan su trabajo cuando se firma el contrato. ANCORA continúa administrando durante toda la relación contractual."

### REQ-HOME-005: Social proof section as testimonial placeholder

The system MUST render a social proof section with placeholder testimonial slots, indicating where real customer testimonials will appear in future iterations.

#### Scenario: Social proof section displays placeholder slots

- **GIVEN** the social proof section
- **WHEN** the page is rendered
- **THEN** the section displays one or more placeholder blocks indicating where testimonials will appear, with placeholder text like "Testimonio de cliente" or similar

#### Scenario: Placeholder includes visual structure for future content

- **GIVEN** the social proof placeholder
- **WHEN** the page is rendered
- **THEN** the placeholder includes visual structure (e.g., quote icon, name placeholder, rating placeholder) that matches the intended layout for real testimonials

### REQ-HOME-006: Final CTA band with evaluate intent

The system MUST render a final CTA section with a prominent call-to-action button that opens WhatsApp with the evaluate intent message.

#### Scenario: Final CTA displays action-oriented copy

- **GIVEN** the final CTA section
- **WHEN** the page is rendered
- **THEN** the section displays Spanish text encouraging property owners to evaluate their property, such as "Agendá una evaluación sin costo de tu propiedad."

#### Scenario: Final CTA button opens WhatsApp with evaluate intent

- **GIVEN** the final CTA section with a button
- **WHEN** a user clicks the button
- **THEN** the browser opens WhatsApp with the phone number and a pre-filled Spanish message requesting a property evaluation

### REQ-HOME-007: Per-page meta tags in Spanish

The system MUST render per-page meta tags (title, description, Open Graph title, Open Graph description, Open Graph image placeholder, canonical link) for the home page, all in Spanish (es-BO neutral).

#### Scenario: Home page title tag is in Spanish

- **GIVEN** the home page rendered
- **WHEN** the `<title>` tag is inspected
- **THEN** the title is in Spanish and includes the brand name and a concise description of the page content

#### Scenario: Home page meta description is in Spanish

- **GIVEN** the home page rendered
- **WHEN** the `<meta name="description">` tag is inspected
- **THEN** the description is in Spanish, summarizes the value proposition, and is optimized for search engines (150-160 characters recommended)

#### Scenario: Home page Open Graph tags are in Spanish

- **GIVEN** the home page rendered
- **WHEN** the Open Graph tags are inspected
- **THEN** the `og:title` and `og:description` are in Spanish, and `og:image` is set to a placeholder image URL

#### Scenario: Home page canonical link is set

- **GIVEN** the home page rendered
- **WHEN** the `<link rel="canonical">` tag is inspected
- **THEN** the canonical URL points to the homepage (e.g., `https://ancora.com.bo/`)

### REQ-HOME-008: JSON-LD Organization schema

The system MUST inject a JSON-LD `Organization` schema in the `<head>` or at the end of the body for the home page, providing structured data about ANCORA for search engines.

#### Scenario: JSON-LD Organization schema is present

- **GIVEN** the home page rendered
- **WHEN** the page source is inspected
- **THEN** a `<script type="application/ld+json">` block is present containing an `Organization` schema

#### Scenario: Organization schema includes basic metadata

- **GIVEN** the JSON-LD Organization schema
- **WHEN** the schema content is inspected
- **THEN** the schema includes `@type: "Organization"`, `name: "ANCORA"`, `url: "https://ancora.com.bo"`, and placeholder values for `address`, `telephone`, and `email`