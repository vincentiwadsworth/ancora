# Delta: Deployment Pipeline

## MODIFIED Requirements

### REQ-DEPLOY-009: .gitignore includes standard ignore patterns

The system MUST include or update the `.gitignore` file to exclude `node_modules/`, `dist/`, `.astro/`, `.env`, `.env.local`, `*.log`, `.DS_Store`, and the brand source material directory `branding/`. The `branding/` directory MUST NOT be committed because it contains a PDF with credentials.

(Previously: did not exclude `branding/`)

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

#### Scenario: Brand source material is not versioned

- **GIVEN** the `.gitignore` file and a repository containing the `branding/` directory with a credentials PDF
- **WHEN** `git status` is inspected
- **THEN** no file under `branding/` is staged or untracked for commit
