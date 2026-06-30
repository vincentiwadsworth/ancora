# Proposal: Hero Mobile Improvements

## Intent
Improve the visual composition, legibility, and space utilization of the home page Hero section on mobile viewports (baseline 375px). Currently, the combination of a huge H1 headline with large line-height (`leading-relaxed`), vertical stacking of the 3-item `TrustStrip` inside the Hero, and excessive vertical padding causes the content to exceed the viewport height. This results in a cluttered, unpolished look and pushes the main CTA button too far down.

We will execute **Option 1**:
1. Reduce the H1 size and line-height on mobile.
2. Optimize padding for mobile.
3. Move the `TrustStrip` component out of the dark Hero image section, placing it as a clean horizontal bar immediately below the Hero with a white background and updated premium styling.

## Scope

### In Scope
* Modify [index.astro](file:///c:/Users/nicol/Documents/GitHub/webs_curros/ancora-site-build/src/pages/index.astro):
  * Update Hero H1 headline classes: change from `text-5xl leading-relaxed` to `text-4xl leading-tight` on mobile.
  * Adjust Hero container vertical paddings on mobile (from `pt-28 pb-12` to `pt-24 pb-8`).
  * Remove `<TrustStrip />` from the Hero section and place it immediately below `<section id="hero">`.
* Modify [TrustStrip.astro](file:///c:/Users/nicol/Documents/GitHub/webs_curros/ancora-site-build/src/components/TrustStrip.astro):
  * Wrap in a container with a white background and top/bottom borders (`border-y border-neutral-100 bg-white py-6`).
  * Update text color to `text-primary-600` (deep navy) and font weight to `font-medium` for high contrast and readability on white.
  * Enclose icons in small circular wrappers with a light gold background (`bg-accent-50 text-accent-600`).
  * Set responsive layout: vertical stack (`flex-col gap-6`) on mobile, horizontal row (`flex-row justify-between items-center`) on desktop.

### Out of Scope
* Modifying any other section or page.
* Changing WhatsApp contact logic or pre-filled message text.
* Adding client-side JS/carousel functionality.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/index.astro` | Modified | Hero H1 classes, section paddings, and placement of `TrustStrip`. |
| `src/components/TrustStrip.astro` | Modified | Layout styling, colors, and icon wrappers for light background compatibility. |

## Approach
Keep the site static and performant. Use Tailwind CSS v4 `@theme` utility classes to style the updated `TrustStrip` with existing tokens (`bg-accent-50`, `text-accent-600`, `text-primary-600`). Move `TrustStrip` below the Hero to drastically reduce visual height on mobile while retaining the business pillars.

## Success Criteria
- [ ] Hero H1 rendered with `text-4xl` and `leading-tight` on viewports <768px.
- [ ] Hero CTA button ("Solicitar asesoría gratuita") is positioned higher on the screen in mobile, improving accessibility and visual focus.
- [ ] `TrustStrip` displays correctly below the Hero with a clean white background, light golden circular icon backgrounds, and dark navy text.
- [ ] No layout breaks or horizontal scrolling at 375px viewport.
- [ ] Project build (`npm run build`) and linting (`npm run lint`) pass without errors.
