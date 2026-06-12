# ANCORA — Sitio institucional

> ANCORA es una empresa especializada en la administración integral de propiedades residenciales en Bolivia. Este repositorio contiene el sitio institucional estático (4 páginas) construido con Astro 6 + Tailwind v4, deployado a GitHub Pages con dominio propio `ancora.com.bo`.

## Stack

- **Astro 6** — static-first, 0KB de JS por defecto
- **Tailwind v4** — vía `@tailwindcss/vite` con tokens definidos en `@theme` (no `tailwind.config.js`)
- **TypeScript** — modo `strict`
- **GitHub Pages** — deploy automático vía `withastro/action@v6`
- **Material Symbols** — iconografía (CDN Google Fonts)
- **Umami Cloud** — analytics (opcional, env-gated)

## Vista previa

- **Dev (GitHub Pages)**: https://vincentiwadsworth.github.io/ancora/
- **Producción (cuando DNS esté listo)**: https://ancora.com.bo/

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

> Requiere Node.js 22+.

## Deploy

Push a `main` dispara el workflow en `.github/workflows/deploy.yml` que compila y publica en GitHub Pages.

### Habilitar Pages (una sola vez en GitHub)

1. Repo → **Settings → Pages**
2. **Source**: "GitHub Actions"

### Variables de entorno (Umami, opcionales)

En **Settings → Secrets and variables → Actions → Variables**, definir:

| Variable | Valor |
|---|---|
| `PUBLIC_UMAMI_ENABLED` | `true` cuando esté listo el sitio en Umami Cloud |
| `PUBLIC_UMAMI_SITE_ID` | el `data-website-id` que entrega Umami |

Si `PUBLIC_UMAMI_ENABLED` no está definido o es `false`, el script de Umami no se inyecta (build exitoso, analytics off).

### Dominio custom

`public/CNAME` ya contiene `ancora.com.bo`. Cuando el dominio apunte al repo, GitHub Pages lo detecta y sirve bajo ese dominio. La configuración de DNS (CNAME) la hace el cliente.

## Lista de cambios pendientes (handoff)

Todos los placeholders están centralizados. Antes de go-live, actualizar:

| Qué | Dónde |
|---|---|
| Teléfono y WhatsApp | `src/config/site.ts` → `site.phone` y `site.whatsapp` |
| Email | `src/config/site.ts` → `site.email` |
| Dirección | `src/config/site.ts` → `site.address` (también el `bbox` por defecto en `src/components/MapEmbed.astro` si querés geolocalizar exacto) |
| Redes sociales | `src/config/site.ts` → `site.socialHandles` |
| Logo | `src/components/Logo.astro` (reemplazar el SVG inline) |
| Texto del sitio (pilares, dolores, servicios, proceso, equipo, precios) | `src/data/*.ts` (7 archivos) |
| Mensajes de WhatsApp pre-llenados | `src/config/site.ts` → `ctaMessages` |
| Texto del reporte en Home | `src/pages/index.astro` (Sección diferenciación) |
| Site ID de Umami | Variable `PUBLIC_UMAMI_SITE_ID` en el repo |

## Estructura del proyecto

```
ancora-site-build/
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── CNAME             # ancora.com.bo
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/       # 12 componentes compartidos
│   ├── config/           # site.ts, meta.ts
│   ├── data/             # 7 archivos de contenido tipado
│   ├── layouts/          # BaseLayout.astro
│   ├── pages/            # index, services, about, contact
│   └── styles/global.css # @theme tokens + base
└── openspec/             # specs, propuesta, diseño, tareas
```

## Especificación viva

Trazabilidad del cambio en [`openspec/`](./openspec/):

- [`openspec/changes/ancora-web/proposal.md`](./openspec/changes/ancora-web/proposal.md) — intención y scope
- [`openspec/changes/ancora-web/design.md`](./openspec/changes/ancora-web/design.md) — arquitectura y decisiones
- [`openspec/changes/ancora-web/tasks.md`](./openspec/changes/ancora-web/tasks.md) — tareas en 5 PRs stacked-to-main
- `openspec/specs/{site-foundation, home-page, services-page, about-page, contact-page, deployment-pipeline}/spec.md` — requisitos con escenarios Given/When/Then
