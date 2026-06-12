# Spec: About Page

## Purpose

The about page builds trust by introducing the founding team, the brand story, and the core values derived from the three brand pillars.

## Requirements

### REQ-ABOUT-001: Page heading and brand story from pitch material

The system MUST render an H1 heading and a brand story paragraph in Spanish, describing ANCORA's founding experience and mission using verbatim copy from the pitch material.

#### Scenario: H1 heading describes founders

- **GIVEN** the about page rendered
- **WHEN** the page heading is inspected
- **THEN** an H1 tag is present with Spanish text like "Quienes somos?"

#### Scenario: Brand story paragraph explains ANCORA's experience

- **GIVEN** the about page rendered
- **WHEN** the brand story paragraph is inspected
- **THEN** a paragraph is present in Spanish stating that ANCORA was born with experience from the first day and describing the founders' backgrounds

### REQ-ABOUT-002: Team grid renders 2 members with placeholders

The system MUST render a team grid displaying 2 members (Diego Paniagua, Luis Adolfo Valenzuela) with placeholder avatars (initials in circles), name, role/credential, education, and experience note (using verbatim copy from pitch material, with placeholders for missing information).

#### Scenario: Team member 1 — Diego Paniagua

- **GIVEN** the team grid
- **WHEN** the page is rendered
- **THEN** the first member displays "Diego Paniagua", a placeholder avatar with initials "DP", the credential "Formado en Administración de Empresas, Universidad NN, Buenos Aires - Argentina", and a placeholder for experience (matching the "................" in the pitch)

#### Scenario: Team member 2 — Luis Adolfo Valenzuela

- **GIVEN** the team grid
- **WHEN** the page is rendered
- **THEN** the second member displays "Luis Adolfo Valenzuela", a placeholder avatar with initials "LV", the credential "Formado en Ing. Civil, Universidad Gabriela Mistral, Santiago - Chile", specializations "Gestión Inmobiliaria, Pontificia Universidad Católica de Chile (PUC) y Universidad de Chile (UC)", and a placeholder for years of experience (matching the "XX años" in the pitch)

#### Scenario: Placeholder avatars use initials in circles

- **GIVEN** a team member with a placeholder avatar
- **WHEN** the avatar is inspected
- **THEN** the avatar displays the member's initials (e.g., "DP", "LV") in a circular shape, using the primary color for the background and white for the text

### REQ-ABOUT-003: Values block derived from the three pillars

The system MUST render a values section with three values (Rentabilidad, Protección, Tranquilidad), each expanded with more detail beyond the pitch material's one-line summaries.

#### Scenario: Value 1 — Rentabilidad expanded

- **GIVEN** the values section
- **WHEN** the page is rendered
- **THEN** the first value displays the title "Rentabilidad" and an expanded description in Spanish that elaborates on reducing vacancy and generating consistent income

#### Scenario: Value 2 — Protección expanded

- **GIVEN** the values section
- **WHEN** the page is rendered
- **THEN** the second value displays the title "Protección" and an expanded description in Spanish that elaborates on solid contracts and reduced legal and operational risk

#### Scenario: Value 3 — Tranquilidad expanded

- **GIVEN** the values section
- **WHEN** the page is rendered
- **THEN** the third value displays the title "Tranquilidad" and an expanded description in Spanish that elaborates on comprehensive management and reduced time investment for the owner

### REQ-ABOUT-004: Per-page meta tags in Spanish

The system MUST render per-page meta tags (title, description, Open Graph tags, canonical link) for the about page, all in Spanish (es-BO neutral).

#### Scenario: About page title tag is in Spanish

- **GIVEN** the about page rendered
- **WHEN** the `<title>` tag is inspected
- **THEN** the title is in Spanish and includes the brand name and "Sobre nosotros" or similar

#### Scenario: About page meta description is in Spanish

- **GIVEN** the about page rendered
- **WHEN** the `<meta name="description">` tag is inspected
- **THEN** the description is in Spanish, summarizes the team and values, and is optimized for search engines

#### Scenario: About page Open Graph tags are in Spanish

- **GIVEN** the about page rendered
- **WHEN** the Open Graph tags are inspected
- **THEN** the `og:title` and `og:description` are in Spanish, and `og:image` is set to a placeholder image URL

#### Scenario: About page canonical link is set

- **GIVEN** the about page rendered
- **WHEN** the `<link rel="canonical">` tag is inspected
- **THEN** the canonical URL points to the about page (e.g., `https://ancora.com.bo/about`)