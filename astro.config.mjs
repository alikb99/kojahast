import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import fs from "node:fs";
import yaml from "js-yaml";

const SITE = "https://kojahast.com";

/** تاریخ آخرین ویرایش هر مقاله برای lastmod سایت مپ */
function postDates() {
  const dir = "./src/content/posts";
  const map = new Map();
  let latest = "";
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
    const m = fs.readFileSync(`${dir}/${f}`, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) continue;
    const fm = yaml.load(m[1]);
    if (fm?.draft) continue;
    map.set(`${SITE}/blog/${f.replace(/\.md$/, "")}/`, fm.modifiedTime);
    if (fm.modifiedTime > latest) latest = fm.modifiedTime;
  }
  return { map, latest };
}
const { map: dates, latest } = postDates();

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  build: { format: "directory" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  integrations: [
    mdx(),
    icon(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        const d = dates.get(item.url);
        if (d) item.lastmod = new Date(d).toISOString();
        else if (item.url === `${SITE}/` || item.url.includes("/blog/")) item.lastmod = latest ? new Date(latest).toISOString() : undefined;
        return item;
      },
    }),
  ],
});
