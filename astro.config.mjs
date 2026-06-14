import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  site: "https://ancora.com.bo",
  trailingSlash: "never",
  integrations: [
    sitemap(),
    // Force Astro to emit separate global CSS file, not scope it
    // (workaround: a marker integration in case Astro's default behavior changes)
    icon({
      include: {
        "material-symbols": [
          "format-quote",
          "photo-camera",
          "thumb-up",
          "work",
          "check-circle",
          "shield",
          "mail",
          "call",
          "location-on",
          "map",
          "menu",
          "close",
          "open-in-new",
          "send",
          "arrow-forward",
          "chat",
        ],
      },
    }),
  ],
});
