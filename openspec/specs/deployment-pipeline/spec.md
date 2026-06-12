# Spec: Deployment Pipeline

## Purpose

Automate deployment of the static Astro build to GitHub Pages via a GitHub Actions workflow, enable Umami analytics via environment variables, and ensure production builds fail if required environment variables are missing.

## Requirements

### REQ-DEPLOY-001: GitHub Actions workflow triggers on push to main

The system MUST include a `.github/workflows/deploy.yml` file that triggers on push to the main branch and uses the `withastro/action@v6` (or current version) to deploy to GitHub Pages.

#### Scenario: Workflow triggers on main branch push

- **GIVEN** a `.github/workflows/deploy.yml` file configured with the Astro action
- **WHEN** code is pushed to the main branch
- **THEN** the GitHub Actions workflow is triggered and begins the deployment process

#### Scenario: Workflow uses Astro action

- **GIVEN** the deployment workflow file
- **WHEN** the workflow steps are inspected
- **THEN** a step uses the `withastro/action@v6` (or current version) with appropriate configuration for GitHub Pages deployment

### REQ-DEPLOY-002: Build uses Node 22

The system MUST configure the GitHub Actions workflow to use Node.js version 22 for the build process.

#### Scenario: Workflow specifies Node 22

- **GIVEN** the deployment workflow file
- **WHEN** the Node.js setup step is inspected
- **THEN** the step specifies Node version 22

#### Scenario: Build succeeds with Node 22

- **GIVEN** the Astro 6 project configured in the workflow
- **WHEN** the build step runs with Node 22
- **THEN** the build completes successfully, producing a `dist/` directory

### REQ-DEPLOY-003: Public output is dist/ and deployed to GitHub Pages

The system MUST configure the Astro build output to be the `dist/` directory and deploy that directory to GitHub Pages.

#### Scenario: Build output directory is dist/

- **GIVEN** the Astro 6 project
- **WHEN** the build completes
- **THEN** the `dist/` directory contains the static HTML, CSS, and assets for the site

#### Scenario: Deploy step targets GitHub Pages

- **GIVEN** the deployment workflow file
- **WHEN** the Astro action configuration is inspected
- **THEN** the action is configured to deploy to GitHub Pages using the `dist/` directory as the source

### REQ-DEPLOY-004: CNAME file contains domain

The system MUST include a `public/CNAME` file containing the domain name `ancora.com.bo` for custom domain configuration.

#### Scenario: CNAME file is present

- **GIVEN** the Astro project
- **WHEN** the `public/` directory is inspected
- **THEN** a `CNAME` file is present

#### Scenario: CNAME file contains correct domain

- **GIVEN** the `public/CNAME` file
- **WHEN** the file content is inspected
- **THEN** the file contains the domain name `ancora.com.bo` on its own line

### REQ-DEPLOY-005: Umami script injected conditionally

The system MUST inject the Umami analytics script in `BaseLayout` only when the `PUBLIC_UMAMI_ENABLED` environment variable is set to `true`.

#### Scenario: Umami script is injected when enabled

- **GIVEN** the `BaseLayout` component with Umami integration
- **WHEN** `PUBLIC_UMAMI_ENABLED` is set to `true` and the page is rendered
- **THEN** the Umami analytics script is injected in the `<head>` or before the closing `</body>` tag

#### Scenario: Umami script is NOT injected when disabled

- **GIVEN** the `BaseLayout` component with Umami integration
- **WHEN** `PUBLIC_UMAMI_ENABLED` is not set or set to `false` and the page is rendered
- **THEN** no Umami analytics script is injected

### REQ-DEPLOY-006: Umami site ID from environment variable

The system MUST consume the `PUBLIC_UMAMI_SITE_ID` environment variable at build time and pass it to the Umami script.

#### Scenario: Umami script includes site ID

- **GIVEN** the `BaseLayout` component with Umami integration and `PUBLIC_UMAMI_ENABLED` set to `true`
- **WHEN** the page is rendered
- **THEN** the Umami script includes the `data-website-id` attribute or equivalent with the value from `PUBLIC_UMAMI_SITE_ID`

#### Scenario: Placeholder value is acceptable

- **GIVEN** the `PUBLIC_UMAMI_SITE_ID` environment variable
- **WHEN** a placeholder value is used (e.g., "placeholder-site-id")
- **THEN** the build succeeds and the placeholder value is passed to the Umami script

### REQ-DEPLOY-007: Build fails if required env vars missing in production

The system MUST configure the build process to fail if required environment variables (e.g., `PUBLIC_UMAMI_SITE_ID` when `PUBLIC_UMAMI_ENABLED` is `true`) are missing in a production build.

#### Scenario: Build fails when Umami enabled but site ID missing

- **GIVEN** the Astro 6 project with `PUBLIC_UMAMI_ENABLED` set to `true`
- **WHEN** `PUBLIC_UMAMI_SITE_ID` is not set and the build is attempted
- **THEN** the build fails with a clear error message indicating the missing environment variable

#### Scenario: Build succeeds when Umami disabled

- **GIVEN** the Astro 6 project with `PUBLIC_UMAMI_ENABLED` not set or set to `false`
- **WHEN** `PUBLIC_UMAMI_SITE_ID` is not set and the build is attempted
- **THEN** the build succeeds (Umami is not required when disabled)

### REQ-DEPLOY-008: Astro config sets site URL and trailing slash

The system MUST configure `astro.config.mjs` to set the site URL to `https://ancora.com.bo` and `trailingSlash` to `never`.

#### Scenario: Site URL is configured

- **GIVEN** the `astro.config.mjs` file
- **WHEN** the configuration is inspected
- **THEN** the `site` property is set to `https://ancora.com.bo`

#### Scenario: Trailing slash is set to never

- **GIVEN** the `astro.config.mjs` file
- **WHEN** the configuration is inspected
- **THEN** the `trailingSlash` property is set to `never` or equivalent

### REQ-DEPLOY-009: .gitignore includes standard ignore patterns

The system MUST include or update the `.gitignore` file to exclude `node_modules/`, `dist/`, `.astro/`, `.env`, `.env.local`, `*.log`, and `.DS_Store`.

#### Scenario: .gitignore excludes node_modules

- **GIVEN** the `.gitignore` file
- **WHEN** the file content is inspected
- **THEN** an entry for `node_modules/` is present

#### Scenario: .gitignore excludes build artifacts

- **GIVEN** the `.gitignore` file
- **WHEN** the file content is inspected
- **THEN** entries for `dist/` and `.astro/` are present

#### Scenario: .gitignore excludes environment files

- **GIVEN** the `.gitignore` file
- **WHEN** the file content is inspected
- **THEN** entries for `.env` and `.env.local` are present

#### Scenario: .gitignore excludes log files

- **GIVEN** the `.gitignore` file
- **WHEN** the file content is inspected
- **THEN** an entry for `*.log` is present

#### Scenario: .gitignore excludes macOS files

- **GIVEN** the `.gitignore` file
- **WHEN** the file content is inspected
- **THEN** an entry for `.DS_Store` is present