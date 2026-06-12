# Spec: Home Page

## Purpose

The home page converts property owners into leads by presenting the value proposition clearly: the three brand pillars (Rentabilidad, Protección, Tranquilidad), the five pains of self-administration, the differentiation from traditional real-estate agencies, and a clear path to contact via WhatsApp.

## Requirements

### REQ-HOME-001: Hero section with headline and segmented CTAs

The system MUST render a hero section with a Spanish H1 headline, subhead, a primary CTA button (WhatsApp with evaluate intent), and a secondary CTA button (WhatsApp with general info intent).

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

The system MUST render a section displaying the five pains of property self-administration (Vacancia, Mora, Mantenimiento, Riesgo legal, Entrega) with verbatim Spanish copy from the pitch material.

#### Scenario: Pain section displays Vacancia

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** the first pain item displays the title "Vacancia" and the Spanish copy "Cada mes vacío representa ingresos perdidos."

#### Scenario: Pain section displays Mora

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** the second pain item displays the title "Mora" and the Spanish copy "Los atrasos afectan el flujo de caja y generan conflictos."

#### Scenario: Pain section displays Mantenimiento

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** the third pain item displays the title "Mantenimiento" and the Spanish copy "Coordinar técnicos y supervisar reparaciones consume tiempo."

#### Scenario: Pain section displays Riesgo legal

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** the fourth pain item displays the title "Riesgo legal" and the Spanish copy "Contratos deficientes generan exposición y conflictos."

#### Scenario: Pain section displays Entrega

- **GIVEN** the five-pain section
- **WHEN** the page is rendered
- **THEN** the fifth pain item displays the title "Entrega" and the Spanish copy "Garantías, daños y conciliaciones al finalizar."

### REQ-HOME-004: Differentiation section compares alquiler vs administrar

The system MUST render a "Alquilar vs Administrar" comparison section with a three-phase table (Captación, Administración, Renovación & Cierre) showing checkmarks for ANCORA's full-service approach versus crossmarks for traditional real-estate agencies' partial service.

#### Scenario: Differentiation table displays three phases

- **GIVEN** the differentiation section
- **WHEN** the page is rendered
- **THEN** the table displays three columns: "Inmobiliaria tradicional", "ANCORA", and three row groups for "FASE 1 — Captación", "FASE 2 — Administración", and "FASE 3 — Renovación & Cierre"

#### Scenario: Traditional agency shows partial coverage

- **GIVEN** the differentiation table
- **WHEN** the page is rendered
- **THEN** the "Inmobiliaria tradicional" column shows checkmarks (✓) for Captación, Evaluación, and Contrato, but crossmarks (✗) for Cobranza, Seguimiento, Mantenimiento, Renovación, Entrega, and Cierre

#### Scenario: ANCORA shows full coverage

- **GIVEN** the differentiation table
- **WHEN** the page is rendered
- **THEN** the "ANCORA" column shows checkmarks (✓) for all services across all three phases: Captación, Evaluación, Contrato, Cobranza, Seguimiento, Mantenimiento, Renovación, Entrega, and Cierre

#### Scenario: Table includes explanatory footer

- **GIVEN** the differentiation table
- **WHEN** the page is rendered
- **THEN** the table is followed by a footer sentence in Spanish: "Muchas inmobiliarias terminan su trabajo cuando se firma el contrato. ANCORA continúa administrando durante toda la relación contractual."

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