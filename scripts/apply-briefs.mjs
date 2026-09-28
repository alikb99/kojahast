// بریف کلمات کلیدی را از scripts/data/keyword-briefs.json در frontmatter مقالات می‌نویسد
// (بعد از خط keyword) و عبارت‌هایی را که در متن نیامده‌اند گزارش می‌کند.
// اجرا: node scripts/apply-briefs.mjs [--dry]
import fs from "node:fs";

const briefs = JSON.parse(fs.readFileSync("scripts/data/keyword-briefs.json", "utf8"));
const dry = process.argv.includes("--dry");
const norm = (s) => String(s).replace(/[‌\s]+/g, " ").replace(/ي/g, "ی").replace(/ك/g, "ک").toLowerCase();
const yamlList = (arr) => `[${arr.map((x) => JSON.stringify(x)).join(", ")}]`;

for (const [slug, b] of Object.entries(briefs)) {
  const file = `src/content/posts/${slug}.md`;
  let raw = fs.readFileSync(file, "utf8");
  raw = raw.replace(/^(keywords|lsi): .*\n/gm, "");
  raw = raw.replace(/^(keyword: .*\n)/m, `$1keywords: ${yamlList(b.keywords)}\nlsi: ${yamlList(b.lsi)}\n`);
  const text = norm(raw);
  // هر عبارت باید جز خود خطوط keywords/lsi هم در متن باشد
  const body = norm(raw.replace(/^(keywords|lsi): .*$/gm, ""));
  const missK = b.keywords.filter((k) => !body.includes(norm(k)));
  const missL = b.lsi.filter((k) => !body.includes(norm(k)));
  const cov = Math.round(((b.lsi.length - missL.length) / b.lsi.length) * 100);
  console.log(`${slug}: lsi ${cov}%` + (missK.length ? ` | missing keywords: ${missK.join("، ")}` : "") + (missL.length ? ` | missing lsi: ${missL.join("، ")}` : ""));
  if (!dry && text) fs.writeFileSync(file, raw);
}
