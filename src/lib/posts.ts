import { getCollection, type CollectionEntry } from "astro:content";
import { CATEGORIES, type CategorySlug } from "../data/site";
import { countWords, plain } from "./utils";

export type Post = CollectionEntry<"posts">;

const byModified = (a: Post, b: Post) => b.data.modifiedTime.localeCompare(a.data.modifiedTime);

/** همه مقالات منتشرشده (پیش‌نویس‌ها فقط در حالت توسعه) */
export async function getPosts() {
  const all = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort(byModified);
}

export const categoryOf = (p: Post) => CATEGORIES[p.data.category as CategorySlug];

/** عنوان کوتاه برای کارت‌ها و کاشی‌ها */
export const shortLabel = (p: Post) => p.data.brand ?? p.data.h1 ?? p.data.title;

/** شمارش کلمات کل صفحه */
export function postWordCount(p: Post) {
  const d = p.data;
  const parts = [
    d.lead,
    p.body ?? "",
    ...d.centers.flatMap((c) => [...c.summary, ...c.services, ...c.pros, ...c.cons]),
    ...d.faq.flatMap((f) => [f.q, f.a]),
  ];
  return countWords(plain(parts.join(" ")));
}

/** کلاسترهای یک پیلار (هم‌دسته، غیر پیلار) */
export function clustersOf(pillar: Post, all: Post[]) {
  return all.filter((p) => p.data.category === pillar.data.category && !p.data.pillar);
}

export function pillarOf(p: Post, all: Post[]) {
  return all.find((x) => x.data.pillar && x.data.category === p.data.category);
}

/**
 * مقالات مرتبط: اول فیلد related، سپس هم‌دسته‌ها و در آخر سایر مقالات.
 * پیلار از لیست حذف می‌شود چون جداگانه لینک داده می‌شود.
 */
export function relatedOf(p: Post, all: Post[], limit = 3) {
  const out: Post[] = [];
  const push = (x?: Post) => x && x.id !== p.id && !x.data.pillar && !out.includes(x) && out.push(x);
  p.data.related.forEach((slug) => push(all.find((x) => x.id === slug)));
  all.filter((x) => x.data.category === p.data.category).forEach(push);
  all.forEach(push);
  return out.slice(0, limit);
}
