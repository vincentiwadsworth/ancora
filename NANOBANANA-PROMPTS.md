# NanoBanana Prompts — Imágenes del sitio

Generar con NanoBanana y guardar en `public/images/`:

| Archivo | Dimensiones | Sección |
|---------|-------------|---------|
| `hero-bg.webp` | 1920×1080 | Hero (fondo) |
| `cta-building.webp` | 1920×1080 | CTA final (fondo) |
| `report-interior.webp` | 600×400 | MonthlyReport (card) |

---

## Hero — Hombre relajado en living moderno

**Referencia:** Slide1.PNG — lifestyle interior, no edificio exterior.
**Overlay:** degradado navy→transparente de izquierda a derecha. El contenido visual va a la DERECHA.

**Prompt:**

> Editorial lifestyle photograph, man in his late 30s sitting on a light beige linen sofa in a modern minimalist living room, holding a white ceramic coffee cup, gazing thoughtfully to the right through large floor-to-ceiling windows. Soft warm natural daylight streaming in from the windows. Indoor monstera and tropical plants in the background. Neutral warm color palette: cream walls, light oak wood accents, beige and off-white textiles. The room feels lived-in and comfortable, not sterile. Shot from a slightly wide angle showing room context. Composited for horizontal web banner — subject positioned right of center, leaving generous negative space on the left third for dark overlay. Photorealistic, editorial interior photography, soft natural lighting, 16:9.

---

## CTA Final — Edificio residencial al atardecer

**Referencia:** Slide4.PNG — edificio real, no render.
**Overlay:** degradado navy→transparente de izquierda a derecha. El edificio va a la DERECHA.

**Prompt:**

> Professional architectural photograph of a modern mid-rise residential apartment building exterior at blue hour twilight. 6-8 floors, clean modernist lines, concrete and glass facade, private balconies on each unit. Warm golden interior lights glowing through large windows on every floor, striking warm-cool contrast against deep navy-blue twilight sky. Well-maintained and premium but not ostentatious. Slightly low angle looking up at middle-upper floors, street level not visible. Some tropical vegetation barely visible at edges. No people. No text. Photorealistic architectural photography, sharp detail, 16:9.

---

## MonthlyReport — Interior de propiedad administrada

**Referencia:** Slide3.PNG — foto pequeña arriba a la izquierda en la card de "Reporte mensual de ejemplo". Muestra un living/dormitorio moderno, bien iluminado, tonos cálidos.

**Prompt:**

> Interior photograph of a modern, well-maintained apartment living room in Santa Cruz, Bolivia. Clean contemporary furniture — a light gray sofa, minimalist coffee table, warm ambient lighting from a floor lamp. Large window with sheer curtains letting in soft daylight. Neutral color palette with warm accents. The space looks professionally staged and inviting. Shot from eye level, slightly wide angle to show the room layout. No people. No text. Photorealistic interior real estate photography, warm tones, clean composition, 3:2 aspect ratio.

---

## Notas de implementación

Las imágenes reales van en `public/images/` con los nombres indicados arriba.

Los componentes ya apuntan a los `.webp`. Si falta alguna imagen, usan el `.svg` placeholder como fallback.

**Hero y CTA:** el degradado CSS va de navy sólido (izquierda) a transparente (derecha).
La imagen se ve claramente en el lado derecho; el lado izquierdo tiene el texto sobre overlay oscuro.
