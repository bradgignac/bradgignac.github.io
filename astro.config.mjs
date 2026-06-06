import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://bradgignac.com",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "monokai",
    },
  },
});
