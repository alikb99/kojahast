import type { APIRoute } from "astro";
import { getPosts, categoryOf } from "../lib/posts";
import { fa, postUrl } from "../lib/utils";

/** ایندکس جستجوی سمت کاربر: مقالات + نام و منطقه تک تک مراکز */
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts.flatMap((p) => {
    const d = p.data;
    const url = postUrl(p.id);
    const article = {
      t: d.h1 ?? d.title,
      u: url,
      s: `${categoryOf(p).name} · ${fa(d.centers.length)} مرکز`,
      k: [d.title, d.h1, d.keyword, d.brand, categoryOf(p).name].filter(Boolean).join(" "),
    };
    const centers = d.centers.map((c) => ({
      t: c.name,
      u: `${url}#${c.id}`,
      s: `${c.area ?? d.city} · در راهنمای ${d.keyword}`,
      k: [c.name, c.area, d.brand, d.keyword].filter(Boolean).join(" "),
    }));
    return [article, ...centers];
  });
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
