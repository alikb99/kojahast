import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

export default defineConfig({
  site: "https://kojahast.com",
  trailingSlash: "always",
  integrations: [
    mdx(), 
    icon({
  include: {
    "simple-icons": ["instagram", "telegram", "whatsapp", "youtube", "linkedin"],
    mdi: ["phone", "menu", "close"],
  },
}),
     sitemap()],
});
