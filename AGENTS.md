# ancora-site-build

One-pager institucional de ANCORA, empresa boliviana de administración integral de propiedades residenciales en alquiler. Sitio estático de una sola página construido con Astro 6 + Tailwind v4, deployado en GitHub Pages bajo dominio propio `ancora.com.bo`.

## Stack

- Lenguaje: TypeScript estricto
- Framework / runtime: Astro 6.2 + Node 22.12+
- Estilos: Tailwind v4 con `@theme` tokens en `src/styles/global.css` (sin `tailwind.config.js`)
- Linter / formateador: Biome 1.9 (single quotes, 2 espacios)
- Iconos: astro-icon con Phosphor (`ph:`) como único set
- Tipografías: Inter (body) + Cormorant Garamond (display), self-hosted en `public/fonts/`
- Analytics: Umami self-hosted en VPS de Hostinger (env-gated por `PUBLIC_UMAMI_ENABLED`)
- Deploy: GitHub Pages vía `withastro/action`

## Comandos

- `npm run dev` — arranca el servidor en local (http://localhost:4321)
- `npm run build` — compila para producción en `dist/`
- `npm run preview` — sirve `dist/` localmente
- `npm run lint` — revisa el estilo con Biome
- `npm run lint:fix` — corrige automáticamente estilo y formato
- `npm run format` — formatea con Biome

No hay suite de tests automatizados. La verificación es manual inspeccionando el navegador.

## Estructura del proyecto

```
ancora-site-build/
├── astro.config.mjs          # site: ancora.com.bo, sitemap, astro-icon (ph:)
├── package.json
├── tsconfig.json
├── public/
│   ├── CNAME                 # ancora.com.bo
│   ├── robots.txt
│   ├── favicon.svg           # placeholder (X invertida sobre #0e1b24)
│   ├── fonts/                # Inter + Cormorant Garamond (.woff2, latin)
│   └── images/               # hero-bg.webp, cta-building.webp, report-interior.svg
└── src/
    ├── components/           # 12 componentes
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── Logo.astro
    │   ├── Section.astro
    │   ├── TrustStrip.astro
    │   ├── PainCard.astro
    │   ├── ProcessCycle.astro
    │   ├── ServiceCard.astro
    │   ├── ComparisonVisual.astro
    │   ├── PricingCard.astro
    │   ├── MonthlyReport.astro
    │   └── FaqAccordion.astro
    ├── config/
    │   ├── site.ts           # datos del negocio (tel, whatsapp, email, redes)
    │   └── meta.ts           # meta tags + Open Graph
    ├── data/
    │   ├── pains.ts          # 5 dolores del propietario
    │   └── services.ts       # 8 servicios incluidos
    ├── layouts/
    │   └── BaseLayout.astro   # SEO, OG, JSON-LD, Umami
    ├── pages/
    │   └── index.astro        # one-pager (única ruta)
    └── styles/
        └── global.css         # tokens @theme, fuentes, animaciones
```

## Convenciones

- **camelCase** para variables, funciones y archivos `.ts`. **PascalCase** para componentes `.astro`.
- Los datos del negocio van en `src/data/*.ts` y se importan desde los componentes. No hardcodear textos en los componentes.
- La configuración del sitio (teléfono, WhatsApp, redes) va centralizada en `src/config/site.ts`.
- Los mensajes de WhatsApp prellenados van en `ctaMessages` dentro de `site.ts`.
- SEO y Open Graph se manejan desde `BaseLayout.astro` + `src/config/meta.ts`.
- El contenido del sitio está en español de Bolivia (`es-BO`).
- Los placeholders que requieren datos del cliente están documentados en `README.md` como checklist de handoff.
- Los cambios se trazan con SDD: propuesta → especificación → diseño → tareas → apply → verify → archive.

## No hagas

- No instalar dependencias npm sin avisar antes.
- No tocar `ancora/` (en el repo padre `webs_curros`) — es material del cliente, solo lectura.
- No subir archivos `.env*` al repositorio.
- No usar `any` en TypeScript sin justificarlo con un comentario.
- No crear páginas fuera del alcance acordado con el cliente sin consultar primero.
- No modificar `openspec/changes/archive/` — son cambios cerrados, solo lectura.

## Flujo de trabajo

- Antes de una tarea no trivial, proponé un plan y esperá mi OK.
- Una tarea a la vez; al terminar, decime qué cambiaste para que lo revise.
- Si no estás seguro al 80%, preguntá. No inventes.
- Los cambios siguen SDD: `/sdd-new` para proponer, `/sdd-ff` para plan rápido, `/sdd-apply` para implementar.
- No hay tests automatizados — verificá visualmente en el navegador después de cada cambio significativo.

## Documentación

- `README.md` — guía de desarrollo, deploy y checklist de handoff
- `openspec/` — especificaciones vivas, propuestas, diseños y tareas SDD
- `openspec/config.yaml` — reglas del proyecto para SDD