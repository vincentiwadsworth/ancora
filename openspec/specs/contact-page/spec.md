# Spec: Contact Page

## Purpose

The contact page provides multiple communication channels, with WhatsApp as the primary lead-generation channel, supported by email, phone, map embed, and social links.

## Requirements

### REQ-CONTACT-001: Page heading and introduction

The system MUST render an H1 heading and an introduction paragraph in Spanish, inviting visitors to contact ANCORA for property evaluation or general inquiries.

#### Scenario: H1 heading invites contact

- **GIVEN** the contact page rendered
- **WHEN** the page heading is inspected
- **THEN** an H1 tag is present with Spanish text like "Contactanos" or "Contacto"

#### Scenario: Introduction paragraph explains purpose

- **GIVEN** the contact page rendered
- **WHEN** the introduction paragraph is inspected
- **THEN** a paragraph is present in Spanish explaining that visitors can contact ANCORA for property evaluation or general information

### REQ-CONTACT-002: Primary WhatsApp CTA with evaluate intent

The system MUST render a prominent WhatsApp CTA button with the largest visual weight, opening WhatsApp with the evaluate intent message.

#### Scenario: Primary WhatsApp CTA is visually prominent

- **GIVEN** the contact page rendered
- **WHEN** the page layout is inspected
- **THEN** the WhatsApp CTA button is visually larger or more prominent than other contact methods (e.g., larger font size, bold text, or button-style appearance)

#### Scenario: Primary WhatsApp CTA opens WhatsApp with evaluate intent

- **GIVEN** the contact page with the primary WhatsApp CTA
- **WHEN** a user clicks the button
- **THEN** the browser opens WhatsApp with a pre-filled Spanish message requesting a property evaluation

### REQ-CONTACT-003: Secondary CTAs for email and phone

The system MUST render secondary CTAs for email (mailto link) and phone (tel: link), allowing visitors to contact ANCORA via alternative channels.

#### Scenario: Email CTA opens mailto

- **GIVEN** the contact page with an email CTA
- **WHEN** a user clicks the email link
- **THEN** the email client opens with the recipient pre-filled to the ANCORA email address from `site.ts`

#### Scenario: Phone CTA opens tel: link

- **GIVEN** the contact page with a phone CTA
- **WHEN** a user clicks the phone link
- **THEN** the phone dialer opens with the ANCORA phone number from `site.ts`

### REQ-CONTACT-004: Map embed placeholder

The system MUST render a map embed placeholder (iframe to OpenStreetMap or Google Maps) with the ANCORA address placeholder.

#### Scenario: Map embed displays placeholder location

- **GIVEN** the contact page with a map embed
- **WHEN** the page is rendered
- **THEN** an iframe is present displaying a map centered on a placeholder address in Bolivia (e.g., Santa Cruz de la Sierra)

#### Scenario: Map embed uses a supported embed service

- **GIVEN** the map embed iframe
- **WHEN** the iframe source is inspected
- **THEN** the source URL points to either an OpenStreetMap embed or a Google Maps embed service

### REQ-CONTACT-005: Social links row

The system MUST render a row of social link icons (placeholders for all networks configured in `site.ts`), each opening the respective social profile in a new tab.

#### Scenario: Social links display icons

- **GIVEN** the contact page with social links
- **WHEN** the page is rendered
- **THEN** icon links are displayed for each social network configured in `site.ts` (e.g., Facebook, Instagram, LinkedIn)

#### Scenario: Social links open in new tab

- **GIVEN** a social link icon
- **WHEN** a user clicks the icon
- **THEN** the link opens in a new browser tab, pointing to the configured social profile URL

### REQ-CONTACT-006: Office hours and response time note

The system MUST render a note indicating office hours and expected response time, using a placeholder like "Respondemos en horario hábil en menos de 24h".

#### Scenario: Office hours note is displayed

- **GIVEN** the contact page rendered
- **WHEN** the office hours section is inspected
- **THEN** a text block is present indicating office hours (placeholder text)

#### Scenario: Response time note is displayed

- **GIVEN** the contact page rendered
- **WHEN** the response time section is inspected
- **THEN** a text block is present indicating expected response time, such as "Respondemos en horario hábil en menos de 24h"

### REQ-CONTACT-007: Per-page meta tags in Spanish

The system MUST render per-page meta tags (title, description, Open Graph tags, canonical link) for the contact page, all in Spanish (es-BO neutral).

#### Scenario: Contact page title tag is in Spanish

- **GIVEN** the contact page rendered
- **WHEN** the `<title>` tag is inspected
- **THEN** the title is in Spanish and includes the brand name and "Contacto" or similar

#### Scenario: Contact page meta description is in Spanish

- **GIVEN** the contact page rendered
- **WHEN** the `<meta name="description">` tag is inspected
- **THEN** the description is in Spanish, summarizes the contact channels, and is optimized for search engines

#### Scenario: Contact page Open Graph tags are in Spanish

- **GIVEN** the contact page rendered
- **WHEN** the Open Graph tags are inspected
- **THEN** the `og:title` and `og:description` are in Spanish, and `og:image` is set to a placeholder image URL

#### Scenario: Contact page canonical link is set

- **GIVEN** the contact page rendered
- **WHEN** the `<link rel="canonical">` tag is inspected
- **THEN** the canonical URL points to the contact page (e.g., `https://ancora.com.bo/contact`)