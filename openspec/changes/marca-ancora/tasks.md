# Tasks: Marca Áncora

> Un cambio acotado a identidad visual: tokens, tipografías, logo y activos de marca.
> Cada tarea es completable en una sesión y sigue el orden de dependencias indicado.

## Review Workload Forecast

| Fase | Tareas | Est. Lines | Riesgo |
|---|---|---|---|
| 1 — Tokens de color y tipografía | 4 | ~220 | Medio (dependencia de archivos woff2) |
| 2 — Logo y activos de marca | 5 | ~180 | Medio (extracción vectorial) |
| 3 — Metadatos, textos y housekeeping | 3 | ~30 | Bajo |
| 4 — Verificación | 2 | ~10 | Bajo |

**Total authored lines**: ~440.

Decision needed before apply: No
Chained PRs recommended: No

## Fase 1 — Tokens de color y tipografía

### 1.1 Preparar las fuentes self-hosted
- **Deliverable**: woff2 subset latin de Montserrat y MAINLUX en `public/fonts/`, generados desde `branding/Empaquetado/Fonts/`; eliminar los woff2 de Inter y Cormorant Garamond de `public/fonts/`
- **Satisfies**: REQ-SITE-FDN-019
- **Depends on**: none
- **Est. lines**: ~0 (activos binarios)
- **Acceptance**: cada familia cuenta con los pesos que el sitio consume; no quedan archivos de Inter ni de Cormorant en `public/fonts/`

### 1.2 Redefinir los tokens de color en global.css
- **Deliverable**: `primary-*` sobre `#033744`, `secondary-*` sobre `#38525d`, `accent-*` sobre `#00d3b2` y `surface` a `#ffffff`, conservando `neutral-*` y `success-*`
- **Satisfies**: REQ-SITE-FDN-002
- **Depends on**: none
- **Est. lines**: ~120
- **Acceptance**: las utilidades `bg-primary-*`, `bg-secondary-*`, `bg-accent-*` y `bg-surface` reflejan los nuevos valores; no quedan referencias al dorado `#c7a16a`

### 1.3 Reemplazar font-faces y tokens de tipografía
- **Deliverable**: en `global.css`, sustituir los `@font-face` de Inter y Cormorant Garamond por los de Montserrat y MAINLUX, y actualizar `--font-sans` a Montserrat y `--font-display` a MAINLUX
- **Satisfies**: REQ-SITE-FDN-019
- **Depends on**: 1.1, 1.2
- **Est. lines**: ~90
- **Acceptance**: `font-sans` y `font-display` resuelven a las familias nuevas; no quedan font-faces de Inter ni de Cormorant

### 1.4 Eliminar la dependencia @fontsource/inter
- **Deliverable**: quitar `@fontsource/inter` de `package.json` y actualizar el lockfile según corresponda
- **Satisfies**: REQ-SITE-FDN-019
- **Depends on**: 1.3
- **Est. lines**: ~10
- **Acceptance**: `@fontsource/inter` ya no figura en `package.json`; `npm run build` sigue pasando

## Fase 2 — Logo y activos de marca

### 2.1 Extraer el isologo y el lockup de los PSD
- **Deliverable**: isologo "Á" y lockup "ÁNCORA" en SVG, extraídos de los smart objects embebidos en `branding/`, sin redibujar
- **Satisfies**: REQ-SITE-FDN-017
- **Depends on**: none
- **Est. lines**: ~0 (extracción)
- **Acceptance**: los SVG corresponden al arte oficial y no contienen trazos reconstruidos a mano

### 2.2 Reescribir Logo.astro con el SVG real
- **Deliverable**: `Logo.astro` con las variantes `mark` y `wordmark`; wordmark en `currentColor`, "Á" en `#00d3b2`, y soporte de variante blanca vía `currentColor`; `ariaLabel` por defecto 'ÁNCORA'
- **Satisfies**: REQ-SITE-FDN-017, REQ-SITE-FDN-009
- **Depends on**: 2.1
- **Est. lines**: ~120
- **Acceptance**: `<Logo variant="mark" />` y `<Logo variant="wordmark" />` renderizan el arte oficial; el footer obtiene la variante blanca sin un SVG adicional

### 2.3 Regenerar el favicon
- **Deliverable**: `public/favicon.svg` construido desde el isologo con fondo de marca
- **Satisfies**: REQ-SITE-FDN-024
- **Depends on**: 2.1
- **Est. lines**: ~10
- **Acceptance**: `dist/favicon.svg` se sirve y muestra el isologo de marca en el navegador

### 2.4 Recolorear la imagen de reporte
- **Deliverable**: `public/images/report-interior.svg` recoloreado a la paleta de marca
- **Satisfies**: REQ-SITE-FDN-024
- **Depends on**: none
- **Est. lines**: ~15
- **Acceptance**: el SVG no conserva los tonos beige/dorados anteriores

### 2.5 Crear la imagen Open Graph
- **Deliverable**: `public/og/home.png` en la ruta referenciada por `meta.ts`, con composición de marca
- **Satisfies**: REQ-SITE-FDN-022
- **Depends on**: 2.1
- **Est. lines**: ~0 (activo binario)
- **Acceptance**: `dist/og/home.png` existe y el `og:image` apunta a una URL servida

## Fase 3 — Metadatos, textos y housekeeping

### 3.1 Actualizar theme-color
- **Deliverable**: `theme-color` `#033744` en `BaseLayout.astro`
- **Satisfies**: REQ-SITE-FDN-003
- **Depends on**: 1.2
- **Est. lines**: ~5
- **Acceptance**: el HTML generado incluye `<meta name="theme-color" content="#033744">`

### 3.2 Actualizar la identidad textual
- **Deliverable**: `brandName` a 'ÁNCORA' en `site.ts`, con los aria-labels correspondientes en los consumidores del logo
- **Satisfies**: REQ-SITE-FDN-009
- **Depends on**: 2.2
- **Est. lines**: ~15
- **Acceptance**: el nombre de marca se muestra como 'ÁNCORA' y los aria-labels coinciden

### 3.3 Excluir el material de marca del repositorio
- **Deliverable**: entrada `branding/` en `.gitignore`
- **Satisfies**: REQ-DEPLOY-009
- **Depends on**: none
- **Est. lines**: ~2
- **Acceptance**: `git status` no lista archivos dentro de `branding/`

## Fase 4 — Verificación

### 4.1 Lint, type check y build
- **Deliverable**: ejecutar `npm run lint`, `npx astro check` y `npm run build` y resolver los hallazgos
- **Satisfies**: criterios de calidad del cambio
- **Depends on**: Fases 1–3
- **Est. lines**: ~0
- **Acceptance**: los tres comandos terminan sin errores y `dist/` se genera

### 4.2 Auditoría visual del build
- **Deliverable**: revisión del build servido localmente con `npm run preview`, verificando paleta, tipografías y logo en header, footer y favicon
- **Satisfies**: REQ-SITE-FDN-002, REQ-SITE-FDN-017, REQ-SITE-FDN-019, REQ-SITE-FDN-024
- **Depends on**: 4.1
- **Est. lines**: ~0
- **Acceptance**: el sitio renderiza con la identidad de marca; sin desbordes ni saltos visuales atribuibles al cambio

## Commit Strategy

Un commit atómico por tarea, con mensajes convencionales: Fase 1 `style:` para tokens y `chore:` para fuentes/dependencias, Fase 2 `feat:` para logo y activos, Fase 3 `fix:` para metadatos y housekeeping, Fase 4 `chore:` para verificación.
