// اعتبارسنجی سریع یک یا چند مقاله: node scripts/check-post.mjs src/content/posts/x.md ...
// ساختار frontmatter، تعداد مراکز، حجم کلمات و لینک‌های داخلی را بررسی می‌کند.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node scripts/check-post.mjs <file.md> [...]");
  process.exit(1);
}

const postsDir = "src/content/posts";
const slugs = new Set(fs.readdirSync(postsDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")));
const planned = [
  "mobile-repair-tehran", "xiaomi-mobile-repair-in-tehran", "samsung-mobile-repair-tehran",
  "huawei-mobile-repair-centers-in-tehran", "iphone-repairs-tehran", "nokia-mobile-repair-tehran",
  "ipad-repair-tehran", "apple-watch-repair-tehran", "airpods-repair-tehran",
  "laptop-repair-in-tehran", "asus-laptop-repair-center-in-tehran", "acer-laptop-repair-center",
  "dell-laptop-repair-centers-in-tehran", "hp-laptop-repair-in-tehran", "lenovo-laptop-repair-centers-in-tehran",
  "sony-laptop-repair-centers", "surface-repair-in-tehran", "macbook-repair-in-tehran",
  "realme-mobile-repair-tehran", "oneplus-mobile-repair-tehran", "data-recovery-tehran",
];
planned.forEach((s) => slugs.add(s));
const staticPages = ["/", "/blog/", "/about/", "/contact/", "/blog/category/mobile-repairs/", "/blog/category/laptop-and-computer-repair/"];

const words = (s) => (s.match(/[\p{L}\p{N}]+/gu) || []).length;
let failed = false;

for (const file of files) {
  const errors = [];
  const warns = [];
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) {
    console.log(`✗ ${file}: frontmatter not found`);
    failed = true;
    continue;
  }
  let fm;
  try {
    fm = yaml.load(m[1]);
  } catch (e) {
    console.log(`✗ ${file}: YAML error → ${e.message}`);
    failed = true;
    continue;
  }
  const body = m[2];
  const req = ["title", "description", "category", "keyword", "image", "imageAlt", "publishedTime", "modifiedTime", "lead", "centers"];
  req.forEach((k) => !fm[k] && errors.push(`missing ${k}`));
  if (!["mobile-repairs", "laptop-and-computer-repair"].includes(fm.category)) errors.push(`bad category ${fm.category}`);
  const centers = fm.centers || [];
  if (centers.length < 5 || centers.length > 20) errors.push(`centers count ${centers.length} (5..20)`);
  const ids = new Set();
  centers.forEach((c, i) => {
    const tag = `center[${i}] ${c.name ?? ""}`;
    ["id", "name", "address"].forEach((k) => !c[k] && errors.push(`${tag}: missing ${k}`));
    if (c.id && !/^[a-z0-9-]+$/.test(c.id)) errors.push(`${tag}: bad id ${c.id}`);
    if (ids.has(c.id)) errors.push(`${tag}: duplicate id`);
    ids.add(c.id);
    if (!Array.isArray(c.summary) || !c.summary.length) errors.push(`${tag}: summary must be non-empty array`);
    if (!Array.isArray(c.pros) || !c.pros.length) errors.push(`${tag}: pros required`);
    if (!Array.isArray(c.cons) || !c.cons.length) errors.push(`${tag}: cons required`);
    if (c.phones && !Array.isArray(c.phones)) errors.push(`${tag}: phones must be array`);
    (c.phones || []).forEach((p) => !/^[0-9+]{5,14}$/.test(String(p)) && warns.push(`${tag}: phone format "${p}"`));
    if (c.website && !/^https?:\/\//.test(c.website)) errors.push(`${tag}: website must be absolute url`);
    ["lat", "lng"].forEach((k) => c[k] != null && typeof c[k] !== "number" && errors.push(`${tag}: ${k} must be number`));
    if (!c.phones?.length) warns.push(`${tag}: no phone`);
    if (!c.hours) warns.push(`${tag}: no hours`);
  });
  if (fm.title && fm.title.length > 70) warns.push(`title length ${fm.title.length}`);
  if (fm.description && (fm.description.length < 110 || fm.description.length > 170)) warns.push(`description length ${fm.description.length}`);

  const allText = [fm.lead, body, ...centers.flatMap((c) => [...(c.summary || []), ...(c.services || []), ...(c.pros || []), ...(c.cons || [])]), ...(fm.faq || []).flatMap((f) => [f.q, f.a])].join(" ");
  const wc = words(allText.replace(/\]\([^)]*\)/g, "]"));
  if (wc < 700) errors.push(`word count ${wc} < 700`);

  const links = [...allText.matchAll(/\]\((\/[^)\s]*)\)/g)].map((x) => x[1].split("#")[0]);
  links.forEach((l) => {
    const mm = l.match(/^\/blog\/([a-z0-9-]+)\/$/);
    if (mm && !slugs.has(mm[1])) errors.push(`broken internal link ${l}`);
    else if (!mm && !staticPages.includes(l)) warns.push(`internal link not canonical-format: ${l}`);
  });
  (fm.related || []).forEach((r) => !slugs.has(r) && errors.push(`related slug not found: ${r}`));
  const slug = path.basename(file, ".md");
  const internal = new Set(links);
  if (internal.has(`/blog/${slug}/`)) warns.push("self link");

  const status = errors.length ? "✗" : "✓";
  if (errors.length) failed = true;
  console.log(`${status} ${slug}: ${centers.length} centers, ${wc} words, ${internal.size} internal links, ${(fm.faq || []).length} faq`);
  errors.forEach((e) => console.log(`   ERROR ${e}`));
  warns.forEach((w) => console.log(`   warn  ${w}`));
}
process.exit(failed ? 1 : 0);
