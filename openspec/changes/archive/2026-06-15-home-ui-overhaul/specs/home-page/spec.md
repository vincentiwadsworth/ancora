# Delta: Home Page

## MODIFIED Requirements

### REQ-HOME-001: Hero section with headline, segmented CTAs, and visual anchor

The system MUST render a hero section with a Spanish H1 headline, subhead, a primary CTA button (WhatsApp with evaluate intent), a secondary CTA button (WhatsApp with general info intent), and a visual anchor element (image, illustration, CSS pattern, or abstract graphic) alongside the text content.

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
