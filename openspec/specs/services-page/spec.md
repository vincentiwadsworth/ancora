# Spec: Services Page

## Purpose

The services page explains ANCORA's full-service offering, the transparent tenant selection process, the investment protection measures, and the transparent pricing model, leading to segmented WhatsApp CTAs.

## Requirements

### REQ-SERVICES-001: Page heading and introduction from pitch material

The system MUST render an H1 heading and introduction paragraph in Spanish, using verbatim copy from the pitch material explaining what ANCORA is.

#### Scenario: H1 heading describes ANCORA

- **GIVEN** the services page rendered
- **WHEN** the page heading is inspected
- **THEN** an H1 tag is present with Spanish text describing ANCORA (e.g., "¿Qué es ANCORA?")

#### Scenario: Introduction paragraph explains the value proposition

- **GIVEN** the services page rendered
- **WHEN** the introduction paragraph is inspected
- **THEN** a paragraph is present in Spanish explaining that ANCORA specializes in integral administration of residential properties and handles the entire process for the owner

### REQ-SERVICES-002: Service list renders 6 service bullets

The system MUST render a list of 6 services (Captación, Contratos notaría, Cobranza, Mantenimiento, Inspección, Reportes) plus conflict support, using verbatim Spanish copy from the pitch material.

#### Scenario: Service list displays Captación

- **GIVEN** the service list
- **WHEN** the page is rendered
- **THEN** the list includes "Captación y evaluación documentada de inquilinos"

#### Scenario: Service list displays Contratos notaría

- **GIVEN** the service list
- **WHEN** the page is rendered
- **THEN** the list includes "Contratos bajo escritura pública ante Notaría"

#### Scenario: Service list displays Cobranza

- **GIVEN** the service list
- **WHEN** the page is rendered
- **THEN** the list includes "Cobranza activa desde el día 1 de atraso"

#### Scenario: Service list displays Mantenimiento

- **GIVEN** the service list
- **WHEN** the page is rendered
- **THEN** the list includes "Coordinación de mantenimientos con aprobación previa"

#### Scenario: Service list displays Inspección

- **GIVEN** the service list
- **WHEN** the page is rendered
- **THEN** the list includes "Inspección, registro fotográfico y control de entrega"

#### Scenario: Service list displays Reportes

- **GIVEN** the service list
- **WHEN** the page is rendered
- **THEN** the list includes "Reportes periódicos con liquidación detallada"

#### Scenario: Service list includes conflict support

- **GIVEN** the service list
- **WHEN** the page is rendered
- **THEN** the list includes "Soporte en gestión de conflictos"

### REQ-SERVICES-003: Process sub-section renders 4-step tenant selection

The system MUST render a process sub-section titled "Nuestro Proceso de Selección de Inquilinos" with 4 steps (Verificación de ingresos, Referencias laborales, Evaluación documental, Validación del propietario) using verbatim Spanish copy from the pitch material.

#### Scenario: Process section title and subtitle

- **GIVEN** the process sub-section
- **WHEN** the page is rendered
- **THEN** an H2 heading displays "Nuestro Proceso de Selección de Inquilinos" and a subtitle displays "Evaluamos antes de recomendar — reducimos el riesgo antes de firmar"

#### Scenario: Step 1 — Verificación de ingresos

- **GIVEN** the process sub-section
- **WHEN** the page is rendered
- **THEN** step 01 displays the title "Verificación de ingresos" and the description "Comprobamos que el inquilino tenga capacidad de pago real."

#### Scenario: Step 2 — Referencias laborales

- **GIVEN** the process sub-section
- **WHEN** the page is rendered
- **THEN** step 02 displays the title "Referencias laborales" and the description "Contactamos al empleador o verificamos la actividad comercial para confirmar estabilidad."

#### Scenario: Step 3 — Evaluación documental

- **GIVEN** the process sub-section
- **WHEN** the page is rendered
- **THEN** step 03 displays the title "Evaluación documental" and the description "Documentamos todo el proceso de evaluación."

#### Scenario: Step 4 — Validación del propietario

- **GIVEN** the process sub-section
- **WHEN** the page is rendered
- **THEN** step 04 displays the title "Validación del propietario" and the description "Presentamos el perfil completo. La decisión final siempre la toma el propietario."

#### Scenario: Process section includes objective statement

- **GIVEN** the process sub-section
- **WHEN** the page is rendered
- **THEN** the section includes a footer statement: "Objetivo: reducir el riesgo antes de firmar. Un buen inquilino vale más que el primer interesado."

### REQ-SERVICES-004: Investment protection section renders 5 measures

The system MUST render a protection section titled "Protegemos el Estado de tu Inversión" with 5 measures (Inspección inicial documentada, Registro fotográfico completo, Seguimiento periódico, Coordinación de reparaciones, Control de entrega documentado) using verbatim Spanish copy from the pitch material.

#### Scenario: Protection section title and subtitle

- **GIVEN** the investment protection section
- **WHEN** the page is rendered
- **THEN** an H2 heading displays "Protegemos el Estado de tu Inversión" and a subtitle displays "Documentamos todo para que tengas respaldo en cualquier circunstancia"

#### Scenario: Measure 1 — Inspección inicial documentada

- **GIVEN** the investment protection section
- **WHEN** the page is rendered
- **THEN** the first measure displays the title "Inspección inicial documentada" and the description "Registramos el estado de cada ambiente, instalación y equipamiento antes del ingreso del inquilino."

#### Scenario: Measure 2 — Registro fotográfico completo

- **GIVEN** the investment protection section
- **WHEN** the page is rendered
- **THEN** the second measure displays the title "Registro fotográfico completo" and the description "Fotos de todos los ambientes firmadas. Evidencia ante cualquier reclamo sobre el estado del inmueble."

#### Scenario: Measure 3 — Seguimiento periódico

- **GIVEN** the investment protection section
- **WHEN** the page is rendered
- **THEN** the third measure displays the title "Seguimiento periódico" and the description "Monitoreo del estado del inmueble durante la relación contractual con visitas y reportes documentados."

#### Scenario: Measure 4 — Coordinación de reparaciones

- **GIVEN** the investment protection section
- **WHEN** the page is rendered
- **THEN** the fourth measure displays the title "Coordinación de reparaciones" and the description "Gestionamos cotizaciones, aprobación del propietario y seguimiento de cada trabajo realizado."

#### Scenario: Measure 5 — Control de entrega documentado

- **GIVEN** the investment protection section
- **WHEN** the page is rendered
- **THEN** the fifth measure displays the title "Control de entrega documentado" and the description "Al finalizar, verificamos el estado del inmueble, liquidamos garantías y gestionamos conciliaciones."

#### Scenario: Protection section includes value statement

- **GIVEN** the investment protection section
- **WHEN** the page is rendered
- **THEN** the section includes a footer statement: "Tu inmueble tiene valor. Nosotros lo preservamos."

### REQ-SERVICES-005: Pricing transparency block with 7% model

The system MUST render a pricing transparency section titled "¿CUÁNTO CUESTA?" explaining the 7% fee on effectively collected rent, with a worked example and a no-rent-no-fee disclaimer.

#### Scenario: Pricing section title and value statement

- **GIVEN** the pricing transparency section
- **WHEN** the page is rendered
- **THEN** an H2 heading displays "¿CUÁNTO CUESTA?" and a statement displays "Tu inmueble debe generar rentabilidad, no preocupaciones."

#### Scenario: Pricing section displays 7% fee model

- **GIVEN** the pricing transparency section
- **WHEN** the page is rendered
- **THEN** the section displays "7% del alquiler efectivamente cobrado"

#### Scenario: Pricing section displays worked example

- **GIVEN** the pricing transparency section
- **WHEN** the page is rendered
- **THEN** the section displays an example with "Canon cobrado: Bs. 3.000", "Fee Ancora (7%): – Bs. 210", and "Vos recibís: Bs. 2.790"

#### Scenario: Pricing section includes no-rent-no-fee disclaimer

- **GIVEN** the pricing transparency section
- **WHEN** the page is rendered
- **THEN** the section includes a disclaimer: "Sin alquiler cobrado, no hay fee de administración."

### REQ-SERVICES-006: Segmented CTAs for evaluate, general, and process intents

The system MUST render three segmented CTA buttons, each opening WhatsApp with a distinct intent message (evaluate property, general info, tenant-selection process info).

#### Scenario: Evaluate intent CTA

- **GIVEN** the services page with segmented CTAs
- **WHEN** a user clicks the "Evaluar propiedad" button
- **THEN** the browser opens WhatsApp with a pre-filled Spanish message requesting a property evaluation

#### Scenario: General info intent CTA

- **GIVEN** the services page with segmented CTAs
- **WHEN** a user clicks the "Información general" button
- **THEN** the browser opens WhatsApp with a pre-filled Spanish message requesting general information about ANCORA's services

#### Scenario: Process info intent CTA

- **GIVEN** the services page with segmented CTAs
- **WHEN** a user clicks the "Proceso de selección" button
- **THEN** the browser opens WhatsApp with a pre-filled Spanish message requesting information about the tenant selection process

### REQ-SERVICES-007: Per-page meta tags in Spanish

The system MUST render per-page meta tags (title, description, Open Graph tags, canonical link) for the services page, all in Spanish (es-BO neutral).

#### Scenario: Services page title tag is in Spanish

- **GIVEN** the services page rendered
- **WHEN** the `<title>` tag is inspected
- **THEN** the title is in Spanish and includes the brand name and "Servicios" or similar

#### Scenario: Services page meta description is in Spanish

- **GIVEN** the services page rendered
- **WHEN** the `<meta name="description">` tag is inspected
- **THEN** the description is in Spanish, summarizes the services offering, and is optimized for search engines

#### Scenario: Services page Open Graph tags are in Spanish

- **GIVEN** the services page rendered
- **WHEN** the Open Graph tags are inspected
- **THEN** the `og:title` and `og:description` are in Spanish, and `og:image` is set to a placeholder image URL

#### Scenario: Services page canonical link is set

- **GIVEN** the services page rendered
- **WHEN** the `<link rel="canonical">` tag is inspected
- **THEN** the canonical URL points to the services page (e.g., `https://ancora.com.bo/services`)