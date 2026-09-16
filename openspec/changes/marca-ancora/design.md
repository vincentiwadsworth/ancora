# Design: Marca Áncora

## Contexto y alcance

El cambio no introduce arquitectura nueva: redefine valores de tokens semánticos, reemplaza tipografías, sustituye el logo placeholder por el vectorial de marca y regenera activos visuales. Los nombres de token y las utilidades de Tailwind se mantienen estables para no tocar los componentes que los consumen.

No aplica un diagrama de secuencia: el cambio no agrega runtime, flujos ni estado, solo reemplaza valores y activos en build time.

## Archivos afectados y responsabilidad

| Archivo | Responsabilidad en este cambio |
|---------|-------------------------------|
| `src/styles/global.css` | Valores de tokens de color, font-faces y tokens de tipografía |
| `src/components/Logo.astro` | Única fuente de verdad del logo vectorial |
| `src/layouts/BaseLayout.astro` | `theme-color` de marca |
| `src/config/site.ts` | Identidad textual (`brandName`) |
| `src/config/meta.ts` | Ruta de la imagen Open Graph |
| `public/fonts/` | woff2 subset latin de Montserrat y MAINLUX |
| `public/favicon.svg` | Isologo como favicon |
| `public/images/report-interior.svg` | Imagen de reporte recoloreada |
| `public/og/home.png` | Imagen Open Graph |
| `package.json` | Eliminación de `@fontsource/inter` |
| `.gitignore` | Exclusión de `branding/` |

## Architecture Decisions

| Decision | Alternatives | Rationale |
|---|---|---|
| Redefinir los VALORES de tokens existentes | Renombrar tokens o introducir familias nuevas | Los componentes ya consumen `primary-*`, `secondary-*`, `accent-*` y `surface`; cambiar solo el valor evita tocar cada componente y mantiene el contrato de Tailwind |
| Reutilizar `accent-*` para el teal `#00d3b2` | Crear una familia `teal-*` separada | `accent-*` cumple el rol semántico de color de acento; reciclar la familia deja intactas las utilidades `bg-accent-*` y `text-accent-*` |
| Logo como SVG inline extraído de los PSD | Redibujar el logo o usar `<img>` | SVG inline mantiene cero requests, permite `currentColor` para la variante blanca y evita divergencia con el arte oficial |
| Variante blanca derivada de `currentColor` | Un segundo SVG blanco embebido | El footer cambia el contexto de color y no necesita un activo nuevo ni duplicar markup |
| Self-host de woff2 subset latin | Google Fonts o `@fontsource` | Sitio estático sin requests a terceros, control de licencia y sin dependencia de CDN |
| Eliminar `@fontsource/inter` | Dejar la dependencia sin uso | No queda ningún consumo de Inter; mantenerla agrega peso y deuda |
| `surface` a blanco `#ffffff` | Conservar el off-white actual | El manual define blanco como color base de superficie |

## Design Tokens

### Semántica

| Token | Antes | Después |
|---|---|---|
| `primary-*` | Rampa anclada en `#0e1b24` | Rampa anclada en `#033744` |
| `secondary-*` | Rampa anclada en `#243747` | Rampa anclada en `#38525d` |
| `accent-*` | Rampa dorada anclada en `#c7a16a` | Rampa anclada en `#00d3b2` |
| `surface` | `#f5f4f2` | `#ffffff` |
| `neutral-*` | Escala gris | Sin cambios (funcional) |
| `success-*` | Escala verde | Sin cambios (funcional) |
| `--font-sans` | Inter | Montserrat |
| `--font-display` | Cormorant Garamond | MAINLUX |

Los valores intermedios de cada rampa (50–950) se derivan del color de ancla durante la aplicación; este documento fija el ancla y el orden de la rampa, no cada paso hexadecimal.

### Contraste

La validación AA de los pares texto/fondo se ejecuta durante la aplicación sobre los valores finales de las rampas. Este documento no fija ratios; el criterio de aceptación es que los pares usados por el sitio cumplan WCAG 2.2 AA.

## Logo

El isologo "Á" y el lockup "ÁNCORA" se extraen vectorialmente de los smart objects embebidos en los PSD de `branding/`, sin redibujar. `Logo.astro` expone la prop `variant`:

- `mark`: isologo "Á", color teal `#00d3b2`, típicamente sobre fondo de marca.
- `wordmark`: lockup completo; el texto del wordmark usa `currentColor` y la "Á" mantiene `#00d3b2`.
- Variante blanca: el contenedor aplica `text-white`; el wordmark hereda blanco por `currentColor`, la "Á" conserva el teal.
- `ariaLabel` de marca: 'ÁNCORA'.

`public/favicon.svg` se genera a partir de `mark`.

## Activos y metadatos

- `public/favicon.svg`: isologo sobre fondo de marca, referenciado desde `BaseLayout.astro`.
- `public/og/home.png`: imagen Open Graph en la ruta ya referenciada por `meta.ts`, con composición de marca y resolución estándar de Open Graph.
- `public/images/report-interior.svg`: recoloreado a la paleta de marca.
- `BaseLayout.astro`: `theme-color` `#033744`.
- `site.ts`: `brandName` 'ÁNCORA'.

## Housekeeping

`branding/` contiene un PDF con credenciales y no debe versionarse; se agrega al `.gitignore`. El material permanece disponible localmente como fuente de extracción.

## Verificación

El repo no tiene suite de tests automatizados. La verificación es `npm run lint`, `npx astro check`, `npm run build` y una auditoría visual del build. Nota: `openspec/config.yaml` declara Playwright E2E, pero Playwright no está instalado en el repositorio; esa declaración está desactualizada y no aplica a este cambio.

## REQ Traceability Matrix

| REQ | Archivo(s) |
|---|---|
| REQ-SITE-FDN-002 | `src/styles/global.css` |
| REQ-SITE-FDN-003 | `src/layouts/BaseLayout.astro` |
| REQ-SITE-FDN-009 | `src/config/site.ts` |
| REQ-SITE-FDN-017 | `src/components/Logo.astro` |
| REQ-SITE-FDN-019 | `src/styles/global.css` |
| REQ-SITE-FDN-022 | `src/config/meta.ts`, `public/og/home.png` |
| REQ-SITE-FDN-024 | `public/favicon.svg`, `public/images/report-interior.svg` |
| REQ-DEPLOY-009 | `.gitignore` |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| MAINLUX es licencia comercial de digitype-studio | Media | El cliente autorizó el archivo provisto; se usa el de `branding/` |
| El teal del arte (`#00ccab`) difiere del documentado (`#00d3b2`) | Media | Se adopta `#00d3b2` |
| Pesos de fuente no definidos en el plan | Media | Self-hostear solo los pesos consumidos, subset latin |
| Contraste AA no validado aún | Media | Verificar los pares antes de cerrar el cambio |

## Open Questions

- El plan aprobado define `surface` a blanco, pero no especifica si `surface-muted`, `surface-inverse` y `surface-secondary` deben seguir la nueva paleta. Se mantienen por defecto y se documenta la decisión durante la aplicación si surge una incoherencia visual.
