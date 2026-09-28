import type { APIRoute } from "astro";
import { SITE } from "../data/site";
import { getPosts, categoryOf } from "../lib/posts";
import { abs, postUrl } from "../lib/utils";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = abs(postUrl(p.id));
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.data.description)}</description>
      <category>${esc(categoryOf(p).name)}</category>
      <pubDate>${new Date(p.data.modifiedTime).toUTCString()}</pubDate>
      <enclosure url="${abs(p.data.image)}" type="image/webp" length="0" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${SITE.url}/</link>
    <description>${esc(SITE.description)}</description>
    <language>fa-IR</language>
    <lastBuildDate>${new Date(posts[0]?.data.modifiedTime ?? Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
