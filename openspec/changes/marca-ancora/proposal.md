# Proposal: Marca Áncora

## Intent

Reemplazar la identidad visual provisional del one-pager por la nueva marca de ÁNCORA aprobada por el cliente. El sitio hoy usa una paleta navy oscura (`#0e1b24`), Inter + Cormorant Garamond y un `Logo.astro` placeholder; la marca oficial define una paleta de cuatro colores, Montserrat + MAINLUX y un isologo vectorial.

El material de referencia vive en `branding/` (solo lectura). Los datos verificados del Manual de Marca son: paleta `#033744` (profundo), `#38525d` (slate), `#00d3b2` (teal) y `#ffffff`; tipografías Montserrat (principal, cuerpo) y MAINLUX (secundaria, display); e isologo "Á" teal con lockup "ÁNCORA" extraído de los smart objects embebidos en los PSD, sin redibujar.

## Scope

### In Scope

- Redefinición de VALORES de tokens semánticos en `src/styles/global.css`: `primary-*` sobre `#033744`, `secondary-*` sobre `#38525d`, `accent-*` (hoy dorado) sobre `#00d3b2` y `surface` a blanco.
- Tipografía: `--font-sans` a Montserrat y `--font-display` a MAINLUX, con woff2 subset latin self-hosted en `public/fonts/`.
- Eliminación de Inter y Cormorant Garamond (font-faces y archivos) y de la dependencia `@fontsource/inter`.
- Reescritura de `src/components/Logo.astro` con SVG inline extraído de los PSD: variante `mark` (isologo teal) y variante `wordmark` (lockup, con el wordmark en `currentColor` y la "Á" en `#00d3b2`), más variante blanca para el footer vía `currentColor`.
- Regeneración de `public/favicon.svg` desde el isologo.
- `theme-color` `#033744` en `BaseLayout.astro`.
- `brandName` de 'ANCORA' a 'ÁNCORA' y ajuste de aria-labels en `site.ts` y `Logo.astro`.
- Recoloreo de `public/images/report-interior.svg`.
- Creación de `public/og/home.png` (referenciado hoy en `meta.ts` y ausente del repo).
- Exclusión de `branding/` del control de versiones (contiene un PDF con credenciales).

### Out of Scope

- Cambios de copy, contenido, estructura, layout o flujos de conversión.
- Componentes fuera del logo y de los tokens de estilo.
- Reconstrucción vectorial manual del logo (se extrae de los PSD).
- Nuevas páginas, rutas o funcionalidades.
- Cambios en la lógica de WhatsApp o en los mensajes prellenados.
- Suite de tests automatizados (no existe en el repo).

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-foundation`: valores de tokens de color, tokens de tipografía, componente `Logo`, `theme-color`, `brandName` y activos visuales de marca (favicon, imagen OG, SVG de reporte).
- `deployment-pipeline`: `.gitignore` excluye el material de marca `branding/`.

## Approach

Mantener la arquitectura estática actual y cambiar solo los valores de los tokens semánticos, de modo que los componentes existentes adopten la nueva marca sin reescribirse. Los nombres de token (`primary-*`, `secondary-*`, `accent-*`, `surface`) y las utilidades de Tailwind asociadas (`bg-primary-*`, `font-display`, etc.) permanecen estables; solo cambia su valor. `neutral-*` y `success-*` se mantienen funcionales. El logo se reescribe en `Logo.astro` como única fuente de verdad y las tipografías se sirven self-hosted desde `public/fonts/`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/styles/global.css` | Modified | Valores de tokens de color, font-faces y tokens de tipografía |
| `src/components/Logo.astro` | Modified | SVG inline real (mark + wordmark + variante blanca) |
| `src/layouts/BaseLayout.astro` | Modified | `theme-color` a `#033744` |
| `src/config/site.ts` | Modified | `brandName` a 'ÁNCORA' |
| `src/config/meta.ts` | Modified | Referencia de imagen OG resuelta con el activo real |
| `public/fonts/` | Modified | woff2 de Montserrat + MAINLUX; se eliminan Inter y Cormorant |
| `public/favicon.svg` | Modified | Isologo Á sobre fondo de marca |
| `public/images/report-interior.svg` | Modified | Recoloreado a la paleta de marca |
| `public/og/home.png` | New | Imagen Open Graph ausente referenciada por `meta.ts` |
| `package.json` | Modified | Se elimina `@fontsource/inter` |
| `.gitignore` | Modified | Excluye `branding/` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| MAINLUX es licencia comercial de digitype-studio | Media | El cliente autorizó el uso del archivo provisto en `branding/Empaquetado/Fonts/` |
| El teal del arte (`#00ccab`) difiere del documentado (`#00d3b2`) | Media | Se adopta el valor documentado `#00d3b2` |
| Pesos de Montserrat y MAINLUX no definidos explícitamente en el plan | Media | Self-hostear solo los pesos que el sitio consume, en subset latin |
| El contraste AA de la nueva paleta aún no fue validado | Media | Verificar los pares texto/fondo definidos antes de cerrar el cambio |

## Rollback Plan

Revertir el cambio en el repositorio. Al ser un sitio estático sin estado, un rebuild y redeploy de la versión anterior restaura la identidad previa sin pérdida de datos. Los archivos de `branding/` no se versionan, por lo que el rollback no los afecta.

## Dependencies

- Archivos del Manual de Marca y de tipografías en `branding/` (solo lectura, fuera del repositorio).
- Extracción vectorial del isologo y del lockup desde los smart objects de los PSD.

## Success Criteria

- [ ] Los tokens de color en `global.css` usan la paleta de marca y `surface` es blanco.
- [ ] `--font-sans` resuelve a Montserrat y `--font-display` a MAINLUX, self-hosted en `public/fonts/`.
- [ ] Inter, Cormorant Garamond y `@fontsource/inter` ya no están presentes.
- [ ] `Logo.astro` renderiza el isologo y el lockup reales en ambas variantes y en blanco para el footer.
- [ ] `theme-color`, `brandName` y los activos (favicon, OG, reporte) reflejan la marca.
- [ ] `npm run lint`, `npx astro check` y `npm run build` pasan sin errores.
- [ ] La auditoría visual del build confirma la identidad de marca.
